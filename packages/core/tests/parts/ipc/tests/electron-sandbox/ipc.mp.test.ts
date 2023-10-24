/*
 * File: @mas/core/tests/parts/ipc/tests/electron-sandbox/ipc.mp.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/24/2023 05:23 pm
 *
 * Last Modified: 10/24/2023 05:24 pm
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

import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";
import { Client as MessagePortClient } from "@mas/core/parts/ipc/browser/ipc.mp";

describe("IPC, MessagePorts", () => {
    ensureNoDisposablesAreLeakedInTestSuite();

    test("message port close event", async () => {
        const { port1, port2 } = new MessageChannel();

        const client1 = new MessagePortClient(port1, "client1");
        const client2 = new MessagePortClient(port2, "client2");

        // This test ensures that Electron's API for the close event
        // does not break because we rely on it to dispose client
        // connections from the server.
        //
        // This event is not provided by browser MessagePort API though.
        const whenClosed = new Promise<boolean>((resolve) => port1.addEventListener("close", () => resolve(true)));

        client2.dispose();

        assert.ok(await whenClosed);

        client1.dispose();
    });
});
