/*
 * File: @mas/i18n/vite.config.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 09/26/2023 01:45 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import { resolve } from "node:path";

import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        {
            ...dts({
                outDir: ".dist/types",
                exclude: ["**/tests"],
                include: ["src"],
                insertTypesEntry: true,
            }),
            apply: "build",
        },
    ],
    build: {
        outDir: ".dist/lib",
        lib: {
            entry: {
                nls: resolve(__dirname, "src/nls.ts"),
                common: resolve(__dirname, "src/common/index.ts"),
                node: resolve(__dirname, "src/node/index.ts"),
            },
            formats: ["es"],
        },
        chunkSizeWarningLimit: 1000,
    },
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        globals: true,
        coverage: {
            provider: "istanbul",
        },
    },
});
