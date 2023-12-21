/*
 * File: @mas/configs/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 10/27/2023 04:23 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    extends: [require.resolve("./eslint/rules.eslint")],
    parserOptions: {
        project: require.resolve("./tsconfig.eslint.json"),
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [".eslintrc.cjs", "node_modules"],
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "no-restricted-imports": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ],
};
