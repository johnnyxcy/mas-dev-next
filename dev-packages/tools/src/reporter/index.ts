/*
 * File: @mas/tools/src/reporter/index.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 10:14 am
 *
 * Last Modified: 10/27/2023 11:14 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 * Copyright (c) 2023 Maspectra Dev Team
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from "node:fs";

import * as path from "node:path";

import ansiColors from "ansi-colors";
import fancyLog from "fancy-log";
import through from "through";

class ErrorLog {
    allErrors: string[][] = [];
    startTime: number | null = null;
    count = 0;

    constructor(public id: string) {}

    onStart(): void {
        if (this.count++ > 0) {
            return;
        }

        this.startTime = new Date().getTime();
        fancyLog(`Starting ${ansiColors.green("compilation")}${this.id ? ansiColors.blue(` ${this.id}`) : ""}...`);
    }

    onEnd(): void {
        if (--this.count > 0) {
            return;
        }

        this.log();
    }

    log(): void {
        const errors = this.allErrors.flat();
        const seen = new Set<string>();

        errors.forEach((err) => {
            if (!seen.has(err)) {
                seen.add(err);
                fancyLog(`${ansiColors.red("Error")}: ${err}`);
            }
        });

        fancyLog(
            `Finished ${ansiColors.green("compilation")}${this.id ? ansiColors.blue(` ${this.id}`) : ""} with ${
                errors.length
            } errors after ${ansiColors.magenta(new Date().getTime() - this.startTime! + " ms")}`,
        );

        const regex = /^([^(]+)\((\d+),(\d+)\): (.*)$/s;
        const messages = errors
            .map((err) => regex.exec(err))
            .filter((match) => !!match)
            .map((x) => x as string[])
            .map(([, path, line, column, message]) => ({
                path,
                line: Number.parseInt(line),
                column: Number.parseInt(column),
                message,
            }));

        try {
            const logFileName = "log" + (this.id ? `_${this.id}` : "");
            fs.writeFileSync(path.join(buildLogFolder, logFileName), JSON.stringify(messages));
        } catch (err) {
            // noop
        }
    }
}

const errorLogsById = new Map<string, ErrorLog>();
function getErrorLog(id: string = ""): ErrorLog {
    let errorLog = errorLogsById.get(id);
    if (!errorLog) {
        errorLog = new ErrorLog(id);
        errorLogsById.set(id, errorLog);
    }
    return errorLog;
}

const buildLogFolder = path.join(path.dirname(path.dirname(__dirname)), ".build");

try {
    fs.mkdirSync(buildLogFolder);
} catch (err) {
    // ignore
}

export interface IReporter {
    (err: string): void;
    hasErrors(): boolean;
    end(emitError: boolean): NodeJS.ReadWriteStream;
}

export function createReporter(id?: string): IReporter {
    const errorLog = getErrorLog(id);

    const errors: string[] = [];
    errorLog.allErrors.push(errors);

    const result = (err: string): number => errors.push(err);

    result.hasErrors = () => errors.length > 0;

    result.end = (emitError: boolean): NodeJS.ReadWriteStream => {
        errors.length = 0;
        errorLog.onStart();

        return through(undefined, function () {
            errorLog.onEnd();

            if (emitError && errors.length > 0) {
                if (!(errors as any).__logged__) {
                    errorLog.log();
                }

                (errors as any).__logged__ = true;

                const err = new Error(`Found ${errors.length} errors`);
                (err as any).__reporter__ = true;
                // @ts-ignore `through` works with `this`
                this.emit("error", err);
            } else {
                // @ts-ignore `through` works with `this`
                this.emit("end");
            }
        });
    };

    return result;
}
