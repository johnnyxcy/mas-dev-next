/*
 * File: @mas/ui/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 12/29/2023 05:47 pm
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
    ignorePatterns: [".eslintrc.cjs", "node_modules", "lib"],
    rules: {
        "@typescript-eslint/no-restricted-imports": "off",
        "i18next/no-literal-string": "off",
        "unicorn/filename-case": "off",
    },
    overrides: [
        {
            files: ["*.tsx"],
            rules: {
                "react/react-in-jsx-scope": "off",
            },
        },
    ],
};
