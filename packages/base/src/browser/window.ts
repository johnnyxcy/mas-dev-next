/*
 * File: @mas/base/src/browser/window.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 02:36 pm
 *
 * Last Modified: 11/30/2023 03:00 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type MaspectraWindow = Window &
    typeof globalThis & {
        readonly vscodeWindowId: number;
    };

export function ensureMaspectraWindow(
    targetWindow: Window,
    fallbackWindowId: number,
): asserts targetWindow is MaspectraWindow {
    const win = targetWindow as Partial<MaspectraWindow>;

    if (typeof win.vscodeWindowId !== "number") {
        Object.defineProperty(win, "vscodeWindowId", {
            get: () => fallbackWindowId,
        });
    }
}

export const mainWindow = window as MaspectraWindow;

/**
 * @deprecated to support multi-window scenarios, use `DOM.mainWindow`
 * if you target the main global window or use helpers such as `DOM.getWindow()`
 * or `DOM.getActiveWindow()` to obtain the correct window for the context you are in.
 */
export const $window = mainWindow;

export function isAuxiliaryWindow(obj: Window): obj is MaspectraWindow {
    if (obj === mainWindow) {
        return false;
    }

    const candidate = obj as MaspectraWindow | undefined;

    return typeof candidate?.vscodeWindowId === "number";
}
