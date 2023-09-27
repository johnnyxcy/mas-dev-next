/*
 * File: @mas/base/src/common/sequence.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 01:11 pm
 *
 * Last Modified: 09/27/2023 01:36 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, type Event } from "@mas/base/common/event";

export interface ISplice<T> {
    readonly start: number;
    readonly deleteCount: number;
    readonly toInsert: readonly T[];
}

export interface ISpliceable<T> {
    splice(start: number, deleteCount: number, toInsert: readonly T[]): void;
}

export interface ISequence<T> {
    readonly elements: T[];
    readonly onDidSplice: Event<ISplice<T>>;
}

export class Sequence<T> implements ISequence<T>, ISpliceable<T> {
    readonly elements: T[] = [];

    private readonly _onDidSplice = new Emitter<ISplice<T>>();
    readonly onDidSplice: Event<ISplice<T>> = this._onDidSplice.event;

    splice(start: number, deleteCount: number, toInsert: readonly T[] = []): void {
        this.elements.splice(start, deleteCount, ...toInsert);
        this._onDidSplice.fire({ start, deleteCount, toInsert });
    }
}
