/*
 * File: @mas/base/tests/node/zip/zip.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 01:09 pm
 *
 * Last Modified: 10/12/2023 01:11 pm
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

import { createCancelablePromise } from "@mas/base/common/async";
import * as path from "@mas/base/common/path";
import { Promises } from "@mas/base/node/pfs";
import { extract } from "@mas/base/node/zip";
import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";
import { getRandomTestPath } from "@mas/base/testing/node/utils";

describe("Zip", () => {
    ensureNoDisposablesAreLeakedInTestSuite();

    test("extract should handle directories", async () => {
        const testDir = getRandomTestPath(tmpdir(), "vsctests", "zip");
        await Promises.mkdir(testDir, { recursive: true });

        const fixtures = path.resolve(__dirname, "./fixtures");
        const fixture = path.join(fixtures, "extract.zip");

        await createCancelablePromise((token) => extract(fixture, testDir, {}, token));
        const doesExist = await Promises.exists(path.join(testDir, "extension"));
        assert(doesExist);

        await Promises.rm(testDir);
    });
});
