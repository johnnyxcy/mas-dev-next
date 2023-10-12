/*
 * File: @mas/base/tests/node/crypto.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 10:47 am
 *
 * Last Modified: 10/12/2023 01:19 pm
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
import { afterEach, beforeEach, test } from "vitest";

import { join } from "@mas/base/common/path";
import { checksum } from "@mas/base/node/crypto";
import { Promises } from "@mas/base/node/pfs";
import { flakySuite as describe, getRandomTestPath } from "@mas/base/testing/node/utils";

describe("Crypto", () => {
    let testDir: string;

    beforeEach(async () => {
        testDir = getRandomTestPath(tmpdir(), "vsctests", "crypto");

        await Promises.mkdir(testDir, { recursive: true });
    });

    afterEach(async () => {
        await Promises.rm(testDir);
    });

    test("checksum", async () => {
        const testFile = join(testDir, "checksum.txt");
        await Promises.writeFile(testFile, "Hello World");

        await checksum(testFile, "0a4d55a8d778e5022fab701977c5d840bbc486d0");
    });
});
