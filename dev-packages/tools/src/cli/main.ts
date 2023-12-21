/*
 * File: @mas/tools/src/cli/main.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/27/2023 09:04 am
 *
 * Last Modified: 12/06/2023 11:05 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import yargs from "yargs";

import { extract } from "@mas/tools/localization/extractor";

async function main(): Promise<void> {
    yargs(process.argv.slice(2))
        .scriptName("mas-dev command line interface")
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
                    type: "string",
                    demandOption: true,
                },
                root: {
                    alias: "r",
                    describe: "The directory which contains the source code",
                    type: "string",
                    default: ".",
                },
                merge: {
                    alias: "m",
                    describe: "Whether to merge new with existing translation values",
                    type: "boolean",
                    default: false,
                },
                exclude: {
                    alias: "e",
                    describe: "Allows to exclude translation keys starting with this value",
                    type: "string",
                },
                files: {
                    alias: "f",
                    describe: "Glob pattern matching the files to extract from (starting from --root).",
                    type: "array",
                    default: ["**/src/**/*.{ts,tsx}"],
                },
                logs: {
                    alias: "l",
                    describe: "File path to a log file",
                    type: "string",
                },
                quiet: {
                    alias: "q",
                    describe: "Prevents errors from being logged to console",
                    type: "boolean",
                    default: false,
                },
            },
            handler: async (options) => {
                await extract(options);
            },
        })
        .demandCommand(1, "You need at least one command before moving on")
        .strictCommands()
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
        .help()
        .parse();
}

main();
