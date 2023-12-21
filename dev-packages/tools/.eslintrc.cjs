/*
 * File: @mas/tools/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 11/29/2023 04:52 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    extends: [require.resolve("@mas/configs/eslint/rules.eslint")],
    parserOptions: {
        project: require.resolve("./tsconfig.eslint.json"),
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [".eslintrc.cjs", "node_modules", "bin"],
    overrides: [
        {
            files: ["src/**/*.ts"],
            rules: {
                "no-console": "off",
                "@typescript-eslint/no-restricted-imports": "off",
                "@typescript-eslint/no-shadow": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
        {
            files: ["*.config.mts"],
            rules: {
                "@typescript-eslint/no-restricted-imports": "off",
            },
        },
    ],
};
