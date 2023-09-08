/*
 * File: @mas/maspectra/.eslintrc.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/08/2023 10:17 am
 *
 * Last Modified: 09/08/2023 10:25 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
    extends: [require.resolve("@mas/eslint-config/react.eslint")],
    parserOptions: {
        project: require.resolve("./tsconfig.eslint.json"),
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [".eslintrc.js", "static", "node_modules"],
    overrides: [
        {
            files: ["scripts/*"],
            rules: {
                "global-require": "off",
                "no-console": "off",
                "import/no-unassigned-import": "off",
                "import/no-relative-parent-imports": "off",
                "import/no-relative-packages": "off",
                "import/no-dynamic-require": "off",
                "unicorn/no-process-exit": "off",
                "@typescript-eslint/no-restricted-imports": "off",
            },
        },
        {
            files: ["*.config.ts"],
            rules: {
                "global-require": "off",
                "no-console": "off",
                "import/no-dynamic-require": "off",
                "@typescript-eslint/no-restricted-imports": "off",
            },
        },
    ],
};

module.exports = config;
