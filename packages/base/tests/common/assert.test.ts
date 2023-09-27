/*
 * File: @mas/base/tests/common/assert.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 01:07 pm
 *
 * Last Modified: 09/27/2023 01:09 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { assert, describe, test } from "vitest";

import { ok } from "@mas/base/common/assert";

describe("Assert", () => {
    test("ok", () => {
        assert.throws(() => {
            ok(false);
        });

        assert.throws(() => {
            ok(null);
        });

        assert.throws(() => {
            ok();
        });

        assert.throws(() => {
            ok(null, "Foo Bar");
        }, "Foo Bar");

        ok(true);
        ok("foo");
        ok({});
        ok(5);
    });
});
