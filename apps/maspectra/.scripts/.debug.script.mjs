/*
 * File: @mas/maspectra/.scripts/.debug.script.mjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/08/2023 10:42 am
 *
 * Last Modified: 09/08/2023 10:47 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

// @ts-check

import { spawn } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkg = createRequire(import.meta.url)("../package.json");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// write .debug.env
const envContent = Object.entries(pkg.debug.env).map(([key, val]) => `${key}=${val}`);
fs.writeFileSync(path.join(__dirname, ".debug.env"), envContent.join("\n"));

// bootstrap
spawn(
    // TODO: terminate `npm run dev` when Debug exits.
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "dev"],
    {
        stdio: "inherit",
        env: Object.assign(process.env, { VSCODE_DEBUG: "true" }),
    },
);
