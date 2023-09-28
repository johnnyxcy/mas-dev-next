/*
 * File: @mas/base/tests/common/uuid.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/28/2023 08:49 am
 *
 * Last Modified: 09/28/2023 08:49 am
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

import * as uuid from "@mas/base/common/uuid";

describe("UUID", () => {
    test("generation", () => {
        const asHex = uuid.generateUuid();
        assert.strictEqual(asHex.length, 36);
        assert.strictEqual(asHex[14], "4");
        assert.ok(asHex[19] === "8" || asHex[19] === "9" || asHex[19] === "a" || asHex[19] === "b");
    });

    test("self-check", function () {
        const t1 = Date.now();
        while (Date.now() - t1 < 50) {
            const value = uuid.generateUuid();
            assert.ok(uuid.isUUID(value));
        }
    });
});
