"use strict";

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:eslint-plugin/recommended"],
    env: {
        node: true,
    },
    parser: "@typescript-eslint/parser",
    overrides: [
        {
            files: ["lib/rules/*.js"],
            rules: {
                "eslint-plugin/prefer-message-ids": "off",
            },
        },
    ],
};
