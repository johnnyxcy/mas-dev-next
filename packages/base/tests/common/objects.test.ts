/*
 * File: @mas/base/tests/common/objects.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 05:28 pm
 *
 * Last Modified: 09/26/2023 05:29 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import * as objects from "@mas/base/common/objects";

const check = (one: any, other: any, msg: string) => {
    assert(objects.equals(one, other), msg);
    assert(objects.equals(other, one), "[reverse] " + msg);
};

const checkNot = (one: any, other: any, msg: string) => {
    assert(!objects.equals(one, other), msg);
    assert(!objects.equals(other, one), "[reverse] " + msg);
};

describe("Objects", () => {
    test("equals", () => {
        check(null, null, "null");
        check(undefined, undefined, "undefined");
        check(1234, 1234, "numbers");
        check("", "", "empty strings");
        check("1234", "1234", "strings");
        check([], [], "empty arrays");
        // check(['', 123], ['', 123], 'arrays');
        check(
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            "nested arrays",
        );
        check({}, {}, "empty objects");
        check({ a: 1, b: "123" }, { a: 1, b: "123" }, "objects");
        check({ a: 1, b: "123" }, { b: "123", a: 1 }, "objects (key order)");
        check({ a: { b: 1, c: 2 }, b: 3 }, { a: { b: 1, c: 2 }, b: 3 }, "nested objects");

        checkNot(null, undefined, "null != undefined");
        checkNot(null, "", "null != empty string");
        checkNot(null, [], "null != empty array");
        checkNot(null, {}, "null != empty object");
        checkNot(null, 0, "null != zero");
        checkNot(undefined, "", "undefined != empty string");
        checkNot(undefined, [], "undefined != empty array");
        checkNot(undefined, {}, "undefined != empty object");
        checkNot(undefined, 0, "undefined != zero");
        checkNot("", [], "empty string != empty array");
        checkNot("", {}, "empty string != empty object");
        checkNot("", 0, "empty string != zero");
        checkNot([], {}, "empty array != empty object");
        checkNot([], 0, "empty array != zero");
        checkNot(0, [], "zero != empty array");

        checkNot("1234", 1234, "string !== number");

        checkNot(
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            [
                [1, 2, 3],
                [4, 5, 6000],
            ],
            "arrays",
        );
        checkNot({ a: { b: 1, c: 2 }, b: 3 }, { b: 3, a: { b: 9, c: 2 } }, "objects");
    });

    test("mixin - array", () => {
        const foo: any = {};
        objects.mixin(foo, { bar: [1, 2, 3] });

        assert(foo.bar);
        assert(Array.isArray(foo.bar));
        assert.strictEqual(foo.bar.length, 3);
        assert.strictEqual(foo.bar[0], 1);
        assert.strictEqual(foo.bar[1], 2);
        assert.strictEqual(foo.bar[2], 3);
    });

    test("mixin - no overwrite", () => {
        const foo: any = {
            bar: "123",
        };

        const bar: any = {
            bar: "456",
        };

        objects.mixin(foo, bar, false);

        assert.strictEqual(foo.bar, "123");
    });

    test("cloneAndChange", () => {
        const o1 = { something: "hello" };
        const o = {
            o1,
            o2: o1,
        };
        assert.deepStrictEqual(
            objects.cloneAndChange(o, () => {}),
            o,
        );
    });

    test("safeStringify", () => {
        const obj1: any = {
            friend: null,
        };

        const obj2: any = {
            friend: null,
        };

        obj1.friend = obj2;
        obj2.friend = obj1;

        const arr: any = [1];
        arr.push(arr);

        const circular: any = {
            a: 42,
            b: null,
            c: [obj1, obj2],
            d: null,
        };

        arr.push(circular);

        circular.b = circular;
        circular.d = arr;

        const result = objects.safeStringify(circular);

        assert.deepStrictEqual(JSON.parse(result), {
            a: 42,
            b: "[Circular]",
            c: [
                {
                    friend: {
                        friend: "[Circular]",
                    },
                },
                "[Circular]",
            ],
            d: [1, "[Circular]", "[Circular]"],
        });
    });

    test("distinct", () => {
        const base = {
            one: "one",
            two: 2,
            three: {
                3: true,
            },
            four: false,
        };

        let diff = objects.distinct(base, base);
        assert.strictEqual(Object.keys(diff).length, 0);

        let obj = {};

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 0);

        obj = {
            one: "one",
            two: 2,
        };

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 0);

        obj = {
            three: {
                3: true,
            },
            four: false,
        };

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 0);

        obj = {
            one: "two",
            two: 2,
            three: {
                3: true,
            },
            four: true,
        };

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 2);
        assert.strictEqual(diff.one, "two");
        assert.strictEqual(diff.four, true);

        obj = {
            one: null,
            two: 2,
            three: {
                3: true,
            },
            four: undefined,
        };

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 2);
        assert.strictEqual(diff.one, null);
        assert.strictEqual(diff.four, undefined);

        obj = {
            one: "two",
            two: 3,
            three: { 3: false },
            four: true,
        };

        diff = objects.distinct(base, obj);
        assert.strictEqual(Object.keys(diff).length, 4);
        assert.strictEqual(diff.one, "two");
        assert.strictEqual(diff.two, 3);
        assert.strictEqual(diff.three?.["3"], false);
        assert.strictEqual(diff.four, true);
    });

    test("getCaseInsensitive", () => {
        const obj1 = {
            lowercase: 123,
            mIxEdCaSe: 456,
        };

        assert.strictEqual(obj1.lowercase, objects.getCaseInsensitive(obj1, "lowercase"));
        assert.strictEqual(obj1.lowercase, objects.getCaseInsensitive(obj1, "lOwErCaSe"));

        assert.strictEqual(obj1.mIxEdCaSe, objects.getCaseInsensitive(obj1, "MIXEDCASE"));
        assert.strictEqual(obj1.mIxEdCaSe, objects.getCaseInsensitive(obj1, "mixedcase"));
    });
});
