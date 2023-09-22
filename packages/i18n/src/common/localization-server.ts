/*
 * File: i18n/src/common/localization-server.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 03:10 pm
 *
 * Last Modified: 09/20/2023 03:11 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Localization } from "@mas/i18n/common/localization";

export const LocalizationServerPath = "/localization-server";

export const LocalizationServer = Symbol("LocalizationServer");

export interface LocalizationServer {
    loadLocalization(languageId: string): Promise<Localization>;
}
