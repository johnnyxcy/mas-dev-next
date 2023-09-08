import { rmSync } from "node:fs";

import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ command }): UserConfig => {
    rmSync(".dist", { recursive: true, force: true });

    const isServe = command === "serve";
    const isBuild = command === "build";
    const withSourcemap = isServe || !!process.env.VSCODE_DEBUG;

    return {
        plugins: [
            react(),
            electron([
                {
                    // Main-Process entry file of the Electron App.
                    entry: "platform/main.ts",
                    onstart(options) {
                        if (process.env.VSCODE_DEBUG) {
                            console.info(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App");
                        } else {
                            options.startup();
                        }
                    },
                    vite: {
                        build: {
                            sourcemap: withSourcemap,
                            minify: isBuild,
                            outDir: ".dist/main",
                            rollupOptions: {
                                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
                {
                    entry: "platform/preload.ts",
                    onstart(options) {
                        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                        // instead of restarting the entire Electron App.
                        options.reload();
                    },
                    vite: {
                        build: {
                            sourcemap: withSourcemap ? "inline" : undefined, // #332
                            minify: isBuild,
                            outDir: ".dist/preload",
                            rollupOptions: {
                                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
            ]),
            // Use Node.js API in the Renderer-process
            renderer(),
        ],
        server: process.env.VSCODE_DEBUG
            ? (() => {
                  const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
                  return {
                      host: url.hostname,
                      port: +url.port,
                  };
              })()
            : undefined,
        clearScreen: false,
    };
});
