/*
 * File: @mas/core/tests/parts/ipc/tests/common/ipc.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 03:18 pm
 *
 * Last Modified: 10/24/2023 02:39 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { assert, describe, test } from "vitest";

import { timeout } from "@mas/base/common/async";
import { BinaryBuffer } from "@mas/base/common/buffer";
import { CancellationToken, CancellationTokenSource } from "@mas/base/common/cancellation";
import { canceled } from "@mas/base/common/errors";
import { Emitter, Event } from "@mas/base/common/event";
import { DisposableStore } from "@mas/base/common/lifecycle";
import { isEqual } from "@mas/base/common/resources";
import { URI } from "@mas/base/common/uri";
import { ensureNoDisposablesAreLeakedInTestSuite, setup, teardown } from "@mas/base/testing/common/utils";
import {
    BufferReader,
    BufferWriter,
    ClientConnectionEvent,
    IChannel,
    IMessagePassingProtocol,
    IPCClient,
    IPCServer,
    IServerChannel,
    ProxyChannel,
    deserialize,
    serialize,
} from "@mas/core/parts/ipc/common/ipc";

class QueueProtocol implements IMessagePassingProtocol {
    private buffering = true;
    private buffers: BinaryBuffer[] = [];

    private readonly _onMessage = new Emitter<BinaryBuffer>({
        onDidAddFirstListener: () => {
            for (const buffer of this.buffers) {
                this._onMessage.fire(buffer);
            }

            this.buffers = [];
            this.buffering = false;
        },
        onDidRemoveLastListener: () => {
            this.buffering = true;
        },
    });

    readonly onMessage = this._onMessage.event;
    other!: QueueProtocol;

    send(buffer: BinaryBuffer): void {
        this.other.receive(buffer);
    }

    protected receive(buffer: BinaryBuffer): void {
        if (this.buffering) {
            this.buffers.push(buffer);
        } else {
            this._onMessage.fire(buffer);
        }
    }
}

function createProtocolPair(): [IMessagePassingProtocol, IMessagePassingProtocol] {
    const one = new QueueProtocol();
    const other = new QueueProtocol();
    one.other = other;
    other.other = one;

    return [one, other];
}

class TestIPCClient extends IPCClient<string> {
    private readonly _onDidDisconnect = new Emitter<void>();
    readonly onDidDisconnect = this._onDidDisconnect.event;

    constructor(protocol: IMessagePassingProtocol, id: string) {
        super(protocol, id);
    }

    override dispose(): void {
        this._onDidDisconnect.fire();
        super.dispose();
    }
}

class TestIPCServer extends IPCServer<string> {
    private readonly onDidClientConnect: Emitter<ClientConnectionEvent>;

    constructor() {
        const onDidClientConnect = new Emitter<ClientConnectionEvent>();
        super(onDidClientConnect.event);
        this.onDidClientConnect = onDidClientConnect;
    }

    createConnection(id: string): IPCClient<string> {
        const [pc, ps] = createProtocolPair();
        const client = new TestIPCClient(pc, id);

        this.onDidClientConnect.fire({
            protocol: ps,
            onDidClientDisconnect: client.onDidDisconnect,
        });

        return client;
    }
}

const TestChannelId = "testchannel";

interface ITestService {
    marco(): Promise<string>;
    error(message: string): Promise<void>;
    neverComplete(): Promise<void>;
    neverCompleteCT(cancellationToken: CancellationToken): Promise<void>;
    buffersLength(buffers: BinaryBuffer[]): Promise<number>;
    marshall(uri: URI): Promise<URI>;
    context(): Promise<unknown>;

    onPong: Event<string>;
}

class TestService implements ITestService {
    private readonly disposables = new DisposableStore();

    private readonly _onPong = new Emitter<string>();
    readonly onPong = this._onPong.event;

    marco(): Promise<string> {
        return Promise.resolve("polo");
    }

    error(message: string): Promise<void> {
        return Promise.reject(new Error(message));
    }

    neverComplete(): Promise<void> {
        return new Promise((_resolve) => {});
    }

    neverCompleteCT(cancellationToken: CancellationToken): Promise<void> {
        if (cancellationToken.isCancellationRequested) {
            return Promise.reject(canceled());
        }

        return new Promise((_resolve, reject) =>
            this.disposables.add(cancellationToken.onCancellationRequested(() => reject(canceled()))),
        );
    }

    buffersLength(buffers: BinaryBuffer[]): Promise<number> {
        return Promise.resolve(buffers.reduce((r, b) => r + b.buffer.length, 0));
    }

    ping(msg: string): void {
        this._onPong.fire(msg);
    }

    marshall(uri: URI): Promise<URI> {
        return Promise.resolve(uri);
    }

    context(context?: unknown): Promise<unknown> {
        return Promise.resolve(context);
    }

    dispose(): void {
        this.disposables.dispose();
    }
}

class TestChannel implements IServerChannel {
    constructor(private service: ITestService) {}

    call(_: unknown, command: string, arg: any, cancellationToken: CancellationToken): Promise<any> {
        switch (command) {
            case "marco":
                return this.service.marco();
            case "error":
                return this.service.error(arg);
            case "neverComplete":
                return this.service.neverComplete();
            case "neverCompleteCT":
                return this.service.neverCompleteCT(cancellationToken);
            case "buffersLength":
                return this.service.buffersLength(arg);
            default:
                return Promise.reject(new Error("not implemented"));
        }
    }

    listen(_: unknown, event: string, arg?: any): Event<any> {
        switch (event) {
            case "onPong":
                return this.service.onPong;
            default:
                throw new Error("not implemented");
        }
    }
}

class TestChannelClient implements ITestService {
    constructor(private channel: IChannel) {}

    get onPong(): Event<string> {
        return this.channel.listen("onPong");
    }

    marco(): Promise<string> {
        return this.channel.call("marco");
    }

    error(message: string): Promise<void> {
        return this.channel.call("error", message);
    }

    neverComplete(): Promise<void> {
        return this.channel.call("neverComplete");
    }

    neverCompleteCT(cancellationToken: CancellationToken): Promise<void> {
        return this.channel.call("neverCompleteCT", undefined, cancellationToken);
    }

    buffersLength(buffers: BinaryBuffer[]): Promise<number> {
        return this.channel.call("buffersLength", buffers);
    }

    marshall(uri: URI): Promise<URI> {
        return this.channel.call("marshall", uri);
    }

    context(): Promise<unknown> {
        return this.channel.call("context");
    }
}

describe("Base IPC", function () {
    const store = ensureNoDisposablesAreLeakedInTestSuite();

    test("createProtocolPair", async function () {
        const [clientProtocol, serverProtocol] = createProtocolPair();

        const b1 = BinaryBuffer.alloc(0);
        clientProtocol.send(b1);

        const b3 = BinaryBuffer.alloc(0);
        serverProtocol.send(b3);

        const b2 = await Event.toPromise(serverProtocol.onMessage);
        const b4 = await Event.toPromise(clientProtocol.onMessage);

        assert.strictEqual(b1, b2);
        assert.strictEqual(b3, b4);
    });

    describe("one to one", function () {
        let server: IPCServer;
        let client: IPCClient;
        let service: TestService;
        let ipcService: ITestService;

        setup(function () {
            service = store.add(new TestService());
            const testServer = store.add(new TestIPCServer());
            server = testServer;

            server.registerChannel(TestChannelId, new TestChannel(service));

            client = store.add(testServer.createConnection("client1"));
            ipcService = new TestChannelClient(client.getChannel(TestChannelId));
        });

        test("call success", async function () {
            const r = await ipcService.marco();
            return assert.strictEqual(r, "polo");
        });

        test("call error", async function () {
            try {
                await ipcService.error("nice error");
                return assert.fail("should not reach here");
            } catch (err) {
                return assert.strictEqual(err.message, "nice error");
            }
        });

        test("cancel call with cancelled cancellation token", async function () {
            try {
                await ipcService.neverCompleteCT(CancellationToken.Cancelled);
                return assert.fail("should not reach here");
            } catch (err) {
                return assert(err.message === "Canceled");
            }
        });

        test("cancel call with cancellation token (sync)", function () {
            const cts = new CancellationTokenSource();
            const promise = ipcService.neverCompleteCT(cts.token).then(
                (_) => assert.fail("should not reach here"),
                (err) => assert(err.message === "Canceled"),
            );

            cts.cancel();

            return promise;
        });

        test("cancel call with cancellation token (async)", function () {
            const cts = new CancellationTokenSource();
            const promise = ipcService.neverCompleteCT(cts.token).then(
                (_) => assert.fail("should not reach here"),
                (err) => assert(err.message === "Canceled"),
            );

            setTimeout(() => cts.cancel());

            return promise;
        });

        test("listen to events", async function () {
            const messages: string[] = [];

            store.add(ipcService.onPong((msg) => messages.push(msg)));
            await timeout(0);

            assert.deepStrictEqual(messages, []);
            service.ping("hello");
            await timeout(0);

            assert.deepStrictEqual(messages, ["hello"]);
            service.ping("world");
            await timeout(0);

            assert.deepStrictEqual(messages, ["hello", "world"]);
        });

        test("buffers in arrays", async function () {
            const r = await ipcService.buffersLength([BinaryBuffer.alloc(2), BinaryBuffer.alloc(3)]);
            return assert.strictEqual(r, 5);
        });

        test("round trips numbers", () => {
            const input = [0, 1, -1, 12345, -12345, 42.6, 123412341234];

            const writer = new BufferWriter();
            serialize(writer, input);
            assert.deepStrictEqual(deserialize(new BufferReader(writer.buffer)), input);
        });
    });

    describe("one to one (proxy)", function () {
        let server: IPCServer;
        let client: IPCClient;
        let service: TestService;
        let ipcService: ITestService;

        const disposables = new DisposableStore();

        setup(function () {
            service = store.add(new TestService());
            const testServer = disposables.add(new TestIPCServer());
            server = testServer;

            server.registerChannel(TestChannelId, ProxyChannel.fromService(service, disposables));

            client = disposables.add(testServer.createConnection("client1"));
            ipcService = ProxyChannel.toService(client.getChannel(TestChannelId));
        });

        teardown(function () {
            disposables.clear();
        });

        test("call success", async function () {
            const r = await ipcService.marco();
            return assert.strictEqual(r, "polo");
        });

        test("call error", async function () {
            try {
                await ipcService.error("nice error");
                return assert.fail("should not reach here");
            } catch (err) {
                return assert.strictEqual(err.message, "nice error");
            }
        });

        test("listen to events", async function () {
            const messages: string[] = [];

            disposables.add(ipcService.onPong((msg) => messages.push(msg)));
            await timeout(0);

            assert.deepStrictEqual(messages, []);
            service.ping("hello");
            await timeout(0);

            assert.deepStrictEqual(messages, ["hello"]);
            service.ping("world");
            await timeout(0);

            assert.deepStrictEqual(messages, ["hello", "world"]);
        });

        test("marshalling uri", async function () {
            const uri = URI.file("foobar");
            const r = await ipcService.marshall(uri);
            assert.ok(r instanceof URI);
            return assert.ok(isEqual(r, uri));
        });

        test("buffers in arrays", async function () {
            const r = await ipcService.buffersLength([BinaryBuffer.alloc(2), BinaryBuffer.alloc(3)]);
            return assert.strictEqual(r, 5);
        });
    });

    describe("one to one (proxy, extra context)", function () {
        let server: IPCServer;
        let client: IPCClient;
        let service: TestService;
        let ipcService: ITestService;

        const disposables = new DisposableStore();

        setup(function () {
            service = store.add(new TestService());
            const testServer = disposables.add(new TestIPCServer());
            server = testServer;

            server.registerChannel(TestChannelId, ProxyChannel.fromService(service, disposables));

            client = disposables.add(testServer.createConnection("client1"));
            ipcService = ProxyChannel.toService(client.getChannel(TestChannelId), { context: "Super Context" });
        });

        teardown(function () {
            disposables.clear();
        });

        test("call extra context", async function () {
            const r = await ipcService.context();
            return assert.strictEqual(r, "Super Context");
        });
    });

    describe("one to many", function () {
        test("all clients get pinged", async function () {
            const service = store.add(new TestService());
            const channel = new TestChannel(service);
            const server = store.add(new TestIPCServer());
            server.registerChannel("channel", channel);

            let client1GotPinged = false;
            const client1 = store.add(server.createConnection("client1"));
            const ipcService1 = new TestChannelClient(client1.getChannel("channel"));
            store.add(ipcService1.onPong(() => (client1GotPinged = true)));

            let client2GotPinged = false;
            const client2 = store.add(server.createConnection("client2"));
            const ipcService2 = new TestChannelClient(client2.getChannel("channel"));
            store.add(ipcService2.onPong(() => (client2GotPinged = true)));

            await timeout(1);
            service.ping("hello");

            await timeout(1);
            assert(client1GotPinged, "client 1 got pinged");
            assert(client2GotPinged, "client 2 got pinged");
        });

        test("server gets pings from all clients (broadcast channel)", async function () {
            const server = store.add(new TestIPCServer());

            const client1 = server.createConnection("client1");
            const clientService1 = store.add(new TestService());
            const clientChannel1 = new TestChannel(clientService1);
            client1.registerChannel("channel", clientChannel1);

            const pings: string[] = [];
            const channel = server.getChannel("channel", () => true);
            const service = new TestChannelClient(channel);
            store.add(service.onPong((msg) => pings.push(msg)));

            await timeout(1);
            clientService1.ping("hello 1");

            await timeout(1);
            assert.deepStrictEqual(pings, ["hello 1"]);

            const client2 = server.createConnection("client2");
            const clientService2 = store.add(new TestService());
            const clientChannel2 = new TestChannel(clientService2);
            client2.registerChannel("channel", clientChannel2);

            await timeout(1);
            clientService2.ping("hello 2");

            await timeout(1);
            assert.deepStrictEqual(pings, ["hello 1", "hello 2"]);

            client1.dispose();
            clientService1.ping("hello 1");

            await timeout(1);
            assert.deepStrictEqual(pings, ["hello 1", "hello 2"]);

            await timeout(1);
            clientService2.ping("hello again 2");

            await timeout(1);
            assert.deepStrictEqual(pings, ["hello 1", "hello 2", "hello again 2"]);

            client2.dispose();
        });
    });
});
