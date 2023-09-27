/*
 * File: @mas/base/src/common/assert.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 01:06 pm
 *
 * Last Modified: 09/27/2023 01:08 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BugIndicatingError, onUnexpectedError } from "@mas/base/common/errors";

/**
 * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
 *
 * @deprecated Use `assert(...)` instead.
 * This method is usually used like this:
 * ```ts
 * import * as assert from '@mas/base/common/assert';
 * assert.ok(...);
 * ```
 *
 * However, `assert` in that example is a user chosen name.
 * There is no tooling for generating such an import statement.
 * Thus, the `assert(...)` function should be used instead.
 */
export function ok(value?: unknown, message?: string) {
    if (!value) {
        throw new Error(message ? `Assertion failed (${message})` : "Assertion Failed");
    }
}

export function assertNever(value: never, message = "Unreachable"): never {
    throw new Error(message);
}

export function assert(condition: boolean): void {
    if (!condition) {
        throw new BugIndicatingError("Assertion Failed");
    }
}

/**
 * condition must be side-effect free!
 */
export function assertFn(condition: () => boolean): void {
    if (!condition()) {
        // eslint-disable-next-line no-debugger
        debugger;
        // Reevaluate `condition` again to make debugging easier
        condition();
        onUnexpectedError(new BugIndicatingError("Assertion Failed"));
    }
}

export function checkAdjacentItems<T>(items: readonly T[], predicate: (item1: T, item2: T) => boolean): boolean {
    let i = 0;
    while (i < items.length - 1) {
        const a = items[i];
        const b = items[i + 1];
        if (!predicate(a, b)) {
            return false;
        }
        i++;
    }
    return true;
}
