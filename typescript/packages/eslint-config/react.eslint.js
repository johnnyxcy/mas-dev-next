/*
 * File: @mas/eslint-config/react.eslint.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/07/2023 05:21 pm
 *
 * Last Modified: 09/08/2023 10:16 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
module.exports = {
    extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-redux/recommended",
        "plugin:storybook/recommended",
        require.resolve("./base.eslint"),
    ],
    plugins: ["react", "react-hooks", "react-redux", "i18next"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            createClass: "createReactClass", // Regex for Component Factory to use,
            // default to "createReactClass"
            pragma: "React", // Pragma to use, default to "React"
            fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: "18.2", // React version. "detect" automatically picks the version you have installed.
        },
    },
    rules: {
        "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
        "react/no-typos": "error",
        "react/no-unstable-nested-components": "error",
        "react/no-unused-prop-types": "error",
        "react/react-in-jsx-scope": "error",
        "react/require-default-props": [
            "error",
            {
                forbidDefaultForRequired: true,
                classes: "defaultProps",
                functions: "defaultArguments",
            },
        ],
    },
    overrides: [
        {
            files: ["*.tsx"],
            rules: {
                "unicorn/no-useless-undefined": "off",
                "no-restricted-exports": "off",
                // 保证所有字符串都通过了 i18next
                "i18next/no-literal-string": [
                    "error",
                    {
                        mode: "jsx-text-only",
                        message: "字符需要符合 i18n 规范",
                    },
                ],
                "@typescript-eslint/explicit-function-return-type": [
                    "error",
                    {
                        allowExpressions: true,
                        allowTypedFunctionExpressions: true,
                        allowHigherOrderFunctions: true,
                        allowDirectConstAssertionInArrowFunctions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
                    },
                ],
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "default",
                        format: ["camelCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "variable",
                        format: ["camelCase", "UPPER_CASE", "PascalCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "typeProperty",
                        format: ["camelCase", "PascalCase"],
                    },
                    { selector: "objectLiteralProperty", format: null },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                        leadingUnderscore: "forbid",
                        trailingUnderscore: "forbid",
                    },
                    {
                        selector: "enumMember",
                        format: ["UPPER_CASE"],
                        leadingUnderscore: "forbid",
                        trailingUnderscore: "forbid",
                    },
                    // Sometimes you might want to allow destructured properties to retain their original name,
                    // even if it breaks your naming convention.
                    {
                        selector: "variable",
                        modifiers: ["destructured"],
                        format: null,
                    },
                    {
                        selector: "variable",
                        modifiers: ["global"],
                        format: null,
                    },
                ],
                "import/order": [
                    "error",
                    {
                        "groups": ["builtin", "external", "internal", "sibling", "parent", "index", "type", "object"],
                        "newlines-between": "always-and-inside-groups",
                        "alphabetize": { order: "asc" },
                        "pathGroups": [
                            {
                                pattern: "react",
                                group: "builtin",
                                position: "before",
                            },
                        ],
                        "pathGroupsExcludedImportTypes": ["react"],
                    },
                ],
            },
        },
        {
            // or whatever matches stories specified in .storybook/main.js
            files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
            rules: {
                "i18next/no-literal-string": "off",
                "import/no-extraneous-dependencies": "off",
                "no-console": "off",
            },
        },
        // {
        //     files: "*.mdx",
        //     extends: "plugin:mdx/recommended"
        // }
    ],
};
