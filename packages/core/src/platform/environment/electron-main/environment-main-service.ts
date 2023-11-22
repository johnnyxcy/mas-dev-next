/*
 * File: @mas/core/src/platform/environment/electron-main/environment-main-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/07/2023 03:02 pm
 *
 * Last Modified: 11/09/2023 04:03 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { memoize } from "@mas/base/common/decorators";
import { join } from "@mas/base/common/path";
import { isLinux } from "@mas/base/common/platform";
import { createStaticIPCHandle } from "@mas/core/parts/ipc/node/ipc.net";
import { INativeEnvironmentService } from "@mas/core/platform/environment/common/native-environment";

import { NativeEnvironmentService } from "@mas/core/platform/environment/node/environment-service";

/**
 * A subclass of the `INativeEnvironmentService` to be used only in electron-main
 * environments.
 */
export interface IEnvironmentMainService extends INativeEnvironmentService {
    // --- NLS cache path
    readonly cachedLanguagesPath: string;

    // --- backup paths
    readonly backupHome: string;

    // --- V8 code caching
    readonly codeCachePath: string | undefined;
    readonly useCodeCache: boolean;

    // --- IPC
    readonly mainIPCHandle: string;
    readonly mainLockfile: string;

    // --- config
    readonly disableUpdates: boolean;

    unsetSnapExportedVariables(): void;
    restoreSnapExportedVariables(): void;
}

export class EnvironmentMainService extends NativeEnvironmentService implements IEnvironmentMainService {
    private _snapEnv: Record<string, string> = {};

    @memoize
    get cachedLanguagesPath(): string {
        return join(this.userDataPath, "clp");
    }

    @memoize
    get backupHome(): string {
        return join(this.userDataPath, "Backups");
    }

    @memoize
    get mainIPCHandle(): string {
        return createStaticIPCHandle(this.userDataPath, "main", this.productService.version);
    }

    @memoize
    get mainLockfile(): string {
        return join(this.userDataPath, "code.lock");
    }

    @memoize
    get disableUpdates(): boolean {
        return !!this.args["disable-updates"];
    }

    @memoize
    get crossOriginIsolated(): boolean {
        return !!this.args["enable-coi"];
    }

    @memoize
    get codeCachePath(): string | undefined {
        return process.env["VSCODE_CODE_CACHE_PATH"] || undefined;
    }

    @memoize
    get useCodeCache(): boolean {
        return !!this.codeCachePath;
    }

    unsetSnapExportedVariables() {
        if (!isLinux) {
            return;
        }
        for (const key in process.env) {
            if (key.endsWith("_VSCODE_SNAP_ORIG")) {
                const originalKey = key.slice(0, -17); // Remove the _VSCODE_SNAP_ORIG suffix
                if (this._snapEnv[originalKey]) {
                    continue;
                }
                // Preserve the original value in case the snap env is re-entered
                if (process.env[originalKey]) {
                    this._snapEnv[originalKey] = process.env[originalKey]!;
                }
                // Copy the original value from before entering the snap env if available,
                // if not delete the env variable.
                if (process.env[key]) {
                    process.env[originalKey] = process.env[key];
                } else {
                    delete process.env[originalKey];
                }
            }
        }
    }

    restoreSnapExportedVariables() {
        if (!isLinux) {
            return;
        }
        for (const key in this._snapEnv) {
            process.env[key] = this._snapEnv[key];
            delete this._snapEnv[key];
        }
    }
}
