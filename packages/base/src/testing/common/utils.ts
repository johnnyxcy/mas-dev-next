/*
 * File: @mas/base/src/testing/common/utils.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:05 am
 *
 * Last Modified: 09/27/2023 01:55 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { afterAll, beforeAll, describe, test } from "vitest";

import {
    DisposableStore,
    DisposableTracker,
    setDisposableTracker,
    type IDisposable,
} from "@mas/base/common/lifecycle";
import { join } from "@mas/base/common/path";
import { isWindows } from "@mas/base/common/platform";
import { URI } from "@mas/base/common/uri";

export type ValueCallback<T = any> = (value: T | Promise<T>) => void;

export function toResource(this: any, path: string): URI {
    if (isWindows) {
        return URI.file(join("C:\\", btoa(this.test.fullTitle()), path));
    }

    return URI.file(join("/", btoa(this.test.fullTitle()), path));
}

export function suiteRepeat(n: number, description: string, callback: (this: any) => void): void {
    for (let i = 0; i < n; i++) {
        describe(`${description} (iteration ${i})`, callback);
    }
}

export function testRepeat(n: number, description: string, callback: (this: any) => any): void {
    for (let i = 0; i < n; i++) {
        test(`${description} (iteration ${i})`, callback);
    }
}

export async function assertThrowsAsync(
    block: () => any,
    message: string | Error = "Missing expected exception",
): Promise<void> {
    try {
        await block();
    } catch {
        return;
    }

    const err = message instanceof Error ? message : new Error(message);
    throw err;
}

/**
 * Use this function to ensure that all disposables are cleaned up at the end of each test in the current suite.
 *
 * Use `markAsSingleton` if disposable singletons are created lazily that are allowed to outlive the test.
 * Make sure that the singleton properly registers all child disposables so that they are excluded too.
 *
 * @returns A {@link DisposableStore} that can optionally be used to track disposables in the test.
 * This will be automatically disposed on test teardown.
 */
export function ensureNoDisposablesAreLeakedInTestSuite(): Pick<DisposableStore, "add"> {
    let tracker: DisposableTracker | undefined;
    let store: DisposableStore;
    beforeAll(() => {
        store = new DisposableStore();
        tracker = new DisposableTracker();
        setDisposableTracker(tracker);
    });

    afterAll((context) => {
        store.dispose();
        setDisposableTracker(null);
        if (context.result?.state !== "fail") {
            const result = tracker!.computeLeakingDisposables();
            if (result) {
                console.error(result.details);
                throw new Error(`There are ${result.leaks.length} undisposed disposables!${result.details}`);
            }
        }
    });

    // Wrap store as the suite function is called before it's initialized
    const testContext = {
        add<T extends IDisposable>(o: T): T {
            return store.add(o);
        },
    };
    return testContext;
}

export function throwIfDisposablesAreLeaked(body: () => void, logToConsole = true): void {
    const tracker = new DisposableTracker();
    setDisposableTracker(tracker);
    body();
    setDisposableTracker(null);
    computeLeakingDisposables(tracker, logToConsole);
}

export async function throwIfDisposablesAreLeakedAsync(body: () => Promise<void>): Promise<void> {
    const tracker = new DisposableTracker();
    setDisposableTracker(tracker);
    await body();
    setDisposableTracker(null);
    computeLeakingDisposables(tracker);
}

function computeLeakingDisposables(tracker: DisposableTracker, logToConsole = true) {
    const result = tracker.computeLeakingDisposables();
    if (result) {
        if (logToConsole) {
            console.error(result.details);
        }
        throw new Error(`There are ${result.leaks.length} undisposed disposables!${result.details}`);
    }
}
