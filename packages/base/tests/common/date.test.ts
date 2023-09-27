/*
 * File: @mas/base/tests/common/date.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:01 am
 *
 * Last Modified: 09/27/2023 11:06 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import { fromNow } from "@mas/base/common/date";

import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";

const { strictEqual } = assert;

describe("Date", () => {
    ensureNoDisposablesAreLeakedInTestSuite();

    describe("fromNow", () => {
        test("appendAgoLabel", () => {
            strictEqual(fromNow(Date.now() - 35000), "35 secs");
            strictEqual(fromNow(Date.now() - 35000, false), "35 secs");
            strictEqual(fromNow(Date.now() - 35000, true), "35 secs ago");
        });
        test("useFullTimeWords", () => {
            strictEqual(fromNow(Date.now() - 35000), "35 secs");
            strictEqual(fromNow(Date.now() - 35000, undefined, false), "35 secs");
            strictEqual(fromNow(Date.now() - 35000, undefined, true), "35 seconds");
        });
        test("disallowNow", () => {
            strictEqual(fromNow(Date.now() - 5000), "now");
            strictEqual(fromNow(Date.now() - 5000, undefined, undefined, false), "now");
            strictEqual(fromNow(Date.now() - 5000, undefined, undefined, true), "5 secs");
        });
    });
});
