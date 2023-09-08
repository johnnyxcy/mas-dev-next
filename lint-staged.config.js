/*
 * File: mas-dev/lint-staged.config.js
 *
 * Author: 许翀轶 <chongyi.xu@drugchina.net>
 *
 * File Created: 11/08/2022 10:01 am
 *
 * Last Modified: 09/08/2023 11:18 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2022 MaS Dev Team
 */

// @ts-check

const path = require("path");
const os = require("os");

/**
 * @type {string[]}
 */
const ignoreDirs = ["vendor/**/*", "static/**/*"];

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
        relativeToRepoRoot(files).map((f) => `poetry run python .scripts/qa.py --use eslint ${f} --quiet`),
    [`!({${ignorePattern}})*.{py,pyi}`]: (files) =>
        relativeToRepoRoot(files).flatMap((f) => [
            // `poetry run python ./common/scripts/qa.py --use autoflake ${f}`,
            // `poetry run python ./common/scripts/qa.py --use isort ${f}`,
            `poetry run python .scripts/qa.py --use black ${f} --fast`,
            `poetry run python .scripts/qa.py --use pyright ${f} --level error`,
        ]),
    [`!({${ignorePattern}})*.{md,json,jsonc,json5}`]: (files) =>
        relativeToRepoRoot(files).map((f) => `yarn prettier --check ${f}`),
};
