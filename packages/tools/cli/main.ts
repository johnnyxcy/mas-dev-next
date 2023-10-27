/*
 * File: @mas/tools/cli/main.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/27/2023 09:04 am
 *
 * Last Modified: 10/27/2023 10:18 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import yargs from "yargs";

import { extract } from "@mas/tools/localization/extractor";

async function main(): Promise<void> {
    yargs()
        .command<{
            root: string;
            output: string;
            merge: boolean;
            exclude?: string;
            logs?: string;
            files?: string[];
            quiet: boolean;
        }>({
            command: "nls-extract",
            describe: "Extract translation key/value pairs from source code",
            builder: {
                output: {
                    alias: "o",
                    describe: "Output file for the extracted translations",
                    demandOption: true,
                },
                root: {
                    alias: "r",
                    describe: "The directory which contains the source code",
                    default: ".",
                },
                merge: {
                    alias: "m",
                    describe: "Whether to merge new with existing translation values",
                    boolean: true,
                    default: false,
                },
                exclude: {
                    alias: "e",
                    describe: "Allows to exclude translation keys starting with this value",
                },
                files: {
                    alias: "f",
                    describe: "Glob pattern matching the files to extract from (starting from --root).",
                    array: true,
                },
                logs: {
                    alias: "l",
                    describe: "File path to a log file",
                },
                quiet: {
                    alias: "q",
                    describe: "Prevents errors from being logged to console",
                    boolean: true,
                    default: false,
                },
            },
            handler: async (options) => {
                await extract(options);
            },
        })
        .strict()
        .strictCommands()
        .demandCommand(1, "Please run a command")
        .fail((msg, err, cli) => {
            process.exitCode = 1;
            if (err) {
                // One of the handlers threw an error:
                console.error(err);
            } else {
                // Yargs detected a problem with commands and/or arguments while parsing:
                cli.showHelp();
                console.error(msg);
            }
        })
        .parse();
}

main();
