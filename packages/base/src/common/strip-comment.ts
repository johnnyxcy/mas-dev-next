/*
 * File: @mas/base/src/common/strip-comment.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 09:25 pm
 *
 * Last Modified: 10/16/2023 03:02 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// First group matches a double quoted string
// Second group matches a single quoted string
// Third group matches a multi line comment
// Forth group matches a single line comment
// Fifth group matches a trailing comma
const regexp =
    /("[^"\\]*(?:\\.[^"\\]*)*")|('[^'\\]*(?:\\.[^'\\]*)*')|(\/\*[^\/\*]*(?:(?:\*|\/)[^\/\*]*)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))|(,\s*[}\]])/g;

/**
 * Strips single and multi line JavaScript comments from JSON
 * content. Ignores characters in strings BUT doesn't support
 * string continuation across multiple lines since it is not
 * supported in JSON.
 * @param content the content to strip comments from
 * @returns the content without comments
 */
export function stripComments(content: string): string {
    return content.replace(regexp, function (match, _m1, _m2, m3, m4, m5) {
        // Only one of m1, m2, m3, m4, m5 matches
        if (m3) {
            // A block comment. Replace with nothing
            return "";
        } else if (m4) {
            // Since m4 is a single line comment is is at least of length 2 (e.g. //)
            // If it ends in \r?\n then keep it.
            const length = m4.length;
            if (m4[length - 1] === "\n") {
                return m4[length - 2] === "\r" ? "\r\n" : "\n";
            } else {
                return "";
            }
        } else if (m5) {
            // Remove the trailing comma
            return match.substring(1);
        } else {
            // We match a string
            return match;
        }
    });
}
