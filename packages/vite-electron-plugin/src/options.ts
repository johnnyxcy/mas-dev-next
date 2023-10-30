/*
 * File: @mas/tools/src/vite-electron-plugin/options.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 02:39 pm
 *
 * Last Modified: 10/30/2023 02:52 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import type { InlineConfig, LibraryOptions } from "vite";

export interface ElectronOptions {
    /**
     * Shortcut of `build.lib.entry`
     */
    entry?: LibraryOptions["entry"];
    vite?: InlineConfig;
    /**
     * Triggered when Vite is built every time -- `vite serve` command only.
     *
     * If this `onstart` is passed, Electron App will not start automatically.
     * However, you can start Electroo App via `startup` function.
     */
    onstart?: (args: {
        /**
         * Electron App startup function.
         * It will mount the Electron App child-process to `process.electronApp`.
         * @param argv default value `['.', '--no-sandbox']`
         */
        startup: (argv?: string[]) => Promise<void>;
        /** Reload Electron-Renderer */
        reload: () => void;
    }) => void | Promise<void>;
}
