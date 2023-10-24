/*
 * File: @mas/core/src/parts/sandbox/common/sandbox-types.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/23/2023 05:52 pm
 *
 * Last Modified: 10/23/2023 05:52 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IProcessEnvironment } from "@mas/base/common/platform";
import { IProductConfiguration } from "@mas/base/common/product";

// #######################################################################
// ###                                                                 ###
// ###             Types we need in a common layer for reuse    	   ###
// ###                                                                 ###
// #######################################################################

/**
 * The common properties required for any sandboxed
 * renderer to function.
 */
export interface ISandboxConfiguration {
    /**
     * Identifier of the sandboxed renderer.
     */
    windowId: number;

    /**
     * Root path of the JavaScript sources.
     *
     * Note: This is NOT the installation root
     * directory itself but contained in it at
     * a level that is platform dependent.
     */
    appRoot: string;

    /**
     * Per window process environment.
     */
    userEnv: IProcessEnvironment;

    /**
     * Product configuration.
     */
    product: IProductConfiguration;

    /**
     * Configured zoom level.
     */
    zoomLevel?: number;

    /**
     * Location of V8 code cache.
     */
    codeCachePath?: string;
}
