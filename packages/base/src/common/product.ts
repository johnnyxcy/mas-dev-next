/*
 * File: @mas/base/src/common/product.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/23/2023 06:13 pm
 *
 * Last Modified: 10/23/2023 06:16 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

export interface IProductConfiguration {
    readonly version: string;
    readonly date?: string;
    readonly quality?: string;
    readonly commit?: string;

    readonly nameShort: string;
    readonly nameLong: string;

    readonly win32AppUserModelId?: string;
    readonly win32MutexName?: string;
    readonly win32RegValueName?: string;
    readonly applicationName: string;
    readonly embedderIdentifier?: string;

    readonly urlProtocol: string;
    readonly dataFolderName: string; // location for extensions (e.g. ~/.vscode-insiders)
}
