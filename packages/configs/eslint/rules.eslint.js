/*
 * File: @mas/configs/eslint/rules.eslint.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 04:15 pm
 *
 * Last Modified: 10/27/2023 10:33 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    extends: [
        "airbnb-base",
        "airbnb-typescript",
        "airbnb-typescript/base",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:promise/recommended",

        require.resolve("./restricted-path.eslint"),
    ],
    plugins: ["unicorn", "prettier", "import", "@typescript-eslint"],
    parser: "@typescript-eslint/parser",

    settings: {
        "import/resolver": {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            typescript: {},
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/core-modules": ["electron", "vitest", "vite"],
        "import/internal-regex": "^@mas/",
    },
    reportUnusedDisableDirectives: true,
    rules: {
        // #region General
        "no-plusplus": "off",
        "no-bitwise": "off",
        "no-continue": "off",
        "no-cond-assign": "off",
        "no-inner-declarations": "off",
        "no-useless-escape": "off",
        "no-param-reassign": "off",
        "no-else-return": "off",
        "no-return-assign": "off",
        "no-empty": ["error", { allowEmptyCatch: true }],
        "no-undef-init": "off",
        "no-underscore-dangle": "off",
        "no-constant-condition": "off",
        "no-restricted-syntax": "off",
        "no-restricted-exports": "off",
        "no-nested-ternary": "off",
        "no-lonely-if": "off",
        "no-prototype-builtins": "off",
        "no-useless-return": "off",
        "no-use-before-define": "off", // use @typescript-eslint/no-use-before-define instead
        "no-multi-assign": "off",
        "no-await-in-loop": "off",
        "no-template-curly-in-string": "off",
        "no-promise-executor-return": "off",
        "operator-assignment": "off",
        "func-names": "off",
        "guard-for-in": "off",
        "quote-props": ["error", "consistent"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "max-classes-per-file": "off",
        "class-methods-use-this": "off",
        "consistent-return": "off",
        "prefer-destructuring": "off",
        "prefer-template": "off",
        "prefer-spread": "off",
        "prefer-const": ["error", { destructuring: "all", ignoreReadBeforeAssign: true }],
        "radix": ["error", "as-needed"],
        // #endregion

        // #region unicorn
        "unicorn/empty-brace-spaces": "error",
        "unicorn/filename-case": ["error", { case: "kebabCase", ignore: [/indexedDB/] }],
        "unicorn/import-style": "error",
        "unicorn/new-for-builtins": "error",
        "unicorn/no-abusive-eslint-disable": "error",
        "unicorn/no-array-push-push": "error",
        "unicorn/no-document-cookie": "error",
        "unicorn/no-instanceof-array": "error",
        "unicorn/no-invalid-remove-event-listener": "error",
        "unicorn/no-new-buffer": "error",
        "unicorn/no-process-exit": "error",
        "unicorn/no-unreadable-array-destructuring": "error",
        "unicorn/no-unused-properties": "error",
        "unicorn/no-useless-length-check": "error",
        "unicorn/no-useless-promise-resolve-reject": "error",
        "unicorn/no-useless-spread": "error",
        "unicorn/no-zero-fractions": "error",
        "unicorn/prefer-add-event-listener": "error",
        "unicorn/prefer-array-find": "error",
        "unicorn/prefer-array-flat": "error",
        "unicorn/prefer-array-flat-map": "error",
        "unicorn/prefer-array-index-of": "error",
        "unicorn/prefer-array-some": "error",
        "unicorn/prefer-default-parameters": "error",
        "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-modern-dom-apis": "error",
        "unicorn/prefer-modern-math-apis": "error",
        "unicorn/prefer-native-coercion-functions": "error",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-number-properties": "error",
        "unicorn/prefer-object-from-entries": "error",
        "unicorn/prefer-regexp-test": "error",
        "unicorn/prefer-event-target": "off",
        "unicorn/relative-url-style": "error",
        "unicorn/require-array-join-separator": "off",
        "unicorn/string-content": ["error", { patterns: {} }],
        "unicorn/throw-new-error": "error",
        // #endregion

        // #region promise
        "promise/always-return": "off",
        "promise/catch-or-return": ["error", { allowThen: true, allowFinally: true }],
        // #endregion

        // #region @typescript-eslint
        "@typescript-eslint/ban-types": ["error", { types: { "{}": false, "Function": false, "Object": false } }],
        "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
        "@typescript-eslint/dot-notation": "off",
        // using prettier
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
                overrides: {
                    accessors: "no-public",
                    constructors: "no-public",
                    methods: "no-public",
                    properties: "no-public",
                    parameterProperties: "no-public",
                },
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
        "@typescript-eslint/no-empty-interface": [
            "error",
            {
                allowSingleExtends: true,
            },
        ],
        "@typescript-eslint/no-redeclare": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        // no relative import
        "@typescript-eslint/no-restricted-imports": ["error", { patterns: ["\\./*", "\\.\\./*"] }],
        "@typescript-eslint/no-unused-vars": ["error", { destructuredArrayIgnorePattern: "^_", args: "none" }],
        // using type imports to resolve circular import error
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: [
                    // Index signature
                    "signature",

                    // Fields
                    "static-field",
                    "abstract-field",
                    "instance-field",
                    // Static initialization
                    "static-initialization",

                    // Constructors
                    "constructor",

                    // Get/Set
                    ["static-get", "static-set"],
                    ["abstract-get", "abstract-set"],
                    ["instance-get", "instance-set"],

                    // Methods
                    "static-method",
                    "abstract-method",
                    "instance-method",
                ],
            },
        ],
        // #endregion

        // #region Import
        "import/order": [
            "error",
            {
                "groups": ["builtin", "external", "internal", "type", "sibling", "parent", "index", "object"],
                "pathGroups": [
                    {
                        pattern: "@mas/i18n",
                        group: "internal",
                        position: "before",
                    },
                ],
                "newlines-between": "always-and-inside-groups",
                "alphabetize": { order: "asc" },
            },
        ],
        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "import/no-useless-path-segments": [
            "error",
            {
                noUselessIndex: true,
            },
        ],
        "import/no-relative-parent-imports": "off",
        "import/no-relative-packages": "off",
        "import/no-unassigned-import": "off",
        "import/no-self-import": "error",
        "import/no-extraneous-dependencies": "off",
        "import/no-named-as-default": "off",
        // #endregion
    },
    overrides: [
        {
            files: ["*.ts"],
            rules: {
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "default",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "variable",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allowSingleOrDouble",
                        trailingUnderscore: "allowSingleOrDouble",
                    },
                    { selector: "objectLiteralProperty", format: null },
                    { selector: "objectLiteralMethod", format: null },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "enumMember",
                        format: ["PascalCase", "UPPER_CASE"],
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
                        modifiers: ["global", "const"],
                        format: null,
                    },
                    // Allow public static class property to name as whatever
                    {
                        selector: "classProperty",
                        modifiers: ["public", "static"],
                        format: null,
                    },
                ],
            },
        },
        {
            files: ["*.js"],
            rules: {
                "strict": "off",
                "func-names": "off",
                "@typescript-eslint/naming-convention": "off",
            },
        },
        {
            files: ["*.tsx"],
            extends: [
                "airbnb/hooks",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:react-redux/recommended",
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
                    version: "detect", // React version. "detect" automatically picks the version you have installed.
                },
            },
            rules: {
                "unicorn/no-useless-undefined": "off",
                // 保证所有字符串都通过了 i18next
                "i18next/no-literal-string": [
                    "warn",
                    {
                        mode: "jsx-text-only",
                        message: "字符需要符合 i18n 规范",
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
                // #region React
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
                // #endregion
            },
        },
        {
            files: ["**/tests/*.ts", "**/tests/**/*.ts", "**/tests/*.tsx", "**/tests/**/*.tsx"],
            rules: {
                "import/no-extraneous-dependencies": "off",
                "@typescript-eslint/naming-convention": "off",
                "@typescript-eslint/quotes": "off",
            },
        },
    ],
};
