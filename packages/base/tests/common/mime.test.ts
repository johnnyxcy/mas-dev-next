/*
 * File: @mas/base/tests/common/mime.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:30 am
 *
 * Last Modified: 09/27/2023 11:30 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import { normalizeMimeType } from "@mas/base/common/mime";

describe("Mime", () => {
    test("normalize", () => {
        assert.strictEqual(normalizeMimeType("invalid"), "invalid");
        assert.strictEqual(normalizeMimeType("invalid", true), undefined);
        assert.strictEqual(normalizeMimeType("Text/plain"), "text/plain");
        assert.strictEqual(normalizeMimeType("Text/pläin"), "text/pläin");
        assert.strictEqual(normalizeMimeType("Text/plain;UPPER"), "text/plain;UPPER");
        assert.strictEqual(normalizeMimeType("Text/plain;lower"), "text/plain;lower");
    });
});
