/*
 * File: vite-electron-plugin/src/plugin.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 03:04 pm
 *
 * Last Modified: 10/30/2023 03:16 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import vite from "vite";

import { ElectronOptions } from "@mas/vite-electron-plugin/options";
import { resolveViteConfigWithOptions } from "@mas/vite-electron-plugin/resolve-config";
import { resolveBuiltinAsExternal } from "@mas/vite-electron-plugin/resolve-external";
import { resolveServerUrl } from "@mas/vite-electron-plugin/server";

export function build(options: ElectronOptions) {
    return vite.build(resolveBuiltinAsExternal(resolveViteConfigWithOptions(options)));
}

export default function electron(options: ElectronOptions | ElectronOptions[]): vite.Plugin[] {
    const optionsArray = Array.isArray(options) ? options : [options];
    let mode: string;

    return [
        {
            name: "vite-plugin-electron",
            apply: "serve",
            configureServer(server) {
                server.httpServer?.once("listening", () => {
                    Object.assign(process.env, {
                        VITE_DEV_SERVER_URL: resolveServerUrl(server),
                    });
                    for (const options of optionsArray) {
                        options.vite ??= {};
                        options.vite.mode ??= server.config.mode;
                        options.vite.build ??= {};
                        options.vite.build.watch ??= {};
                        options.vite.build.minify ??= false;
                        options.vite.plugins ??= [];
                        options.vite.plugins.push({
                            name: ":startup",
                            closeBundle() {
                                if (options.onstart) {
                                    options.onstart.call(this, {
                                        startup,
                                        reload() {
                                            server.ws.send({ type: "full-reload" });
                                        },
                                    });
                                } else {
                                    startup();
                                }
                            },
                        });
                        build(options);
                    }
                });
            },
        },
        {
            name: "vite-plugin-electron",
            apply: "build",
            config(config, env) {
                // Make sure that Electron can be loaded into the local file using `loadFile` after packaging.
                config.base ??= "./";
                mode = env.mode;
            },
            async closeBundle() {
                for (const options of optionsArray) {
                    options.vite ??= {};
                    options.vite.mode ??= mode;
                    await build(options);
                }
            },
        },
    ];
}

/**
 * Electron App startup function.
 * It will mount the Electron App child-process to `process.electronApp`.
 * @param argv default value `['.', '--no-sandbox']`
 */
export async function startup(argv = [".", "--no-sandbox"]) {
    const { spawn } = await import("node:child_process");
    const electron = await import("electron");
    const electronPath = electron.default ?? electron;

    startup.exit();
    // Start Electron.app
    // @ts-ignore should work
    process.electronApp = spawn(electronPath, argv, { stdio: "inherit" });
    // Exit command after Electron.app exits
    process.electronApp.once("exit", process.exit);

    if (!startup.hookProcessExit) {
        startup.hookProcessExit = true;
        process.once("exit", startup.exit);
    }
}
startup.hookProcessExit = false;
startup.exit = () => {
    if (process.electronApp) {
        process.electronApp.removeAllListeners();
        process.electronApp.kill();
    }
};
