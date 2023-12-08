/*
 * File: eslint-plugin-mas/tests/rules/check-nls.test.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/08/2023 09:28 am
 *
 * Last Modified: 12/08/2023 02:07 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
// @ts-check
import { RuleTester } from "eslint";

import rule from "../../lib/rules/check-nls";

const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("checkNlsRules:import", rule, {
    valid: [
        {
            code: [`import nls from "@mas/i18n";`, `nls.localize("some-key", "some-default");`].join("\n"),
        },
    ],
    invalid: [
        {
            code: [`import * as nls from "@mas/i18n";`, `nls.localize("some-key", "some-default");`].join("\n"),
            errors: [
                {
                    message: 'Incorrect import of "@mas/i18n". Always use `import nls from "@mas/i18n"`',
                    type: "ImportDeclaration",
                },
            ],
            output: [`import nls from "@mas/i18n";`, `nls.localize("some-key", "some-default");`].join("\n"),
        },
    ],
});

ruleTester.run("checkNlsRules:useDefault", rule, {
    valid: [
        {
            code: [`nls.localize("some-key", "some-default");`].join("\n"),
        },
        {
            code: [`nls.localizeByDefault("Copy");`].join("\n"),
        },
    ],
    invalid: [
        {
            code: [`nls.localize("copy", "Copy");`].join("\n"),
            errors: [
                {
                    type: "CallExpression",
                    message: '"Copy" can be translated using the "nls.localizeByDefault" function.',
                },
            ],
            output: [`nls.localizeByDefault("Copy");`].join("\n"),
        },
        {
            code: [`nls.localizeByDefault("Copy Values");`].join("\n"),
            errors: [
                {
                    type: "Literal",
                    message: /"Copy Values" is not a valid default value\. Did you mean "(.+)"?/,
                },
            ],
            output: [`nls.localizeByDefault("Copy Value");`].join("\n"),
        },
    ],
});
