/*
 * File: @mas/base/tests/browser/browser.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 01:36 pm
 *
 * Last Modified: 10/12/2023 01:36 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { assert, describe, test } from "vitest";

import { isMacintosh, isWindows } from "@mas/base/common/platform";

describe("Browsers", () => {
    test("all", () => {
        assert(!(isWindows && isMacintosh));
    });
});
