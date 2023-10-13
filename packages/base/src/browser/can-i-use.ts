/*
 * File: @mas/base/src/browser/can-i-use.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 01:37 pm
 *
 * Last Modified: 10/12/2023 01:38 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as browser from "@mas/base/browser/browser";
import * as platform from "@mas/base/common/platform";

export const enum KeyboardSupport {
    Always,
    FullScreen,
    None,
}

/**
 * Browser feature we can support in current platform, browser and environment.
 */
export const BrowserFeatures = {
    clipboard: {
        writeText:
            platform.isNative ||
            (document.queryCommandSupported && document.queryCommandSupported("copy")) ||
            !!(navigator && navigator.clipboard && navigator.clipboard.writeText),
        readText: platform.isNative || !!(navigator && navigator.clipboard && navigator.clipboard.readText),
    },
    keyboard: (() => {
        if (platform.isNative || browser.isStandalone()) {
            return KeyboardSupport.Always;
        }

        if ((<any>navigator).keyboard || browser.isSafari) {
            return KeyboardSupport.FullScreen;
        }

        return KeyboardSupport.None;
    })(),

    // 'ontouchstart' in window always evaluates to true with typescript's modern typings. This causes `window` to be
    // `never` later in `window.navigator`. That's why we need the explicit `window as Window` cast
    touch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    pointerEvents:
        window.PointerEvent &&
        ("ontouchstart" in window || (window as Window).navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0),
};
