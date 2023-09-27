/*
 * File: @mas/base/tests/common/marshalling.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:23 pm
 *
 * Last Modified: 09/27/2023 05:24 pm
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

import { parse, stringify } from "@mas/base/common/marshalling";
import { URI } from "@mas/base/common/uri";

describe("Marshalling", () => {
    test("RegExp", () => {
        const value = /foo/gim;
        const raw = stringify(value);
        const clone = <RegExp>parse(raw);

        assert.strictEqual(value.source, clone.source);
        assert.strictEqual(value.global, clone.global);
        assert.strictEqual(value.ignoreCase, clone.ignoreCase);
        assert.strictEqual(value.multiline, clone.multiline);
    });

    test("URI", () => {
        const value = URI.from({
            scheme: "file",
            authority: "server",
            path: "/shares/c#files",
            query: "q",
            fragment: "f",
        });
        const raw = stringify(value);
        const clone = <URI>parse(raw);

        assert.strictEqual(value.scheme, clone.scheme);
        assert.strictEqual(value.authority, clone.authority);
        assert.strictEqual(value.path, clone.path);
        assert.strictEqual(value.query, clone.query);
        assert.strictEqual(value.fragment, clone.fragment);
    });

    test("Bug 16793:# in folder name => mirror models get out of sync", () => {
        const uri1 = URI.file("C:\\C#\\file.txt");
        assert.strictEqual(parse(stringify(uri1)).toString(), uri1.toString());
    });
});
