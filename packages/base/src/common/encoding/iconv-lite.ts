/*
 * File: @mas/base/src/common/encoding/iconv-lite.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/11/2023 01:15 pm
 *
 * Last Modified: 10/12/2023 09:40 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

export { decode, encode, encodingExists, getDecoder, getEncoder } from "iconv-lite";

/**
 * Typings for iconv-lite 0.4.x
 *
 * We don't use the typings from DefinitelyTyped because @types/iconv-lite does not export the
 * `getEncoder` and `getDecoder` functions, which we need.
 *
 * Also, we don't want `decodeStream` and `encodeStream` because they are specific to node.
 */
declare module "iconv-lite" {
    export function decode(buffer: Buffer, encoding: string, options?: Options): string;

    export function encode(content: string, encoding: string, options?: Options): Buffer;

    export function encodingExists(encoding: string): boolean;

    // Stream API
    // WARNING: Excluded because it is specific to node.
    // export function decodeStream(encoding: string, options?: Options): NodeJS.ReadWriteStream;

    // export function encodeStream(encoding: string, options?: Options): NodeJS.ReadWriteStream;

    // Low-level stream APIs
    export function getEncoder(encoding: string, options?: Options): EncoderStream;

    export function getDecoder(encoding: string, options?: Options): DecoderStream;
}

export interface Options {
    stripBOM?: boolean;
    addBOM?: boolean;
    defaultEncoding?: string;
}

export interface EncoderStream {
    write(str: string): Uint8Array;
    end(): Uint8Array | undefined;
}

export interface DecoderStream {
    write(buf: Uint8Array): string;
    end(): string | undefined;
}
