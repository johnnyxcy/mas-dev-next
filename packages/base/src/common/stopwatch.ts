/*
 * File: @mas/base/src/common/stopwatch.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:16 am
 *
 * Last Modified: 09/27/2023 11:16 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// fake definition so that the valid layers check won't trip on this
declare const globalThis: { performance?: { now(): number } };

const hasPerformanceNow = globalThis.performance && typeof globalThis.performance.now === "function";

export class StopWatch {
    private _startTime: number;
    private _stopTime: number;

    private readonly _now: () => number;

    constructor(highResolution?: boolean) {
        this._now =
            hasPerformanceNow && highResolution === false
                ? Date.now
                : globalThis.performance!.now.bind(globalThis.performance);
        this._startTime = this._now();
        this._stopTime = -1;
    }

    static create(highResolution?: boolean): StopWatch {
        return new StopWatch(highResolution);
    }

    stop(): void {
        this._stopTime = this._now();
    }

    reset(): void {
        this._startTime = this._now();
        this._stopTime = -1;
    }

    elapsed(): number {
        if (this._stopTime !== -1) {
            return this._stopTime - this._startTime;
        }
        return this._now() - this._startTime;
    }
}
