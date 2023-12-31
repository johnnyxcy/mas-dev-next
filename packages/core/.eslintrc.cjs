/*
 * File: @mas/core/.eslintrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 03:13 pm
 *
 * Last Modified: 11/29/2023 04:54 pm
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
    ignorePatterns: [".eslintrc.cjs", "node_modules", "lib", "tests/**/fixtures"],
    overrides: [
        {
            files: [".scripts/*", "*.config.mts"],
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
            files: ["src/**/*.ts", "tests/**/*.ts"],
            rules: {
                "no-void": "off",
                "no-fallthrough": "off",
                "no-new-object": "off",
                "no-console": "off",
                "no-useless-return": "off",
                "no-control-regex": "off",
                "no-ex-assign": "off",
                "default-case": "off",
                "one-var": "off",
                "prefer-rest-params": "off",
                "prefer-promise-reject-errors": "off",
                "func-names": "off",
                "promise/catch-or-return": "off",
                "promise/param-names": "off",
                "promise/no-nesting": "off",
                "promise/no-return-wrap": "off",
                "promise/no-promise-in-callback": "off",
                "import/no-mutable-exports": "off",
                "unicorn/prefer-default-parameters": "off",
                "unicorn/no-array-push-push": "off",
                "unicorn/no-useless-promise-resolve-reject": "off",
                "@typescript-eslint/member-ordering": "off",
                "@typescript-eslint/no-shadow": "off",
                "@typescript-eslint/no-loop-func": "off",
                "@typescript-eslint/no-throw-literal": "off",
                "@typescript-eslint/naming-convention": "off",
                "@typescript-eslint/consistent-type-imports": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
    ],
};
