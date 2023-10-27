/*
 * File: @mas/tools/vite.config.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 10:11 am
 *
 * Last Modified: 10/27/2023 10:27 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: ".dist",
        lib: {
            entry: {
                cli: path.resolve(__dirname, "cli/main.ts"),
            },
        },
    },
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        globals: true,
        coverage: {
            provider: "istanbul",
        },
    },
});
