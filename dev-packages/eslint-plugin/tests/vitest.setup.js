/*
 * File: eslint-plugin-mas/tests/vitest.setup.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/08/2023 10:59 am
 *
 * Last Modified: 12/08/2023 01:48 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

export default function setup() {
    RuleTester.afterAll = vitest.afterAll;

    // If you are not using vitest with globals: true (https://vitest.dev/config/#globals):
    RuleTester.it = vitest.it;
    RuleTester.itOnly = vitest.it.only;
    RuleTester.describe = vitest.describe;
}
