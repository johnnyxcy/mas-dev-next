/*
 * File: @mas/tools/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 10/27/2023 01:33 pm
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
            files: ["*.config.ts"],
            rules: {
                "@typescript-eslint/no-restricted-imports": "off",
            },
        },
    ],
};
