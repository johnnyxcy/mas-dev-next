/*
 * File: @mas/core/src/parts/ipc/common/ipc.electron.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/24/2023 05:21 pm
 *
 * Last Modified: 10/24/2023 05:22 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BinaryBuffer } from "@mas/base/common/buffer";
import { Event } from "@mas/base/common/event";
import { IMessagePassingProtocol } from "@mas/core/parts/ipc/common/ipc";

export interface Sender {
    send(channel: string, msg: unknown): void;
}

/**
 * The Electron `Protocol` leverages Electron style IPC communication (`ipcRenderer`, `ipcMain`)
 * for the implementation of the `IMessagePassingProtocol`. That style of API requires a channel
 * name for sending data.
 */
export class Protocol implements IMessagePassingProtocol {
    constructor(
        private sender: Sender,
        readonly onMessage: Event<BinaryBuffer>,
    ) {}

    send(message: BinaryBuffer): void {
        try {
            this.sender.send("vscode:message", message.buffer);
        } catch (e) {
            // systems are going down
        }
    }

    disconnect(): void {
        this.sender.send("vscode:disconnect", null);
    }
}
