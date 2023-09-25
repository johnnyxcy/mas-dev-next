/*
 * File: @mas/base/tests/common/linked-list.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 05:44 pm
 *
 * Last Modified: 09/25/2023 05:57 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

/* eslint unicorn/no-array-push-push: ["error", { ignore: ["list"] }] */

import { assert, describe, test } from "vitest";

import { LinkedList } from "@mas/base/common/linked-list";

describe("LinkedList", () => {
    function assertElements<E>(list: LinkedList<E>, ...elements: E[]): void {
        // check size
        assert.strictEqual(list.size, elements.length);

        // assert toArray
        assert.deepStrictEqual(Array.from(list), elements);

        // assert Symbol.iterator (1)
        assert.deepStrictEqual([...list], elements);

        // assert Symbol.iterator (2)
        for (const item of list) {
            assert.strictEqual(item, elements.shift());
        }
        assert.strictEqual(elements.length, 0);
    }

    test("Push/Iter", () => {
        const list = new LinkedList<number>();
        list.push(0);
        list.push(1);
        list.push(2);
        assertElements(list, 0, 1, 2);
    });

    test("Push/Remove", () => {
        let list = new LinkedList<number>();
        let disp = list.push(0);
        list.push(1);
        list.push(2);
        disp();
        assertElements(list, 1, 2);

        list = new LinkedList<number>();
        list.push(0);
        disp = list.push(1);
        list.push(2);
        disp();
        assertElements(list, 0, 2);

        list = new LinkedList<number>();
        list.push(0);
        list.push(1);
        disp = list.push(2);
        disp();
        assertElements(list, 0, 1);

        list = new LinkedList<number>();
        list.push(0);
        list.push(1);
        disp = list.push(2);
        disp();
        disp();
        assertElements(list, 0, 1);
    });

    test("Push/toArray", () => {
        const list = new LinkedList<string>();
        list.push("foo");
        list.push("bar");
        list.push("far");
        list.push("boo");

        assertElements(list, "foo", "bar", "far", "boo");
    });

    test("unshift/Iter", () => {
        const list = new LinkedList<number>();
        list.unshift(0);
        list.unshift(1);
        list.unshift(2);
        assertElements(list, 2, 1, 0);
    });

    test("unshift/Remove", () => {
        let list = new LinkedList<number>();
        let disp = list.unshift(0);
        list.unshift(1);
        list.unshift(2);
        disp();
        assertElements(list, 2, 1);

        list = new LinkedList<number>();
        list.unshift(0);
        disp = list.unshift(1);
        list.unshift(2);
        disp();
        assertElements(list, 2, 0);

        list = new LinkedList<number>();
        list.unshift(0);
        list.unshift(1);
        disp = list.unshift(2);
        disp();
        assertElements(list, 1, 0);
    });

    test("unshift/toArray", () => {
        const list = new LinkedList<string>();
        list.unshift("foo");
        list.unshift("bar");
        list.unshift("far");
        list.unshift("boo");
        assertElements(list, "boo", "far", "bar", "foo");
    });

    test("pop/unshift", () => {
        const list = new LinkedList<string>();
        list.push("a");
        list.push("b");

        assertElements(list, "a", "b");

        const a = list.shift();
        assert.strictEqual(a, "a");
        assertElements(list, "b");

        list.unshift("a");
        assertElements(list, "a", "b");

        const b = list.pop();
        assert.strictEqual(b, "b");
        assertElements(list, "a");
    });
});
