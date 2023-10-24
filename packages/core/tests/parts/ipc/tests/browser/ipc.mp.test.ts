/*
 * File: @mas/core/tests/parts/ipc/tests/browser/ipc.mp.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 03:22 pm
 *
 * Last Modified: 10/24/2023 02:38 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import { CancellationToken } from "@mas/base/common/cancellation";
import { Event } from "@mas/base/common/event";
import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";
import { Client as MessagePortClient } from "@mas/core/parts/ipc/browser/ipc.mp";

describe("IPC, MessagePorts", () => {
    test("message passing", async () => {
        const { port1, port2 } = new MessageChannel();

        const client1 = new MessagePortClient(port1, "client1");
        const client2 = new MessagePortClient(port2, "client2");

        client1.registerChannel("client1", {
            call(_: unknown, command: string, arg: any, cancellationToken: CancellationToken): Promise<any> {
                switch (command) {
                    case "testMethodClient1":
                        return Promise.resolve("success1");
                    default:
                        return Promise.reject(new Error("not implemented"));
                }
            },

            listen(_: unknown, event: string, arg?: any): Event<any> {
                switch (event) {
                    default:
                        throw new Error("not implemented");
                }
            },
        });

        client2.registerChannel("client2", {
            call(_: unknown, command: string, arg: any, cancellationToken: CancellationToken): Promise<any> {
                switch (command) {
                    case "testMethodClient2":
                        return Promise.resolve("success2");
                    default:
                        return Promise.reject(new Error("not implemented"));
                }
            },

            listen(_: unknown, event: string, arg?: any): Event<any> {
                switch (event) {
                    default:
                        throw new Error("not implemented");
                }
            },
        });

        const channelClient1 = client2.getChannel("client1");
        assert.strictEqual(await channelClient1.call("testMethodClient1"), "success1");

        const channelClient2 = client1.getChannel("client2");
        assert.strictEqual(await channelClient2.call("testMethodClient2"), "success2");

        client1.dispose();
        client2.dispose();
    });

    ensureNoDisposablesAreLeakedInTestSuite();
});
