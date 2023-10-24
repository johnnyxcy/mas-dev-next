/*
 * File: @mas/core/src/parts/sandbox/electron-sandbox/preload.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/24/2023 04:50 pm
 *
 * Last Modified: 10/24/2023 04:56 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { IpcRendererEvent, contextBridge, ipcRenderer, webFrame } from "electron";

import { ISandboxConfiguration } from "@mas/core/parts/sandbox/common/sandbox-types";
import { IpcRenderer, ProcessMemoryInfo, WebFrame } from "@mas/core/parts/sandbox/electron-sandbox/electron-types";
import {
    ISandboxContext,
    ISandboxNodeProcess,
    IpcMessagePort,
} from "@mas/core/parts/sandbox/electron-sandbox/globals";

// #region Utilities
/**
 *
 * @param channel the IPC channel to validate
 * @returns true if the channel is valid, otherwise throws an error
 */
function validateIPC(channel: string): true | never {
    if (!channel || !channel.startsWith("mas:")) {
        throw new Error(`Unsupported event IPC channel '${channel}'`);
    }

    return true;
}

/**
 *
 * @param key the name of the process argument to parse
 * @returns argument value or undefined if not found
 */
function parseArgv(key: string): string | undefined {
    for (const arg of process.argv) {
        if (arg.indexOf(`--${key}=`) === 0) {
            return arg.split("=")[1];
        }
    }

    return undefined;
}

// #endregion

