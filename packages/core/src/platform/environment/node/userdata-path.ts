/*
 * File: @mas/core/src/platform/environment/node/userdata-path.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/07/2023 05:38 pm
 *
 * Last Modified: 11/07/2023 05:43 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import os from "node:os";
import path from "node:path";

import { NativeParsedArgs } from "@mas/core/platform/environment/common/argv";

export function getUserDataPath(cliArgs: NativeParsedArgs, productName: string): string {
    const cwd = process.env["VSCODE_CWD"] || process.cwd();
    const userDataPath = doGetUserDataPath(cliArgs, productName);
    const pathsToResolve = [userDataPath];

    // If the user-data-path is not absolute, make
    // sure to resolve it against the passed in
    // current working directory. We cannot use the
    // node.js `path.resolve()` logic because it will
    // not pick up our `VSCODE_CWD` environment variable
    // (https://github.com/microsoft/vscode/issues/120269)
    if (!path.isAbsolute(userDataPath)) {
        pathsToResolve.unshift(cwd);
    }

    return path.resolve(...pathsToResolve);
}

function doGetUserDataPath(cliArgs: NativeParsedArgs, productName: string): string {
    // 0. Running out of sources has a fixed productName
    if (process.env["VSCODE_DEV"]) {
        productName = "code-oss-dev";
    }

    // 1. Support portable mode
    const portablePath = process.env["VSCODE_PORTABLE"];
    if (portablePath) {
        return path.join(portablePath, "user-data");
    }

    // 2. Support global VSCODE_APPDATA environment variable
    let appDataPath = process.env["VSCODE_APPDATA"];
    if (appDataPath) {
        return path.join(appDataPath, productName);
    }

    // With Electron>=13 --user-data-dir switch will be propagated to
    // all processes https://github.com/electron/electron/blob/1897b14af36a02e9aa7e4d814159303441548251/shell/browser/electron_browser_client.cc#L546-L553
    // Check VSCODE_PORTABLE and VSCODE_APPDATA before this case to get correct values.
    // 3. Support explicit --user-data-dir
    const cliPath = cliArgs["user-data-dir"];
    if (cliPath) {
        return cliPath;
    }

    // 4. Otherwise check per platform
    switch (process.platform) {
        case "win32":
            appDataPath = process.env["APPDATA"];
            if (!appDataPath) {
                const userProfile = process.env["USERPROFILE"];
                if (typeof userProfile !== "string") {
                    throw new Error("Windows: Unexpected undefined %USERPROFILE% environment variable");
                }

                appDataPath = path.join(userProfile, "AppData", "Roaming");
            }
            break;
        case "darwin":
            appDataPath = path.join(os.homedir(), "Library", "Application Support");
            break;
        case "linux":
            appDataPath = process.env["XDG_CONFIG_HOME"] || path.join(os.homedir(), ".config");
            break;
        default:
            throw new Error("Platform not supported");
    }

    return path.join(appDataPath, productName);
}
