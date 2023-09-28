/*
 * File: @mas/base/tests/common/errors.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:42 pm
 *
 * Last Modified: 09/27/2023 05:47 pm
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

import { toErrorMessage } from "@mas/base/common/error-message";

describe("Errors", () => {
    test("Get Error Message", function () {
        assert.strictEqual(toErrorMessage("Foo Bar"), "Foo Bar");
        assert.strictEqual(toErrorMessage(new Error("Foo Bar")), "Foo Bar");

        let error: any = new Error();
        error = new Error();
        error.detail = {};
        error.detail.exception = {};
        error.detail.exception.message = "Foo Bar";
        assert.strictEqual(toErrorMessage(error), "Foo Bar");
        assert.strictEqual(toErrorMessage(error, true), "Foo Bar");

        assert(toErrorMessage());
        assert(toErrorMessage(null));
        assert(toErrorMessage({}));

        try {
            throw new Error();
        } catch (error) {
            assert.strictEqual(
                toErrorMessage(error),
                "An unknown error occurred. Please consult the log for more details.",
            );
            assert.ok(
                toErrorMessage(error, true).length >
                    "An unknown error occurred. Please consult the log for more details.".length,
            );
        }
    });
});
