/*
 * File: @mas/desktop/.scripts/debug.mjs
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/13/2023 04:03 pm
 *
 * Last Modified: 09/13/2023 05:18 pm
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.dirname(__dirname);
const pkg = createRequire(import.meta.url)("../package.json");

console.info("========================================");
console.info("Debugging @mas/desktop v%s", pkg.version);

// write .debug.env
const dotenvName = ".debug.env";
const dotenvFp = path.join(packageDir, dotenvName);
const envContent = Object.entries(pkg.debug.env).map(([key, val]) => `${key}=${val}`);
fs.writeFileSync(dotenvFp, envContent.join("\n"));

// bootstrap
spawn(
    // TODO: terminate `npm run dev` when Debug exits.
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "dev"],
    {
        stdio: "inherit",
        env: Object.assign(process.env, { VSCODE_DEBUG: "true" }),
        cwd: packageDir,
    },
).once("exit", (code) => {
    process.exit(code ?? undefined);
});

process.on("exit", () => {
    fs.rmSync(dotenvFp);
});
