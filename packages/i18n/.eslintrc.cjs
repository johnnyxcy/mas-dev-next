/*
 * File: @mas/i18n/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 10/27/2023 10:43 am
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
    ignorePatterns: [".eslintrc.js", "node_modules"],
    overrides: [
        {
            files: [".scripts/*", "*.config.ts"],
            rules: {
                "global-require": "off",
                "no-console": "off",
                "@typescript-eslint/no-shadow": "off",
                "import/no-unassigned-import": "off",
                "import/no-relative-parent-imports": "off",
                "import/no-relative-packages": "off",
                "import/no-dynamic-require": "off",
                "unicorn/no-process-exit": "off",
                "@typescript-eslint/no-restricted-imports": "off",
            },
        },
    ],
};
