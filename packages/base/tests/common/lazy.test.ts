/*
 * File: @mas/base/tests/common/lazy.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 05:58 pm
 *
 * Last Modified: 09/25/2023 05:59 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import { Lazy } from "@mas/base/common/lazy";

describe("Lazy", () => {
    test("lazy values should only be resolved once", () => {
        let counter = 0;
        const value = new Lazy(() => ++counter);

        assert.strictEqual(value.hasValue, false);
        assert.strictEqual(value.value, 1);
        assert.strictEqual(value.hasValue, true);
        assert.strictEqual(value.value, 1); // make sure we did not evaluate again
    });

    test("lazy values handle error case", () => {
        let counter = 0;
        const value = new Lazy(() => {
            throw new Error(`${++counter}`);
        });

        assert.strictEqual(value.hasValue, false);
        assert.throws(() => value.value, /\b1\b/);
        assert.strictEqual(value.hasValue, true);
        assert.throws(() => value.value, /\b1\b/);
    });
});
