/*
 * File: @mas/base/src/common/parsers.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 05:25 pm
 *
 * Last Modified: 09/28/2023 08:46 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const enum ValidationState {
    OK = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Fatal = 4,
}

export class ValidationStatus {
    private _state: ValidationState;

    constructor() {
        this._state = ValidationState.OK;
    }

    get state(): ValidationState {
        return this._state;
    }

    set state(value: ValidationState) {
        if (value > this._state) {
            this._state = value;
        }
    }

    isOK(): boolean {
        return this._state === ValidationState.OK;
    }

    isFatal(): boolean {
        return this._state === ValidationState.Fatal;
    }
}

export interface IProblemReporter {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    status: ValidationStatus;
}

export abstract class Parser {
    private _problemReporter: IProblemReporter;

    constructor(problemReporter: IProblemReporter) {
        this._problemReporter = problemReporter;
    }

    get problemReporter(): IProblemReporter {
        return this._problemReporter;
    }

    reset(): void {
        this._problemReporter.status.state = ValidationState.OK;
    }

    info(message: string): void {
        this._problemReporter.info(message);
    }

    warn(message: string): void {
        this._problemReporter.warn(message);
    }

    error(message: string): void {
        this._problemReporter.error(message);
    }

    fatal(message: string): void {
        this._problemReporter.fatal(message);
    }
}
