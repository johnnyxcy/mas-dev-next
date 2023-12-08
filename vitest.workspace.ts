/*
 * File: mas-dev/vitest.workspace.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 03:56 pm
 *
 * Last Modified: 12/08/2023 10:33 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    "apps/**/vite.config.mts",
    "packages/**/vite.config.{e2e,unit}.mts",
    "packages/**/vite.config.mts",
    "packages/**/vite.config.js",
]);
