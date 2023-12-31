/*
 * File: mas-dev/lint-staged.config.js
 *
 * Author: 许翀轶 <chongyi.xu@drugchina.net>
 *
 * File Created: 11/08/2022 10:01 am
 *
 * Last Modified: 11/02/2023 09:58 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

// @ts-check

const path = require("path");

/**
 * @type {string[]}
 */
const ignoreDirs = [
    "vendor/**/*", // vendor
    "static/**/*", // static resource
];

/**
 * @type {string}
 */
const ignorePattern = ignoreDirs.join(",");

/**
 *
 * @param {string[]} files
 * @returns {string[]}
 */
const relativeToRepoRoot = (files) => files.map((f) => path.relative(__dirname, f));

/**
 * @type {import("lint-staged").Config}
 */
module.exports = {
    [`!({${ignorePattern}})*.{js,jsx,ts,tsx}`]: (files) =>
        relativeToRepoRoot(files).map((f) => `python .scripts/qa.py --use eslint ${f} --quiet`),
    [`!({${ignorePattern}})*.{py,pyi}`]: (files) =>
        relativeToRepoRoot(files).flatMap((f) => [
            // `poetry run python ./common/scripts/qa.py --use autoflake ${f}`,
            // `poetry run python ./common/scripts/qa.py --use isort ${f}`,
            `python .scripts/qa.py --use black ${f} --fast`,
            `python .scripts/qa.py --use pyright ${f} --level error`,
        ]),
    [`!({${ignorePattern}})*.{md,json,jsonc,json5}`]: (files) =>
        relativeToRepoRoot(files).map((f) => `yarn prettier --check ${f}`),
};
