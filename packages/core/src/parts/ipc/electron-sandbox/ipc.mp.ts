/*
 * File: @mas/core/src/parts/ipc/electron-sandbox/ipc.mp.ts
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

import { Event } from "@mas/base/common/event";
import { generateUuid } from "@mas/base/common/uuid";
import { ipcMessagePort, ipcRenderer } from "@mas/core/parts/sandbox/electron-sandbox/globals";

interface IMessageChannelResult {
    nonce: string;
    port: MessagePort;
    source: unknown;
}

export async function acquirePort(
    requestChannel: string | undefined,
    responseChannel: string,
    nonce = generateUuid(),
): Promise<MessagePort> {
    // Get ready to acquire the message port from the
    // provided `responseChannel` via preload helper.
    ipcMessagePort.acquire(responseChannel, nonce);

    // If a `requestChannel` is provided, we are in charge
    // to trigger acquisition of the message port from main
    if (typeof requestChannel === "string") {
        ipcRenderer.send(requestChannel, nonce);
    }

    // Wait until the main side has returned the `MessagePort`
    // We need to filter by the `nonce` to ensure we listen
    // to the right response.
    const onMessageChannelResult = Event.fromDOMEventEmitter<IMessageChannelResult>(
        window,
        "message",
        (e: MessageEvent) => ({ nonce: e.data, port: e.ports[0], source: e.source }),
    );
    const { port } = await Event.toPromise(
        Event.once(Event.filter(onMessageChannelResult, (e) => e.nonce === nonce && e.source === window)),
    );

    return port;
}
