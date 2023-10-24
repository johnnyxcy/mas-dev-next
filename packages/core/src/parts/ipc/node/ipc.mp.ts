/*
 * File: @mas/core/src/parts/ipc/node/ipc.mp.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/20/2023 10:00 am
 *
 * Last Modified: 10/24/2023 10:03 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { firstOrDefault } from "@mas/base/common/arrays";
import { BinaryBuffer } from "@mas/base/common/buffer";
import { Emitter, Event } from "@mas/base/common/event";
import { assertType } from "@mas/base/common/types";
import { ClientConnectionEvent, IMessagePassingProtocol, IPCServer } from "@mas/core/parts/ipc/common/ipc";
import { MessageEvent, MessagePortMain, isUtilityProcess } from "@mas/core/parts/sandbox/node/electron-types";

/**
 * The MessagePort `Protocol` leverages MessagePortMain style IPC communication
 * for the implementation of the `IMessagePassingProtocol`.
 */
class Protocol implements IMessagePassingProtocol {
    readonly onMessage: Event<BinaryBuffer>;

    constructor(private port: MessagePortMain) {
        // we must call start() to ensure messages are flowing
        port.start();
        this.onMessage = Event.fromNodeEventEmitter<BinaryBuffer>(this.port, "message", (e: MessageEvent) =>
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

export interface IClientConnectionFilter {
    /**
     * Allows to filter incoming messages to the
     * server to handle them differently.
     *
     * @param e the message event to handle
     * @returns `true` if the event was handled
     * and should not be processed by the server.
     */
    handledClientConnection(e: MessageEvent): boolean;
}

/**
 * An implementation of a `IPCServer` on top of MessagePort style IPC communication.
 * The clients register themselves via Electron Utility Process IPC transfer.
 */
export class Server extends IPCServer {
    private static getOnDidClientConnect(filter?: IClientConnectionFilter): Event<ClientConnectionEvent> {
        assertType(isUtilityProcess(process), "Electron Utility Process");

        const onCreateMessageChannel = new Emitter<MessagePortMain>();

        process.parentPort.on("message", (e: MessageEvent) => {
            if (filter?.handledClientConnection(e)) {
                return;
            }

            const port = firstOrDefault(e.ports);
            if (port) {
                onCreateMessageChannel.fire(port);
            }
        });

        return Event.map(onCreateMessageChannel.event, (port) => {
            const protocol = new Protocol(port);

            const result: ClientConnectionEvent = {
                protocol,
                // Not part of the standard spec, but in Electron we get a `close` event
                // when the other side closes. We can use this to detect disconnects
                // (https://github.com/electron/electron/blob/11-x-y/docs/api/message-port-main.md#event-close)
                onDidClientDisconnect: Event.fromNodeEventEmitter(port, "close"),
            };

            return result;
        });
    }

    constructor(filter?: IClientConnectionFilter) {
        super(Server.getOnDidClientConnect(filter));
    }
}

interface INodeMessagePortFragment {
    on(event: "message", listener: (messageEvent: MessageEvent) => void): this;
    removeListener(event: "message", listener: (messageEvent: MessageEvent) => void): this;
}

export function once(port: INodeMessagePortFragment, message: unknown, callback: () => void): void {
    const listener = (e: MessageEvent) => {
        if (e.data === message) {
            port.removeListener("message", listener);
            callback();
        }
    };

    port.on("message", listener);
}
