/*
 * File: @mas/ui/vite.config.mts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 12/29/2023 01:19 pm
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

import pkg from "./package.json";

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
        esbuild: {
            jsxFactory: "createElement",
            jsxInject: 'import { createElement } from "@fluentui/react-jsx-runtime"',
        },
        build: {
            outDir: ".dist/lib",
            lib: {
                entry: {
                    components: "./src/index.tsx",
                },
                formats: ["es" as const],
                fileName: (_, entryName) => `${entryName}.js`,
            },

            rollupOptions: {
                external: [...Object.keys(pkg.dependencies || {}), /@mas\/base(.+)?/, /@mas\/i18n(.+)?/, /^node:/],
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
