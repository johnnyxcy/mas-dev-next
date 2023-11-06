/*
 * File: @mas/core/src/platform/files/node/watcher/watcher.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 05:40 pm
 *
 * Last Modified: 11/02/2023 05:40 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Promises } from "@mas/base/common/async";
import { Event } from "@mas/base/common/event";
import { Disposable } from "@mas/base/common/lifecycle";
import {
    INonRecursiveWatchRequest,
    IRecursiveWatchRequest,
    IUniversalWatcher,
    IUniversalWatchRequest,
} from "@mas/core/platform/files/common/watcher";
import { NodeJSWatcher } from "@mas/core/platform/files/node/watcher/nodejs/watcher";
import { ParcelWatcher } from "@mas/core/platform/files/node/watcher/parcel/parcel-watcher";

export class UniversalWatcher extends Disposable implements IUniversalWatcher {
    private readonly recursiveWatcher = this._register(new ParcelWatcher());
    private readonly nonRecursiveWatcher = this._register(new NodeJSWatcher());

    readonly onDidChangeFile = Event.any(
        this.recursiveWatcher.onDidChangeFile,
        this.nonRecursiveWatcher.onDidChangeFile,
    );
    readonly onDidLogMessage = Event.any(
        this.recursiveWatcher.onDidLogMessage,
        this.nonRecursiveWatcher.onDidLogMessage,
    );
    readonly onDidError = Event.any(this.recursiveWatcher.onDidError, this.nonRecursiveWatcher.onDidError);

    async watch(requests: IUniversalWatchRequest[]): Promise<void> {
        const recursiveWatchRequests: IRecursiveWatchRequest[] = [];
        const nonRecursiveWatchRequests: INonRecursiveWatchRequest[] = [];

        for (const request of requests) {
            if (request.recursive) {
                recursiveWatchRequests.push(request);
            } else {
                nonRecursiveWatchRequests.push(request);
            }
        }

        await Promises.settled([
            this.recursiveWatcher.watch(recursiveWatchRequests),
            this.nonRecursiveWatcher.watch(nonRecursiveWatchRequests),
        ]);
    }

    async setVerboseLogging(enabled: boolean): Promise<void> {
        await Promises.settled([
            this.recursiveWatcher.setVerboseLogging(enabled),
            this.nonRecursiveWatcher.setVerboseLogging(enabled),
        ]);
    }

    async stop(): Promise<void> {
        await Promises.settled([this.recursiveWatcher.stop(), this.nonRecursiveWatcher.stop()]);
    }
}
