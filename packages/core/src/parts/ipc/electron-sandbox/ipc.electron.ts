/*
 * File: @mas/core/src/parts/ipc/electron-sandbox/ipc.electron.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/24/2023 05:21 pm
 *
 * Last Modified: 10/24/2023 05:21 pm
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
import { IDisposable } from "@mas/base/common/lifecycle";
import { IPCClient } from "@mas/core/parts/ipc/common/ipc";
import { Protocol as ElectronProtocol } from "@mas/core/parts/ipc/common/ipc.electron";
import { ipcRenderer } from "@mas/core/parts/sandbox/electron-sandbox/globals";

/**
 * An implementation of `IPCClient` on top of Electron `ipcRenderer` IPC communication
 * provided from sandbox globals (via preload script).
 */
export class Client extends IPCClient implements IDisposable {
    private protocol: ElectronProtocol;

    private static createProtocol(): ElectronProtocol {
        const onMessage = Event.fromNodeEventEmitter<BinaryBuffer>(ipcRenderer, "vscode:message", (_, message) =>
            BinaryBuffer.wrap(message),
        );
        ipcRenderer.send("vscode:hello");

        return new ElectronProtocol(ipcRenderer, onMessage);
    }

    constructor(id: string) {
        const protocol = Client.createProtocol();
        super(protocol, id);

        this.protocol = protocol;
    }

    override dispose(): void {
        this.protocol.disconnect();
    }
}
