/*
 * File: @mas/base/src/common/ports.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 02:37 pm
 *
 * Last Modified: 09/27/2023 02:37 pm
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
 * @returns Returns a random port between 1025 and 65535.
 */
export function randomPort(): number {
    const min = 1025;
    const max = 65535;
    return min + Math.floor((max - min) * Math.random());
}
