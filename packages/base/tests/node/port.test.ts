/*
 * File: @mas/base/tests/node/port.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 11:03 am
 *
 * Last Modified: 10/12/2023 11:12 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as net from "node:net";
import { assert, test } from "vitest";

import * as ports from "@mas/base/node/ports";
import { flakySuite as describe } from "@mas/base/testing/node/utils";

describe("Ports", () => {
    test("Finds a free port (no timeout)", () =>
        new Promise<void>((resolve, reject) => {
            // get an initial freeport >= 7000
            ports.findFreePort(7000, 100, 300000).then(
                (initialPort) => {
                    assert.ok(initialPort >= 7000);

                    // create a server to block this port
                    const server = net.createServer();
                    server.listen(initialPort, undefined, undefined, () => {
                        // once listening, find another free port and assert that the port is different from the opened one
                        ports.findFreePort(7000, 50, 300000).then(
                            (freePort) => {
                                assert.ok(freePort >= 7000 && freePort !== initialPort);
                                server.close();

                                resolve();
                            },
                            (err) => reject(err),
                        );
                    });
                },
                (err) => reject(err),
            );
        }));
});
