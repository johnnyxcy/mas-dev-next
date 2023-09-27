/*
 * File: @mas/base/src/common/functional.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 05:23 pm
 *
 * Last Modified: 09/26/2023 05:23 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Given a function, returns a function that is only calling that function once.
 */
export function createSingleCallFunction<T extends Function>(this: unknown, fn: T): T {
    const _this = this;
    let didCall = false;
    let result: unknown;

    return function _() {
        if (didCall) {
            return result;
        }

        didCall = true;

        result = fn.apply(_this, arguments);

        return result;
    } as unknown as T;
}
