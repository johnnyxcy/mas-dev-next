/*
 * File: eslint-plugin-mas/vite.config.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/08/2023 09:29 am
 *
 * Last Modified: 12/08/2023 11:02 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/// <reference types="vitest" />

const { defineConfig } = require("vite");

module.exports = defineConfig({
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        globals: true,
        setupFiles: ["./tests/vitest.setup.js"],
        coverage: {
            provider: "istanbul",
        },
    },
});
