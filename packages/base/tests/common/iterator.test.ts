/*
 * File: @mas/base/tests/common/iterator.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 04:23 pm
 *
 * Last Modified: 09/26/2023 04:23 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { assert, describe, test } from "vitest";

import { Iterable } from "@mas/base/common/iterator";

describe("Iterable", () => {
    const customIterable = new (class {
        *[Symbol.iterator]() {
            yield "one";
            yield "two";
            yield "three";
        }
    })();

    test("first", () => {
        assert.strictEqual(Iterable.first([]), undefined);
        assert.strictEqual(Iterable.first([1]), 1);
        assert.strictEqual(Iterable.first(customIterable), "one");
        assert.strictEqual(Iterable.first(customIterable), "one"); // fresh
    });

    test("wrap", () => {
        assert.deepStrictEqual([...Iterable.wrap(1)], [1]);
        assert.deepStrictEqual([...Iterable.wrap([1, 2, 3])], [1, 2, 3]);
    });
});
