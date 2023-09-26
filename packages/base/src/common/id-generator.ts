/*
 * File: @mas/base/src/common/id-generator.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 04:20 pm
 *
 * Last Modified: 09/26/2023 04:20 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class IdGenerator {
    private _prefix: string;
    private _lastId: number;

    constructor(prefix: string) {
        this._prefix = prefix;
        this._lastId = 0;
    }

    nextId(): string {
        return this._prefix + ++this._lastId;
    }
}

export const defaultGenerator = new IdGenerator("id#");
