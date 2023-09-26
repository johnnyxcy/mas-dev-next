/*
 * File: @mas/i18n/src/common/localization.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 02:57 pm
 *
 * Last Modified: 09/25/2023 10:41 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

export const localizationPath = "/services/i18n";

export const IAsyncLocalizationProvider = Symbol("IAsyncLocalizationProvider");
export interface IAsyncLocalizationProvider {
    getCurrentLanguage(): Promise<string>;
    setCurrentLanguage(languageId: string): Promise<void>;
    getAvailableLanguages(): Promise<ILanguageInfo[]>;
    loadLocalization(languageId: string): Promise<ILocalization>;
}

export interface ILocalization extends ILanguageInfo {
    translations: { [key: string]: string };
}

export interface ILanguageInfo {
    languageId: string;
    languageName?: string;
    languagePack?: boolean;
    localizedLanguageName?: string;
}

export type FormatType = string | number | boolean | undefined;

export namespace Localization {
    const formatRegexp = /{([^}]+)}/g;

    export function format(message: string, args: FormatType[]): string;
    export function format(message: string, args: Record<string | number, FormatType>): string;
    export function format(message: string, args: Record<string | number, FormatType> | FormatType[]): string {
        return message.replace(formatRegexp, (match, group) => (args[group] ?? match) as string);
    }

    export function localize(
        localization: ILocalization | undefined,
        key: string,
        defaultValue: string,
        ...args: FormatType[]
    ): string {
        let value = defaultValue;
        if (localization) {
            const translation = localization.translations[key];
            if (translation) {
                value = normalize(translation);
            }
        }
        return format(value, args);
    }

    /**
     * This function normalizes values from VSCode's localizations, which often contain additional mnemonics (`&&`).
     * The normalization removes the mnemonics from the input string.
     *
     * @param value Localization value coming from VSCode
     * @returns A normalized localized value
     */
    export function normalize(value: string): string {
        return value.replace(/&&/g, "");
    }

    export function transformKey(key: string): string {
        let nlsKey = key;
        const keySlashIndex = key.lastIndexOf("/");
        if (keySlashIndex >= 0) {
            nlsKey = key.substring(keySlashIndex + 1);
        }
        return nlsKey;
    }
}
