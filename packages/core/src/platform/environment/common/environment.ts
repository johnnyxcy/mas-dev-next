/*
 * File: @mas/core/src/platform/environment/common/environment.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/06/2023 03:59 pm
 *
 * Last Modified: 11/06/2023 04:01 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from "@mas/base/common/uri";

export const IEnvironmentService = Symbol("environmentService");

export interface IDebugParams {
    port: number | null;
    break: boolean;
}

export interface IExtensionHostDebugParams extends IDebugParams {
    debugId?: string;
    env?: Record<string, string>;
}

/**
 * Type of extension.
 *
 * **NOTE**: This is defined in `platform/environment` because it can appear as a CLI argument.
 */
export type ExtensionKind = "ui" | "workspace" | "web";

/**
 * A basic environment service that can be used in various processes,
 * such as main, renderer and shared process. Use subclasses of this
 * service for specific environment.
 */
export interface IEnvironmentService {
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

    // --- user roaming data
    stateResource: URI;
    userRoamingDataHome: URI;
    keyboardLayoutResource: URI;
    argvResource: URI;

    // --- data paths
    untitledWorkspacesHome: URI;
    workspaceStorageHome: URI;
    localHistoryHome: URI;
    cacheHome: URI;

    // --- settings sync
    userDataSyncHome: URI;
    sync: "on" | "off" | undefined;

    // --- continue edit session
    continueOn?: string;
    editSessionId?: string;

    // --- extension development
    debugExtensionHost: IExtensionHostDebugParams;
    isExtensionDevelopment: boolean;
    disableExtensions: boolean | string[];
    enableExtensions?: readonly string[];
    extensionDevelopmentLocationURI?: URI[];
    extensionDevelopmentKind?: ExtensionKind[];
    extensionTestsLocationURI?: URI;

    // --- logging
    logsHome: URI;
    logLevel?: string;
    extensionLogLevel?: [string, string][];
    verbose: boolean;
    isBuilt: boolean;

    // --- telemetry
    disableTelemetry: boolean;
    serviceMachineIdResource: URI;

    // --- Policy
    policyFile?: URI;

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
