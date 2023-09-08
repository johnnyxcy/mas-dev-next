/*
 * File: mas-dev/.prettierrc.cjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/07/2023 05:34 pm
 *
 * Last Modified: 09/08/2023 09:58 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
// Documentation for this file: https://prettier.io/docs/en/configuration.html
// Documentation for options: https://prettier.io/docs/en/options.html

/**
 * @type {import("prettier").Config}
 */
const config = {
    // We use a larger print width because Prettier's word-wrapping seems to be tuned
    // for plain JavaScript without type annotations
    printWidth: 119,

    // Print semicolons at the ends of statements.
    semi: true,

    // Change when properties in objects are quoted.
    // If at least one property in an object requires quotes, quote all properties.
    quoteProps: "consistent",

    // Use .gitattributes to manage newlines
    endOfLine: "auto",

    // Use single quotes instead of double quotes
    singleQuote: false,

    // Use single quotes instead of double quotes in JSX.
    jsxSingleQuote: false,

    // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
    // to use them for arrays only
    trailingComma: "all",

    // Print spaces between brackets in object literals.
    bracketSpacing: true,

    // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular)
    // element at the end of the last line instead of being alone
    // on the next line(does not apply to self closing elements)
    bracketSameLine: false,

    // Include parentheses around a sole arrow function parameter.
    arrowParens: "always",

    overrides: [
        {
            files: ["*.json", "*.json5", "*.jsonc"],
            options: {
                quoteProps: "preserve",
                trailingComma: "none",
            },
        },
    ],
};

module.exports = config;
