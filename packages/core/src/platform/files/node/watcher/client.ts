/*
 * File: @mas/core/src/platform/files/node/watcher/client.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 05:42 pm
 *
 * Last Modified: 11/06/2023 01:58 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DisposableStore } from "@mas/base/common/lifecycle";
import { IFileChange } from "@mas/core/platform/files/common/files";
import {
    AbstractUniversalWatcherClient,
    ILogMessage,
    IUniversalWatcher,
} from "@mas/core/platform/files/common/watcher";
import { UniversalWatcher } from "@mas/core/platform/files/node/watcher/watcher";

export class UniversalWatcherClient extends AbstractUniversalWatcherClient {
    constructor(
        onFileChanges: (changes: IFileChange[]) => void,
        onLogMessage: (msg: ILogMessage) => void,
        verboseLogging: boolean,
    ) {
        super(onFileChanges, onLogMessage, verboseLogging);

        this.init();
    }

    protected override createWatcher(disposables: DisposableStore): IUniversalWatcher {
        return new UniversalWatcher();
    }
}
