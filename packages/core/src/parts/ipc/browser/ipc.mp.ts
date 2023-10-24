/*
 * File: @mas/core/src/parts/ipc/browser/ipc.mp.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 03:22 pm
 *
 * Last Modified: 10/24/2023 01:27 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDisposable } from "@mas/base/common/lifecycle";
import { Client as MessagePortClient } from "@mas/core/parts/ipc/common/ipc.mp";

/**
 * An implementation of a `IPCClient` on top of DOM `MessagePort`.
 */
export class Client extends MessagePortClient implements IDisposable {
    /**
     * @param clientId a way to uniquely identify this client among
     * other clients. this is important for routing because every
     * client can also be a server
     */
    constructor(port: MessagePort, clientId: string) {
        super(port, clientId);
    }
}
