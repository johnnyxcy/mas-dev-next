/*
 * File: @mas/tools/vite.config.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 10/27/2023 01:30 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import { rmSync } from "node:fs";
import path from "node:path";
import { UserConfig, defineConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";

export default defineConfig((): UserConfig => {
    rmSync(".dist/", { recursive: true, force: true });

    return {
        plugins: [tsconfigPaths()],
        build: {
            outDir: ".dist",
            lib: {
                entry: {
                    cli: path.resolve(__dirname, "src/cli/main.ts"),
                },
                formats: ["cjs"],
            },
            rollupOptions: {
                external: [...Object.keys(pkg.dependencies || {}), /^node:/],
            },
        },
        test: {
            /* for example, use global to avoid globals imports (describe, test, expect): */
            globals: true,
            coverage: {
                provider: "istanbul",
            },
        },
    };
});
