/*
 * File: @mas/base/src/common/ansi.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/11/2023 10:15 am
 *
 * Last Modified: 10/11/2023 10:21 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

type AnsiRegexOptions = {
    /**
     * Match only the first ANSI escape.
     */
    onlyFirst?: boolean;
};
export function ansiRegex({ onlyFirst = false }: AnsiRegexOptions = {}) {
    const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|");

    return new RegExp(pattern, onlyFirst ? undefined : "g");
}

export function stripAnsi(str: string): string;
export function stripAnsi<T>(str: T): T;
export function stripAnsi<T>(str: string | T): string | T {
    return typeof str === "string" ? str.replace(ansiRegex(), "") : str;
}
