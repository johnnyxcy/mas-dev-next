/*
 * File: @mas/base/tests/common/keybindings.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:11 pm
 *
 * Last Modified: 09/27/2023 05:12 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { assert, describe, test } from "vitest";

import { KeyCode, ScanCode } from "@mas/base/common/key-codes";
import { KeyCodeChord, ScanCodeChord } from "@mas/base/common/keybindings";

describe("keyCodes", () => {
    test("issue #173325: wrong interpretations of special keys (e.g. [Equal] is mistaken for V)", () => {
        const a = new KeyCodeChord(true, false, false, false, KeyCode.KeyV);
        const b = new ScanCodeChord(true, false, false, false, ScanCode.Equal);
        assert.strictEqual(a.getHashCode() === b.getHashCode(), false);
    });
});
