/*
 * File: @mas/base/tests/common/encoding.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/11/2023 01:27 pm
 *
 * Last Modified: 10/12/2023 09:56 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import fs from "node:fs";
import { assert, assertType, describe, test } from "vitest";

import {
    BinaryBuffer,
    BinaryBufferReadableStream,
    newWriteableBufferStream,
    streamToBufferReadableStream,
} from "@mas/base/common/buffer";
import * as encoding from "@mas/base/common/encoding";
import { resolve } from "@mas/base/common/path";
import * as streams from "@mas/base/common/stream";
import { splitLines } from "@mas/base/common/strings";
import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";

async function detectEncodingByBOM(
    file: string,
): Promise<typeof encoding.UTF16be | typeof encoding.UTF16le | typeof encoding.UTF8_with_bom | null> {
    try {
        const { buffer, bytesRead } = await readExactlyByFile(file, 3);

        return encoding.detectEncodingByBOMFromBuffer(buffer, bytesRead);
    } catch (error) {
        return null; // ignore errors (like file not found)
    }
}

interface ReadResult {
    buffer: BinaryBuffer | null;
    bytesRead: number;
}

function readExactlyByFile(file: string, totalBytes: number): Promise<ReadResult> {
    return new Promise<ReadResult>((resolve, reject) => {
        fs.open(file, "r", null, (err, fd) => {
            if (err) {
                return reject(err);
            }

            function end(err: Error | null, resultBuffer: Buffer | null, bytesRead: number): void {
                fs.close(fd, (closeError) => {
                    if (closeError) {
                        return reject(closeError);
                    }

                    if (err && (<any>err).code === "EISDIR") {
                        return reject(err); // we want to bubble this error up (file is actually a folder)
                    }

                    return resolve({ buffer: resultBuffer ? BinaryBuffer.wrap(resultBuffer) : null, bytesRead });
                });
            }

            const buffer = Buffer.allocUnsafe(totalBytes);
            let offset = 0;

            function readChunk(): void {
                fs.read(fd, buffer, offset, totalBytes - offset, null, (err, bytesRead) => {
                    if (err) {
                        return end(err, null, 0);
                    }

                    if (bytesRead === 0) {
                        return end(null, buffer, offset);
                    }

                    offset += bytesRead;

                    if (offset === totalBytes) {
                        return end(null, buffer, offset);
                    }

                    return readChunk();
                });
            }

            readChunk();
        });
    });
}

function resolveFixturePath(relativePath: `./fixtures/${string}`): string {
    return resolve(__dirname, relativePath);
}

describe("Encoding", () => {
    ensureNoDisposablesAreLeakedInTestSuite();

    test("detectBOM does not return error for non existing file", async () => {
        const file = "some/path/that/does/not/exist.txt";

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, null);
    });

    test("detectBOM UTF-8", async () => {
        const file = resolveFixturePath("./fixtures/encoding/some_utf8.css");

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, "utf8bom");
    });

    test("detectBOM UTF-16 LE", async () => {
        const file = resolveFixturePath("./fixtures/encoding/some_utf16le.css");

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, "utf16le");
    });

    test("detectBOM UTF-16 BE", async () => {
        const file = resolveFixturePath("./fixtures/encoding/some_utf16be.css");

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, "utf16be");
    });

    test("detectBOM ANSI", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_ansi.css");

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, null);
    });

    test("detectBOM ANSI (2)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/empty.txt");

        const detectedEncoding = await detectEncodingByBOM(file);
        assert.strictEqual(detectedEncoding, null);
    });

    test("detectEncodingFromBuffer (JSON saved as PNG)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.json.png");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, false);
    });

    test("detectEncodingFromBuffer (PNG saved as TXT)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.png.txt");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, true);
    });

    test("detectEncodingFromBuffer (XML saved as PNG)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.xml.png");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, false);
    });

    test("detectEncodingFromBuffer (QWOFF saved as TXT)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.qwoff.txt");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, true);
    });

    test("detectEncodingFromBuffer (CSS saved as QWOFF)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.css.qwoff");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, false);
    });

    test("detectEncodingFromBuffer (PDF)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.pdf");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.seemsBinary, true);
    });

    test("detectEncodingFromBuffer (guess UTF-16 LE from content without BOM)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/utf16_le_nobom.txt");

        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.encoding, encoding.UTF16le);
        assert.strictEqual(mimes.seemsBinary, false);
    });

    test("detectEncodingFromBuffer (guess UTF-16 BE from content without BOM)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/utf16_be_nobom.txt");
        const buffer = await readExactlyByFile(file, 512);
        const mimes = encoding.detectEncodingFromBuffer(buffer);
        assert.strictEqual(mimes.encoding, encoding.UTF16be);
        assert.strictEqual(mimes.seemsBinary, false);
    });

    test("autoGuessEncoding (UTF8)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_file.css");

        const buffer = await readExactlyByFile(file, 512 * 8);
        const mimes = await encoding.detectEncodingFromBuffer(buffer, true);
        assert.strictEqual(mimes.encoding, "utf8");
    });

    test("autoGuessEncoding (ASCII)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_ansi.css");

        const buffer = await readExactlyByFile(file, 512 * 8);
        const mimes = await encoding.detectEncodingFromBuffer(buffer, true);
        assert.strictEqual(mimes.encoding, null);
    });

    test("autoGuessEncoding (ShiftJIS)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.shiftjis.txt");

        const buffer = await readExactlyByFile(file, 512 * 8);
        const mimes = await encoding.detectEncodingFromBuffer(buffer, true);
        assert.strictEqual(mimes.encoding, "shiftjis");
    });

    test("autoGuessEncoding (CP1252)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some.cp1252.txt");

        const buffer = await readExactlyByFile(file, 512 * 8);
        const mimes = await encoding.detectEncodingFromBuffer(buffer, true);
        assert.strictEqual(mimes.encoding, "windows1252");
    });
});

describe("Stream", () => {
    ensureNoDisposablesAreLeakedInTestSuite();

    async function readAndDecodeFromDisk(path: string, fileEncoding: string | null): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        import("@mas/base/common/encoding/iconv-lite").then((iconv) =>
                            iconv.decode(data, encoding.toNodeEncoding(fileEncoding!)),
                        ),
                    );
                }
            });
        });
    }

    function newTestReadableStream(buffers: Buffer[]): BinaryBufferReadableStream {
        const stream = newWriteableBufferStream();
        buffers.map(BinaryBuffer.wrap).forEach((buffer) => {
            setTimeout(() => {
                stream.write(buffer);
            });
        });
        setTimeout(() => {
            stream.end();
        });
        return stream;
    }

    async function readAllAsString(stream: streams.ReadableStream<string>): Promise<string> {
        return streams.consumeStream(stream, (strings) => strings.join(""));
    }

    test("toDecodeStream - some stream, expect too much data", async function () {
        const source = newTestReadableStream([
            Buffer.from([65, 66, 67]),
            Buffer.from([65, 66, 67]),
            Buffer.from([65, 66, 67]),
        ]);

        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 64,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        assert.ok(detected);
        assert.ok(stream);

        const content = await readAllAsString(stream);
        assert.strictEqual(content, "ABCABCABC");
    });

    test("toDecodeStream - some stream, no data", async function () {
        const source = newWriteableBufferStream();
        source.end();

        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 512,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        assert.ok(detected);
        assert.ok(stream);

        const content = await readAllAsString(stream);
        assert.strictEqual(content, "");
    });

    test("toDecodeStream - encoding, utf16be", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_utf16be.css");
        const source = streamToBufferReadableStream(fs.createReadStream(file));

        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 64,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        assert.strictEqual(detected.encoding, "utf16be");
        assert.strictEqual(detected.seemsBinary, false);

        const expected = await readAndDecodeFromDisk(file, detected.encoding);
        const actual = await readAllAsString(stream);
        assert.strictEqual(actual, expected);
    });

    test("toDecodeStream - empty file", async function () {
        const file = resolveFixturePath("./fixtures/encoding/empty.txt");

        const source = streamToBufferReadableStream(fs.createReadStream(file));
        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        const expected = await readAndDecodeFromDisk(file, detected.encoding);
        const actual = await readAllAsString(stream);
        assert.strictEqual(actual, expected);
    });

    test("toDecodeStream - decodes buffer entirely", async function () {
        const emojis = Buffer.from("🖥️💻💾");
        const incompleteEmojis = emojis.slice(0, emojis.length - 1);

        const buffers: Buffer[] = [];
        for (let i = 0; i < incompleteEmojis.length; i++) {
            buffers.push(incompleteEmojis.slice(i, i + 1));
        }

        const source = newTestReadableStream(buffers);
        const { stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 4,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        const expected = new TextDecoder().decode(incompleteEmojis);
        const actual = await readAllAsString(stream);

        assert.strictEqual(actual, expected);
    });

    test("toDecodeStream - some stream (GBK issue #101856)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_gbk.txt");

        const source = streamToBufferReadableStream(fs.createReadStream(file));
        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 4,
            guessEncoding: false,
            overwriteEncoding: async () => "gbk",
        });
        assert.ok(detected);
        assert.ok(stream);

        const content = await readAllAsString(stream);
        assert.strictEqual(content.length, 65537);
    });

    test("toDecodeStream - some stream (UTF-8 issue #102202)", async function () {
        const file = resolveFixturePath("./fixtures/encoding/issue_102202.txt");

        const source = streamToBufferReadableStream(fs.createReadStream(file));
        const { detected, stream } = await encoding.toDecodeStream(source, {
            acceptTextOnly: true,
            minBytesRequiredForDetection: 4,
            guessEncoding: false,
            overwriteEncoding: async () => "utf-8",
        });
        assert.ok(detected);
        assert.ok(stream);

        const content = await readAllAsString(stream);
        const lines = splitLines(content);

        assert.strictEqual(
            lines[981].toString(),
            "啊啊啊啊啊啊aaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊，啊啊啊啊啊啊啊啊啊啊啊。",
        );
    });

    test("toDecodeStream - binary", async function () {
        const source = () => {
            return newTestReadableStream([Buffer.from([0, 0, 0]), Buffer.from("Hello World"), Buffer.from([0])]);
        };

        // acceptTextOnly: true

        let error: encoding.DecodeStreamError | undefined = undefined;
        try {
            await encoding.toDecodeStream(source(), {
                acceptTextOnly: true,
                guessEncoding: false,
                overwriteEncoding: async (detected) => detected || encoding.UTF8,
            });
        } catch (e) {
            error = e;
        }

        assert(error !== undefined);
        assertType<encoding.DecodeStreamError>(error);
        assert.strictEqual(error.decodeStreamErrorKind, encoding.DecodeStreamErrorKind.STREAM_IS_BINARY);

        // acceptTextOnly: false

        const { detected, stream } = await encoding.toDecodeStream(source(), {
            acceptTextOnly: false,
            guessEncoding: false,
            overwriteEncoding: async (detected) => detected || encoding.UTF8,
        });

        assert.ok(detected);
        assert.strictEqual(detected.seemsBinary, true);
        assert.ok(stream);
    });

    test("toEncodeReadable - encoding, utf16be", async function () {
        const file = resolveFixturePath("./fixtures/encoding/some_utf16be.css");

        const source = await readAndDecodeFromDisk(file, encoding.UTF16be);

        const iconv = await import("@mas/base/common/encoding/iconv-lite");

        const expected = BinaryBuffer.wrap(iconv.encode(source, encoding.toNodeEncoding(encoding.UTF16be))).toString();

        const actual = streams
            .consumeReadable(
                await encoding.toEncodeReadable(streams.toReadable(source), encoding.UTF16be),
                BinaryBuffer.concat,
            )
            .toString();

        assert.strictEqual(actual, expected);
    });

    test("toEncodeReadable - empty readable to utf8", async function () {
        const source: streams.Readable<string> = {
            read() {
                return null;
            },
        };

        const actual = streams
            .consumeReadable(await encoding.toEncodeReadable(source, encoding.UTF8), BinaryBuffer.concat)
            .toString();

        assert.strictEqual(actual, "");
    });

    [
        {
            utfEncoding: encoding.UTF8,
            relatedBom: encoding.UTF8_BOM,
        },
        {
            utfEncoding: encoding.UTF8_with_bom,
            relatedBom: encoding.UTF8_BOM,
        },
        {
            utfEncoding: encoding.UTF16be,
            relatedBom: encoding.UTF16be_BOM,
        },
        {
            utfEncoding: encoding.UTF16le,
            relatedBom: encoding.UTF16le_BOM,
        },
    ].forEach(({ utfEncoding, relatedBom }) => {
        test(`toEncodeReadable - empty readable to ${utfEncoding} with BOM`, async function () {
            const source: streams.Readable<string> = {
                read() {
                    return null;
                },
            };

            const encodedReadable = encoding.toEncodeReadable(source, utfEncoding, { addBOM: true });

            const expected = BinaryBuffer.wrap(Buffer.from(relatedBom)).toString();
            const actual = streams.consumeReadable(await encodedReadable, BinaryBuffer.concat).toString();

            assert.strictEqual(actual, expected);
        });
    });

    test("encodingExists", async function () {
        for (const enc in encoding.SUPPORTED_ENCODINGS) {
            if (enc === encoding.UTF8_with_bom) {
                continue; // skip over encodings from us
            }
            const iconv = await import("@mas/base/common/encoding/iconv-lite");

            assert.strictEqual(iconv.encodingExists(enc), true, enc);
        }
    });
});
