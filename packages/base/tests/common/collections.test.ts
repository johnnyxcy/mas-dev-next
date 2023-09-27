/*
 * File: @mas/base/tests/common/collections.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 01:05 pm
 *
 * Last Modified: 09/27/2023 01:05 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { assert, describe, test } from "vitest";

import * as collections from "@mas/base/common/collections";

describe("Collections", () => {
    test("groupBy", () => {
        const group1 = "a";
        const group2 = "b";
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;
        const source = [
            { key: group1, value: value1 },
            { key: group1, value: value2 },
            { key: group2, value: value3 },
        ];

        const grouped = collections.groupBy(source, (x) => x.key);

        // Group 1
        assert.strictEqual(grouped[group1].length, 2);
        assert.strictEqual(grouped[group1][0].value, value1);
        assert.strictEqual(grouped[group1][1].value, value2);

        // Group 2
        assert.strictEqual(grouped[group2].length, 1);
        assert.strictEqual(grouped[group2][0].value, value3);
    });
});
