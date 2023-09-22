/*
 * File: @mas/tools/eslint/restricted-path.eslint.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/07/2023 05:22 pm
 *
 * Last Modified: 09/21/2023 08:07 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/**
 * This config is used to config eslint-import-plugin
 *
 * for example, you are not allowed to import "fs" in web browser
 *
 * See documentation on see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
 */
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    rules: {
        // "import/no-restricted-paths": [
        //     "error",
        //     {
        //         zones: []
        //     }
        // ]
    },
};
