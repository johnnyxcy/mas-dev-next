/*
 * File: @mas/vite-electron-plugin/vite.config.mts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 11/29/2023 04:51 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
    rmSync(".dist/", { recursive: true, force: true });

    return {
        plugins: [tsconfigPaths(), dts({ outDir: ".dist/types" })],
        build: {
            outDir: ".dist/lib",
            lib: {
                entry: path.resolve(__dirname, "src/index.ts"),
                formats: ["cjs" as const],
            },
            rollupOptions: {
                external: ["vite", "electron", /^node:/],
            },
        },
        test: {
            /* for example, use global to avoid globals imports (describe, test, expect): */
            globals: true,
            coverage: {
                provider: "istanbul" as const,
            },
        },
    };
});
