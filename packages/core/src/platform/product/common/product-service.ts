/*
 * File: @mas/core/src/platform/product/common/product-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/06/2023 03:53 pm
 *
 * Last Modified: 11/06/2023 03:53 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IProductConfiguration } from "@mas/base/common/product";

export const IProductService = Symbol("productService");

export interface IProductService extends Readonly<IProductConfiguration> {}

export const productSchemaId = "vscode://schemas/vscode-product";
