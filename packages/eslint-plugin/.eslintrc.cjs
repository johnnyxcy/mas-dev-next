"use strict";

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:eslint-plugin/recommended", "plugin:node/recommended"],
    env: {
        node: true,
    },
    overrides: [
        {
            files: ["lib/rules/*.js"],
            rules: {
                "eslint-plugin/prefer-message-ids": "off",
            },
        },
    ],
};
