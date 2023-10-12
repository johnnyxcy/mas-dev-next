/*
 * File: @mas/base/tests/node/node-streams.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 11:15 am
 *
 * Last Modified: 10/12/2023 11:17 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Writable } from "node:stream";
import { assert, describe, test } from "vitest";

import { StreamSplitter } from "@mas/base/node/node-streams";

describe("StreamSplitter", () => {
    test("should split a stream on a single character splitter", () =>
        new Promise<void>((resolve) => {
            const chunks: string[] = [];
            const splitter = new StreamSplitter("\n");
            const writable = new Writable({
                write(chunk, _encoding, callback) {
                    chunks.push(chunk.toString());
                    callback();
                },
            });

            splitter.pipe(writable);
            splitter.write("hello\nwor");
            splitter.write("ld\n");
            splitter.write("foo\nbar\nz");
            splitter.end(() => {
                assert.deepStrictEqual(chunks, ["hello\n", "world\n", "foo\n", "bar\n", "z"]);
                resolve();
            });
        }));

    test("should split a stream on a multi-character splitter", () =>
        new Promise<void>((resolve) => {
            const chunks: string[] = [];
            const splitter = new StreamSplitter("---");
            const writable = new Writable({
                write(chunk, _encoding, callback) {
                    chunks.push(chunk.toString());
                    callback();
                },
            });

            splitter.pipe(writable);
            splitter.write("hello---wor");
            splitter.write("ld---");
            splitter.write("foo---bar---z");
            splitter.end(() => {
                assert.deepStrictEqual(chunks, ["hello---", "world---", "foo---", "bar---", "z"]);
                resolve();
            });
        }));
});
