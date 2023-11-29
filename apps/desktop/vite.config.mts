import { rmSync } from "node:fs";
import path from "node:path";
import { UserConfig, defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import { electron, notBundle } from "@mas/vite-electron-plugin";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }): UserConfig => {
    rmSync(".dist/", { recursive: true, force: true });

    const isServe = command === "serve";
    const isBuild = command === "build";
    const isVscodeDebug = !!process.env._VSCODE_DEBUG;
    const sourcemap = isServe || isVscodeDebug;

    console.log(command);

    return {
        plugins: [
            tsconfigPaths(),
            electron([
                // #region Main Process
                {
                    // Main-Process entry file of the Electron App.
                    entry: "src/platform/main.ts",
                    vite: {
                        build: {
                            sourcemap,
                            minify: isBuild,
                            outDir: ".dist/platform",
                            rollupOptions: {
                                external: [...Object.keys(pkg.dependencies || {}), /@mas\/i18n(.+)?/, /^node:/],
                            },
                        },
                        plugins: [isServe && notBundle()],
                    },

                    onstart(options) {
                        if (isVscodeDebug) {
                            if (!process.env._REMOTE_DEBUGGING_PORT) {
                                throw new Error(
                                    "Missing environment variable `_REMOTE_DEBUGGING_PORT` with vscode debugging.",
                                );
                            }
                            options.startup([`--remote-debugging-port=${process.env._REMOTE_DEBUGGING_PORT}`, "."]);
                        } else {
                            options.startup();
                        }
                    },
                },
                // #endregion

                // #region Preload Process
                {
                    // Preload entry file of the Electron App.
                    entry: "src/platform/preload.ts",
                    vite: {
                        build: {
                            sourcemap: sourcemap ? "inline" : undefined, // #332
                            minify: isBuild,
                            outDir: ".dist/platform",
                            rollupOptions: {
                                external: [...Object.keys(pkg.dependencies || {}), /@mas\/i18n(.+)?/, /^node:/],
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
            react(),
        ],
        // #region Renderer Process
        build: {
            sourcemap,
            minify: isBuild,
            rollupOptions: {
                input: {
                    workbench: path.resolve(__dirname, "src/workbench/index.html"),
                    launcher: path.resolve(__dirname, "src/launcher/index.html"),
                },
                plugins: [
                    {
                        name: "bundle-html-rename",
                        generateBundle(options, bundle) {
                            function renameHtml(name: string): void {
                                const html = bundle[`src/${name}/index.html`];
                                if (html.type === "asset" && typeof html.source === "string") {
                                    html.fileName = `${name}.html`;
                                    html.source = html.source.replace(/\.\.\/\.\.\/chunks/g, "./chunks");
                                }
                            }
                            renameHtml("workbench");
                            renameHtml("launcher");
                        },
                    },
                ],
            },
            outDir: "./.dist/renderer",
            assetsDir: "chunks",
        },
        // #endregion
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
