/*
 * File: @mas/base/src/common/process.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:17 am
 *
 * Last Modified: 09/27/2023 01:36 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { globals, isMacintosh, isWindows, type INodeProcess } from "@mas/base/common/platform";

let safeProcess: Omit<INodeProcess, "arch"> & { arch: string | undefined };
declare const process: INodeProcess;

// Native sandbox environment
if (typeof globals.vscode !== "undefined" && typeof globals.vscode.process !== "undefined") {
    const sandboxProcess: INodeProcess = globals.vscode.process;
    safeProcess = {
        get platform() {
            return sandboxProcess.platform;
        },
        get arch() {
            return sandboxProcess.arch;
        },
        get env() {
            return sandboxProcess.env;
        },
        cwd() {
            return sandboxProcess.cwd();
        },
    };
}

// Native node.js environment
else if (typeof process !== "undefined") {
    safeProcess = {
        get platform() {
            return process.platform;
        },
        get arch() {
            return process.arch;
        },
        get env() {
            return process.env;
        },
        cwd() {
            return process.env["VSCODE_CWD"] || process.cwd();
        },
    };
}

// Web environment
else {
    safeProcess = {
        // Supported
        get platform() {
            return isWindows ? "win32" : isMacintosh ? "darwin" : "linux";
        },
        get arch() {
            return undefined; /* arch is undefined in web */
        },

        // Unsupported
        get env() {
            return {};
        },
        cwd() {
            return "/";
        },
    };
}

/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 *
 * @skipMangle
 */
export const cwd = safeProcess.cwd;

/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 */
export const env = safeProcess.env;

/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 */
export const platform = safeProcess.platform;

/**
 * Provides safe access to the `arch` method in node.js, sandboxed or web
 * environments.
 * Note: `arch` is `undefined` in web
 */
export const arch = safeProcess.arch;
