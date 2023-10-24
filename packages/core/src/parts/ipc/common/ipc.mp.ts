/*
 * File: @mas/core/src/parts/ipc/common/ipc.mp.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 03:12 pm
 *
 * Last Modified: 10/24/2023 01:21 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { BinaryBuffer } from "@mas/base/common/buffer";
import { Event } from "@mas/base/common/event";
import { IDisposable } from "@mas/base/common/lifecycle";
import { IMessagePassingProtocol, IPCClient } from "@mas/core/parts/ipc/common/ipc";

/**
 * Declare minimal `MessageEvent` and `MessagePort` interfaces here
 * so that this utility can be used both from `browser` and
 * `electron-main` namespace where message ports are available.
 */
export interface MessageEvent {
    /**
     * For our use we only consider `Uint8Array` a valid data transfer
     * via message ports because our protocol implementation is buffer based.
     */
    data: Uint8Array;
}

export interface MessagePort {
    addEventListener(type: "message", listener: (this: MessagePort, e: MessageEvent) => unknown): void;
    removeEventListener(type: "message", listener: (this: MessagePort, e: MessageEvent) => unknown): void;

    postMessage(message: Uint8Array): void;

    start(): void;
    close(): void;
}

/**
 * The MessagePort `Protocol` leverages MessagePort style IPC communication
 * for the implementation of the `IMessagePassingProtocol`. That style of API
 * is a simple `onmessage` / `postMessage` pattern.
 */
export class Protocol implements IMessagePassingProtocol {
    readonly onMessage: Event<BinaryBuffer>;

    constructor(private readonly port: MessagePort) {
        // we must call start() to ensure messages are flowing
        port.start();
        this.onMessage = Event.fromDOMEventEmitter<BinaryBuffer>(this.port, "message", (e: MessageEvent) =>
            BinaryBuffer.wrap(e.data),
        );
    }

    send(message: BinaryBuffer): void {
        this.port.postMessage(message.buffer);
    }

    disconnect(): void {
        this.port.close();
    }
}

/**
 * An implementation of a `IPCClient` on top of MessagePort style IPC communication.
 */
export class Client extends IPCClient implements IDisposable {
    private protocol: Protocol;

    constructor(port: MessagePort, clientId: string) {
        const protocol = new Protocol(port);
        super(protocol, clientId);

        this.protocol = protocol;
    }

    override dispose(): void {
        this.protocol.disconnect();

        super.dispose();
    }
}
