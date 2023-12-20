/*
 * File: @mas/components/vite.config.mts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 11/30/2023 04:07 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import { defineConfig } from "vite";

import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
    return {
        plugins: [
            tsconfigPaths(),
            {
                ...dts({
                    outDir: ".dist/types",
                    exclude: ["**/tests"],
                    include: ["src"],
                }),
                apply: "build",
            },
            libInjectCss(),
        ],
        build: {
            outDir: ".dist/lib",
            lib: {
                entry: {
                    components: "./src/index.tsx",
                },
                formats: ["es" as const],
                fileName: (_, entryName) => `${entryName}.js`,
            },
            chunkSizeWarningLimit: 1000,
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
