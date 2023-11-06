/*
 * File: @mas/core/src/platform/files/node/watcher/nodejs/client.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 05:37 pm
 *
 * Last Modified: 11/02/2023 05:37 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 * Copyright (c) 2023 Maspectra Dev Team
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DisposableStore } from "@mas/base/common/lifecycle";
import { IFileChange } from "@mas/core/platform/files/common/files";
import {
    AbstractNonRecursiveWatcherClient,
    ILogMessage,
    INonRecursiveWatcher,
} from "@mas/core/platform/files/common/watcher";
import { NodeJSWatcher } from "@mas/core/platform/files/node/watcher/nodejs/watcher";

export class NodeJSWatcherClient extends AbstractNonRecursiveWatcherClient {
    constructor(
        onFileChanges: (changes: IFileChange[]) => void,
        onLogMessage: (msg: ILogMessage) => void,
        verboseLogging: boolean,
    ) {
        super(onFileChanges, onLogMessage, verboseLogging);

        this.init();
    }

    protected override createWatcher(disposables: DisposableStore): INonRecursiveWatcher {
        return disposables.add(new NodeJSWatcher());
    }
}
