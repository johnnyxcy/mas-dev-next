/*
 * File: @mas/i18n/tests/nls.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:26 pm
 *
 * Last Modified: 09/27/2023 02:00 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { describe, expect, it } from "vitest";

import nls from "@mas/i18n/nls";

describe("nls", () => {
    it("should be defined", () => {
        expect(nls).toBeDefined();
    });

    it("should be a function", () => {
        expect(nls.localize).toBeInstanceOf(Function);
    });

    it("should return the default value", () => {
        expect(nls.localize("test.key", "Test Value")).toBe("Test Value");
    });

    it("should return the default value with arguments", () => {
        expect(nls.localize("test.key", `Test Value "{0}"`, "Hello World")).toBe(`Test Value "Hello World"`);
    });

    it("should return the default value with multiple interpolation", () => {
        expect(nls.localize("test.key", `Test Value "{0}" "{1}"`, "Hello World", "Foo Bar")).toBe(
            `Test Value "Hello World" "Foo Bar"`,
        );
    });
});
