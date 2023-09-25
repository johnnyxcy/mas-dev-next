/*
 * File: @mas/base/src/common/performance.d.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 09:22 pm
 *
 * Last Modified: 09/25/2023 09:22 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface PerformanceMark {
    readonly name: string;
    readonly startTime: number;
}

export function mark(name: string): void;

/**
 * Returns all marks, sorted by `startTime`.
 */
export function getMarks(): PerformanceMark[];
