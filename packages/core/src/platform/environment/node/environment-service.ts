/*
 * File: @mas/core/src/platform/environment/node/environment-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/08/2023 01:12 pm
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

import { homedir, tmpdir } from "node:os";

import { NativeParsedArgs } from "@mas/core/platform/environment/common/argv";
import { IDebugParams } from "@mas/core/platform/environment/common/environment";
import {
    AbstractNativeEnvironmentService,
    parseDebugParams,
} from "@mas/core/platform/environment/common/native-environment-service";
import { getUserDataPath } from "@mas/core/platform/environment/node/userdata-path";
import { IProductService } from "@mas/core/platform/product/common/product-service";

export class NativeEnvironmentService extends AbstractNativeEnvironmentService {
    constructor(args: NativeParsedArgs, productService: IProductService) {
        super(
            args,
            {
                homeDir: homedir(),
                tmpDir: tmpdir(),
                userDataDir: getUserDataPath(args, productService.nameShort),
            },
            productService,
        );
    }
}

export function parsePtyHostDebugPort(args: NativeParsedArgs, isBuilt: boolean): IDebugParams {
    return parseDebugParams(
        args["inspect-ptyhost"],
        args["inspect-brk-ptyhost"],
        5877,
        isBuilt,
        args.extensionEnvironment,
    );
}

export function parseSharedProcessDebugPort(args: NativeParsedArgs, isBuilt: boolean): IDebugParams {
    return parseDebugParams(
        args["inspect-sharedprocess"],
        args["inspect-brk-sharedprocess"],
        5879,
        isBuilt,
        args.extensionEnvironment,
    );
}
