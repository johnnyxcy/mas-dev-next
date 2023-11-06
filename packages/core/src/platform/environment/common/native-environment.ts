/*
 * File: @mas/core/src/platform/environment/common/native-environment.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/06/2023 03:59 pm
 *
 * Last Modified: 11/06/2023 04:00 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { URI } from "@mas/base/common/uri";
import { NativeParsedArgs } from "@mas/core/platform/environment/common/argv";
import { IEnvironmentService } from "@mas/core/platform/environment/common/environment";

export const INativeEnvironmentService = Symbol("nativeEnvironmentService");

/**
 * A subclass of the `IEnvironmentService` to be used only in native
 * environments (Windows, Linux, macOS) but not e.g. web.
 */
export interface INativeEnvironmentService extends IEnvironmentService {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    // NOTE: KEEP THIS INTERFACE AS SMALL AS POSSIBLE.
    //
    // AS SUCH:
    //   - PUT WORKBENCH ONLY PROPERTIES INTO WORKBENCH ENVIRONMENT SERVICE
    //   - PUT ELECTRON-MAIN ONLY PROPERTIES INTO MAIN ENVIRONMENT SERVICE
    //
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // --- CLI Arguments
    args: NativeParsedArgs;

    // --- data paths
    /**
     * Root path of the JavaScript sources.
     *
     * Note: This is NOT the installation root
     * directory itself but contained in it at
     * a level that is platform dependent.
     */
    appRoot: string;
    userHome: URI;
    appSettingsHome: URI;
    tmpDir: URI;
    userDataPath: string;
    machineSettingsResource: URI;

    // --- extensions
    extensionsPath: string;
    extensionsDownloadLocation: URI;
    builtinExtensionsPath: string;

    // --- use in-memory Secret Storage
    useInMemorySecretStorage?: boolean;

    crossOriginIsolated?: boolean;

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //
    // NOTE: KEEP THIS INTERFACE AS SMALL AS POSSIBLE.
    //
    // AS SUCH:
    //   - PUT NON-WEB PROPERTIES INTO NATIVE ENVIRONMENT SERVICE
    //   - PUT WORKBENCH ONLY PROPERTIES INTO WORKBENCH ENVIRONMENT SERVICE
    //   - PUT ELECTRON-MAIN ONLY PROPERTIES INTO MAIN ENVIRONMENT SERVICE
    //
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
