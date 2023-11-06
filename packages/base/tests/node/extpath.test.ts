/*
 * File: @mas/base/tests/node/extpath.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 05:33 pm
 *
 * Last Modified: 11/02/2023 05:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { tmpdir } from "node:os";
import { assert, describe, test } from "vitest";

import { realcase, realcaseSync, realpath, realpathSync } from "@mas/base/node/extpath";
import { Promises } from "@mas/base/node/pfs";
import { ensureNoDisposablesAreLeakedInTestSuite, setup, teardown } from "@mas/base/testing/common/utils";
import { getRandomTestPath } from "@mas/base/testing/node/utils";

describe("Extpath", () => {
    let testDir: string;

    setup(async () => {
        testDir = getRandomTestPath(tmpdir(), "vsctests", "extpath");

        await Promises.mkdir(testDir, { recursive: true });
    });

    teardown(async () => {
        await Promises.rm(testDir);
    });

    test("realcaseSync", async () => {
        // assume case insensitive file system
        if (process.platform === "win32" || process.platform === "darwin") {
            const upper = testDir.toUpperCase();
            const real = realcaseSync(upper);

            if (real) {
                // can be null in case of permission errors
                assert.notStrictEqual(real, upper);
                assert.strictEqual(real.toUpperCase(), upper);
                assert.strictEqual(real, testDir);
            }
        }

        // linux, unix, etc. -> assume case sensitive file system
        else {
            let real = realcaseSync(testDir);
            assert.strictEqual(real, testDir);

            real = realcaseSync(testDir.toUpperCase());
            assert.strictEqual(real, testDir.toUpperCase());
        }
    });

    test("realcase", async () => {
        // assume case insensitive file system
        if (process.platform === "win32" || process.platform === "darwin") {
            const upper = testDir.toUpperCase();
            const real = await realcase(upper);

            if (real) {
                // can be null in case of permission errors
                assert.notStrictEqual(real, upper);
                assert.strictEqual(real.toUpperCase(), upper);
                assert.strictEqual(real, testDir);
            }
        }

        // linux, unix, etc. -> assume case sensitive file system
        else {
            let real = await realcase(testDir);
            assert.strictEqual(real, testDir);

            real = await realcase(testDir.toUpperCase());
            assert.strictEqual(real, testDir.toUpperCase());
        }
    });

    test("realpath", async () => {
        const realpathVal = await realpath(testDir);
        assert.ok(realpathVal);
    });

    test("realpathSync", () => {
        const realpath = realpathSync(testDir);
        assert.ok(realpath);
    });

    ensureNoDisposablesAreLeakedInTestSuite();
});
