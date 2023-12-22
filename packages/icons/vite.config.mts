/*
 * File: @mas/icons/vite.config.mts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 12/22/2023 03:20 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import { UserConfig, defineConfig } from "vite";

import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }): UserConfig => {
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
        assetsInclude: command !== "build" ? ["/sb-preview/runtime.js"] : undefined,
        build: {
            outDir: ".dist/lib",
            lib: {
                entry: {
                    "codicons": "./src/codicons/index.ts",
                    "fontawesome/index": "./src/fontawesome/index.ts",
                    "fontawesome/brands": "./src/fontawesome/brands.ts",
                    "fontawesome/regular": "./src/fontawesome/regular.ts",
                    "fontawesome/solid": "./src/fontawesome/solid.ts",
                    "fluent-system/filled": "./src/fluent-system/filled.ts",
                    "fluent-system/regular": "./src/fluent-system/regular.ts",
                    "material-symbols/index": "./src/material-symbols/index.ts",
                    "material-symbols/outlined": "./src/material-symbols/outlined.ts",
                    "material-symbols/rounded": "./src/material-symbols/rounded.ts",
                    "material-symbols/sharp": "./src/material-symbols/sharp.ts",
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
