/*
 * File: @mas/eslint-config/base.eslint.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/07/2023 05:21 pm
 *
 * Last Modified: 09/08/2023 10:22 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
module.exports = {
    extends: [
        "airbnb-base",
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
        "import/core-modules": ["electron"],
        "import/internal-regex": "^@mas/",
    },
    reportUnusedDisableDirectives: true,
    rules: {
        /**
         * IMPORTANT eslint override
         */
        // #region
        "no-plusplus": "off",
        "no-bitwise": "off",
        "no-continue": "off",
        "no-cond-assign": "off",
        "no-inner-declarations": "off",
        "no-useless-escape": "off",
        "no-param-reassign": "off",
        "no-else-return": "off",
        "no-return-assign": "off",
        "no-underscore-dangle": "off",
        "no-constant-condition": "off",
        "no-restricted-syntax": "off",
        "no-nested-ternary": "off",
        "no-lonely-if": "off",
        "no-prototype-builtins": "off",
        "no-use-before-define": "off", // use @typescript-eslint/no-use-before-define instead
        "no-multi-assign": "off",
        "no-await-in-loop": "off",
        "no-template-curly-in-string": "off",
        "no-promise-executor-return": "off",
        "operator-assignment": "off",
        "func-names": "error",
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
        "unicorn/empty-brace-spaces": "error",
        "unicorn/filename-case": ["error", { case: "kebabCase" }],
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
        "unicorn/prefer-event-target": "error",
        "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-modern-dom-apis": "error",
        "unicorn/prefer-modern-math-apis": "error",
        "unicorn/prefer-native-coercion-functions": "error",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-number-properties": "error",
        "unicorn/prefer-object-from-entries": "error",
        "unicorn/prefer-regexp-test": "error",
        "unicorn/relative-url-style": "error",
        "unicorn/require-array-join-separator": "error",
        "unicorn/string-content": ["error", { patterns: {} }],
        "unicorn/throw-new-error": "error",
        "promise/always-return": "off",
        "promise/catch-or-return": ["error", { allowThen: true, allowFinally: true }],
        "@typescript-eslint/ban-types": ["error", { types: { "{}": false, "Function": false } }],
        "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
        "@typescript-eslint/dot-notation": "off",
        // using prettier
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
        "@typescript-eslint/comma-dangle": [
            "error",
            {
                arrays: "never",
                objects: "never",
                imports: "never",
                exports: "never",
                functions: "never",
            },
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/no-use-before-define": ["error", { typedefs: false, ignoreTypeReferences: true }],
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
        "@typescript-eslint/no-empty-interface": [
            "error",
            {
                allowSingleExtends: true,
            },
        ],
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        // no relative import
        "@typescript-eslint/no-restricted-imports": ["error", { patterns: ["\\./*", "\\.\\./*"] }],
        "@typescript-eslint/no-unused-vars": ["error", { destructuredArrayIgnorePattern: "^_", args: "none" }],
        // using type imports to resolve circular import error
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "no-type-imports" }],
        "@typescript-eslint/member-ordering": "error",
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
        "import/order": [
            "error",
            {
                "groups": ["builtin", "external", "internal", "type", "sibling", "parent", "index", "object"],
                "newlines-between": "always-and-inside-groups",
                "alphabetize": { order: "asc" },
            },
        ],
        "import/prefer-default-export": "off",
        "import/no-useless-path-segments": [
            "error",
            {
                noUselessIndex: true,
            },
        ],
        "import/no-relative-parent-imports": "off",
        "import/no-relative-packages": "off",
        "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
        "import/no-self-import": "error",
        "import/no-extraneous-dependencies": "off",
        // #endregion
    },
    overrides: [
        {
            files: ["*.ts", "*.js"],
            rules: {
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
            files: ["*.js", "*.jsx"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
        {
            files: ["**/__tests__/*.ts", "**/__tests__/**/*.ts", "**/__tests__/*.tsx", "**/__tests__/**/*.tsx"],
            rules: {
                "import/no-extraneous-dependencies": "off",
                "@typescript-eslint/naming-convention": "off",
            },
        },
    ],
};
