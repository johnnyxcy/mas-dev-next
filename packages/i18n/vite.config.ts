/*
 * File: @mas/i18n/vite.config.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 10/13/2023 01:27 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vite";

import glob from "glob";

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
            }),
            apply: "build",
        },
    ],
    build: {
        outDir: ".dist/lib",
        lib: {
            entry: glob.sync(path.resolve(__dirname, "src/**/*.ts")),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["fs-extra", "inversify", /@mas\/contribution(.+)?/],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
                entryFileNames: ({ name: fileName }) => {
                    return `${fileName}.js`;
                },
            },
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