// #region Preload Entry ``exposeInMainWorld``
export function exposeInMainWorld(): void {
    // #region Resolve Configuration
    let configuration: ISandboxConfiguration | undefined;
    const resolveConfiguration = (async (): Promise<ISandboxConfiguration> => {
        const windowConfigIpcChannel = parseArgv("mas-window-config");
        if (!windowConfigIpcChannel) {
            throw new Error("Preload: did not find expected mas-window-config in renderer process arguments list");
        }

        try {
            validateIPC(windowConfigIpcChannel);
            // Resolve configuration from electron-main
            configuration = (await ipcRenderer.invoke(windowConfigIpcChannel)) as ISandboxConfiguration;

            // Apply `userEnv` directly
            Object.assign(process.env, configuration.userEnv);

            webFrame.setZoomLevel(configuration.zoomLevel ?? 0);

            return configuration;
        } catch (error) {
            throw new Error(`Preload: unable to fetch mas-window-config (${windowConfigIpcChannel}): ${error}`);
        }
    })();

    // #endregion

    // #region Resolve Shell Environment
    /**
     * If VSCode is not run from a terminal, we should resolve additional
     * shell specific environment from the OS shell to ensure we are seeing
     * all development related environment variables. We do this from the
     * main process because it may involve spawning a shell.
     *
     */
    const resolveShellEnv = (async (): Promise<typeof process.env> => {
        // Resolve `userEnv` from configuration and
        // `shellEnv` from the main side
        const [userEnv, shellEnv] = await Promise.all([
            (async () => (await resolveConfiguration).userEnv)(),
            ipcRenderer.invoke("mas:fetchShellEnv"),
        ]);

        return { ...process.env, ...shellEnv, ...userEnv };
    })();

    // #endregion

    // #region Globals Definition

    // #######################################################################
    // ###                                                                 ###
    // ###       !!! DO NOT USE GET/SET PROPERTIES ANYWHERE HERE !!!       ###
    // ###       !!!  UNLESS THE ACCESS IS WITHOUT SIDE EFFECTS  !!!       ###
    // ###       (https://github.com/electron/electron/issues/25516)       ###
    // ###                                                                 ###
    // #######################################################################
    type ISandboxGlobals = {
        ipcRenderer: IpcRenderer;
        ipcMessagePort: IpcMessagePort;
        webFrame: WebFrame;
        process: ISandboxNodeProcess;
        context: ISandboxContext;
    };

    const globals: ISandboxGlobals = {
        ipcRenderer: {
            /**
             * Resolves with the response from the main process.
             *
             * Send a message to the main process via `channel` and expect a result
             * asynchronously. Arguments will be serialized with the Structured Clone
             * Algorithm, just like `window.postMessage`, so prototype chains will not be
             * included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw
             * an exception.
             *
             * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
             * Electron objects will throw an exception.
             *
             * Since the main process does not have support for DOM objects such as
             * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
             * Electron's IPC to the main process, as the main process would have no way to
             * decode them. Attempting to send such objects over IPC will result in an error.
             *
             * The main process should listen for `channel` with `ipcMain.handle()`.
             *
             * For example:
             *
             * If you need to transfer a `MessagePort` to the main process, use
             * `ipcRenderer.postMessage`.
             *
             * If you do not need a response to the message, consider using `ipcRenderer.send`.
             */
            invoke(channel: string, ...args: any[]): Promise<any> {
                validateIPC(channel);
                return ipcRenderer.invoke(channel, ...args);
            },

            /**
             * Listens to `channel`, when a new message arrives `listener` would be called with
             * `listener(event, args...)`.
             */
            on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): IpcRenderer {
                validateIPC(channel);
                return ipcRenderer.on(channel, listener);
            },

            /**
             * Adds a one time `listener` function for the event. This `listener` is invoked
             * only the next time a message is sent to `channel`, after which it is removed.
             */
            once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): IpcRenderer {
                validateIPC(channel);

                return ipcRenderer.once(channel, listener);
            },

            /**
             * Removes all listeners, or those of the specified `channel`.
             */
            removeAllListeners(channel: string): IpcRenderer {
                validateIPC(channel);
                return ipcRenderer.removeAllListeners(channel);
            },

            /**
             * Removes the specified `listener` from the listener array for the specified
             * `channel`.
             */
            removeListener(channel: string, listener: (...args: any[]) => void): IpcRenderer {
                validateIPC(channel);
                return ipcRenderer.removeListener(channel, listener);
            },

            /**
             * Send an asynchronous message to the main process via `channel`, along with
             * arguments. Arguments will be serialized with the Structured Clone Algorithm,
             * just like `window.postMessage`, so prototype chains will not be included.
             * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
             * exception.
             *
             * > **NOTE:** Sending non-standard JavaScript types such as DOM objects or special
             * Electron objects will throw an exception.
             *
             * Since the main process does not have support for DOM objects such as
             * `ImageBitmap`, `File`, `DOMMatrix` and so on, such objects cannot be sent over
             * Electron's IPC to the main process, as the main process would have no way to
             * decode them. Attempting to send such objects over IPC will result in an error.
             *
             * The main process handles it by listening for `channel` with the `ipcMain`
             * module.
             *
             * If you need to transfer a `MessagePort` to the main process, use
             * `ipcRenderer.postMessage`.
             *
             * If you want to receive a single response from the main process, like the result
             * of a method call, consider using `ipcRenderer.invoke`.
             */
            send(channel: string, ...args: any[]): void {
                validateIPC(channel);
                return ipcRenderer.send(channel, ...args);
            },
        },

        ipcMessagePort: {
            acquire(responseChannel: string, nonce: string) {
                if (validateIPC(responseChannel)) {
                    const responseListener = (e: IpcRendererEvent, responseNonce: string): void => {
                        // validate that the nonce from the response is the same
                        // as when requested. and if so, use `postMessage` to
                        // send the `MessagePort` safely over, even when context
                        // isolation is enabled
                        if (nonce === responseNonce) {
                            ipcRenderer.off(responseChannel, responseListener);
                            window.postMessage(nonce, "*", e.ports);
                        }
                    };

                    // handle reply from main
                    ipcRenderer.on(responseChannel, responseListener);
                }
            },
        },

        webFrame: {
            setZoomLevel(level: number) {
                if (typeof level === "number") {
                    webFrame.setZoomLevel(level);
                }
            },
        },

        process: {
            get platform() {
                return process.platform;
            },
            get arch() {
                return process.arch;
            },
            get env() {
                return { ...process.env };
            },
            get versions() {
                return process.versions;
            },
            get type() {
                return "renderer";
            },
            get execPath() {
                return process.execPath;
            },

            cwd(): string {
                return (
                    process.env["VSCODE_CWD"] ||
                    process.execPath.substr(0, process.execPath.lastIndexOf(process.platform === "win32" ? "\\" : "/"))
                );
            },

            shellEnv(): Promise<typeof process.env> {
                return resolveShellEnv;
            },

            getProcessMemoryInfo(): Promise<ProcessMemoryInfo> {
                return process.getProcessMemoryInfo();
            },

            on(type: string, callback: (...args: any[]) => void) {
                process.on(type, callback);
            },
        },

        context: {
            /**
             * A configuration object made accessible from the main side
             * to configure the sandbox browser window.
             *
             * Note: intentionally not using a getter here because the
             * actual value will be set after `resolveConfiguration`
             * has finished.
             *
             */
            configuration() {
                return configuration;
            },

            /**
             * Allows to await the resolution of the configuration object.
             *
             */
            async resolveConfiguration() {
                return resolveConfiguration;
            },
        },
    };

    // Use `contextBridge` APIs to expose globals to mas
    // only if context isolation is enabled, otherwise just
    // add to the DOM global.
    if (process.contextIsolated) {
        try {
            contextBridge.exposeInMainWorld("mas", globals);
        } catch (error) {
            console.error(error);
        }
    } else {
        // @ts-ignore: inject into window.globalThis
        window.mas = globals;
    }
    // #endregion
}

// #endregion
