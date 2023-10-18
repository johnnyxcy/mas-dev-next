/*
 * File: @mas/core/src/action/common/actions.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 10:49 am
 *
 * Last Modified: 10/18/2023 10:50 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
export interface ILocalizedString {
    /**
     * The localized value of the string.
     */
    value: string;

    /**
     * The original (non localized value of the string)
     */
    original: string;
}

export function isLocalizedString(thing: any): thing is ILocalizedString {
    return thing && typeof thing === "object" && typeof thing.original === "string" && typeof thing.value === "string";
}

export interface ICommandActionTitle extends ILocalizedString {
    /**
     * The title with a mnemonic designation. && precedes the mnemonic.
     */
    mnemonicTitle?: string;
}
