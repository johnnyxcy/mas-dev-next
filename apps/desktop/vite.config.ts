import { rmSync } from "node:fs";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import tsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    rmSync(".dist/", { recursive: true, force: true });

    const isServe = command === "serve";
    const isBuild = command === "build";
    const isVscodeDebug = !!process.env._VSCODE_DEBUG;
    const sourcemap = isServe || isVscodeDebug;

    return {
        plugins: [
            tsconfigPaths(),
            react(),
            electron([
                // #region Main Process
                {
                    vite: {
                        build: {
                            lib: {
                                // Main-Process entry file of the Electron App.
                                entry: "src/platform/main.ts",
                            },
                            sourcemap,
                            minify: isBuild,
                            outDir: ".dist/platform",
                            rollupOptions: {
                                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },

                    onstart(options) {
                        if (isVscodeDebug) {
                            if (!process.env._REMOTE_DEBUGGING_PORT) {
                                throw new Error(
                                    "Missing environment variable `_REMOTE_DEBUGGING_PORT` with vscode debugging.",
                                );
                            }
                            options.startup([`--remote-debugging-port=${process.env._REMOTE_DEBUGGING_PORT}`, "."]);
                            // console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App");
                        } else {
                            options.startup();
                        }
                    },
                },
                // #endregion

                // #region Preload Process
                {
                    vite: {
                        build: {
                            lib: {
                                // Preload entry file of the Electron App.
                                entry: "src/platform/preload.ts",
                            },
                            sourcemap: sourcemap ? "inline" : undefined, // #332
                            minify: isBuild,
                            outDir: ".dist/platform",
                            rollupOptions: {
                                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                    onstart(options) {
                        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                        // instead of restarting the entire Electron App.
                        options.reload();
                    },
                },
                // #endregion
            ]),

            // #region Renderer Process
            // Use Node.js API in the Renderer-process
            renderer(),
            // #endregion
        ],
        server: isVscodeDebug
            ? (() => {
                  //   const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
                  const url = new URL("http://127.0.0.1:7777");
                  return {
                      host: url.hostname,
                      port: +url.port,
                  };
              })()
            : undefined,
        clearScreen: false,
    };
});
