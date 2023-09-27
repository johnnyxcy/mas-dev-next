/*
 * File: @mas/base/src/common/keybindings.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:11 pm
 *
 * Last Modified: 09/27/2023 05:11 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { illegalArgument } from "@mas/base/common/errors";
import { KeyCode, ScanCode } from "@mas/base/common/key-codes";
import { OperatingSystem } from "@mas/base/common/platform";

/**
 * Binary encoding strategy:
 * ```
 *    1111 11
 *    5432 1098 7654 3210
 *    ---- CSAW KKKK KKKK
 *  C = bit 11 = ctrlCmd flag
 *  S = bit 10 = shift flag
 *  A = bit 9 = alt flag
 *  W = bit 8 = winCtrl flag
 *  K = bits 0-7 = key code
 * ```
 */
const enum BinaryKeybindingsMask {
    CtrlCmd = (1 << 11) >>> 0,
    Shift = (1 << 10) >>> 0,
    Alt = (1 << 9) >>> 0,
    WinCtrl = (1 << 8) >>> 0,
    KeyCode = 0x000000ff,
}

export function decodeKeybinding(keybinding: number | number[], OS: OperatingSystem): Keybinding | null {
    if (typeof keybinding === "number") {
        if (keybinding === 0) {
            return null;
        }
        const firstChord = (keybinding & 0x0000ffff) >>> 0;
        const secondChord = (keybinding & 0xffff0000) >>> 16;
        if (secondChord !== 0) {
            return new Keybinding([createSimpleKeybinding(firstChord, OS), createSimpleKeybinding(secondChord, OS)]);
        }
        return new Keybinding([createSimpleKeybinding(firstChord, OS)]);
    } else {
        const chords = [];
        for (let i = 0; i < keybinding.length; i++) {
            chords.push(createSimpleKeybinding(keybinding[i], OS));
        }
        return new Keybinding(chords);
    }
}

export function createSimpleKeybinding(keybinding: number, OS: OperatingSystem): KeyCodeChord {
    const ctrlCmd = !!(keybinding & BinaryKeybindingsMask.CtrlCmd);
    const winCtrl = !!(keybinding & BinaryKeybindingsMask.WinCtrl);

    const ctrlKey = OS === OperatingSystem.Macintosh ? winCtrl : ctrlCmd;
    const shiftKey = !!(keybinding & BinaryKeybindingsMask.Shift);
    const altKey = !!(keybinding & BinaryKeybindingsMask.Alt);
    const metaKey = OS === OperatingSystem.Macintosh ? ctrlCmd : winCtrl;
    const keyCode = keybinding & BinaryKeybindingsMask.KeyCode;

    return new KeyCodeChord(ctrlKey, shiftKey, altKey, metaKey, keyCode);
}

export interface Modifiers {
    readonly ctrlKey: boolean;
    readonly shiftKey: boolean;
    readonly altKey: boolean;
    readonly metaKey: boolean;
}

/**
 * Represents a chord which uses the `keyCode` field of keyboard events.
 * A chord is a combination of keys pressed simultaneously.
 */
export class KeyCodeChord implements Modifiers {
    constructor(
        readonly ctrlKey: boolean,
        readonly shiftKey: boolean,
        readonly altKey: boolean,
        readonly metaKey: boolean,
        readonly keyCode: KeyCode,
    ) {}

    equals(other: Chord): boolean {
        return (
            other instanceof KeyCodeChord &&
            this.ctrlKey === other.ctrlKey &&
            this.shiftKey === other.shiftKey &&
            this.altKey === other.altKey &&
            this.metaKey === other.metaKey &&
            this.keyCode === other.keyCode
        );
    }

    getHashCode(): string {
        const ctrl = this.ctrlKey ? "1" : "0";
        const shift = this.shiftKey ? "1" : "0";
        const alt = this.altKey ? "1" : "0";
        const meta = this.metaKey ? "1" : "0";
        return `K${ctrl}${shift}${alt}${meta}${this.keyCode}`;
    }

    isModifierKey(): boolean {
        return (
            this.keyCode === KeyCode.Unknown ||
            this.keyCode === KeyCode.Ctrl ||
            this.keyCode === KeyCode.Meta ||
            this.keyCode === KeyCode.Alt ||
            this.keyCode === KeyCode.Shift
        );
    }

    toKeybinding(): Keybinding {
        return new Keybinding([this]);
    }

    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    isDuplicateModifierCase(): boolean {
        return (
            (this.ctrlKey && this.keyCode === KeyCode.Ctrl) ||
            (this.shiftKey && this.keyCode === KeyCode.Shift) ||
            (this.altKey && this.keyCode === KeyCode.Alt) ||
            (this.metaKey && this.keyCode === KeyCode.Meta)
        );
    }
}

/**
 * Represents a chord which uses the `code` field of keyboard events.
 * A chord is a combination of keys pressed simultaneously.
 */
export class ScanCodeChord implements Modifiers {
    constructor(
        readonly ctrlKey: boolean,
        readonly shiftKey: boolean,
        readonly altKey: boolean,
        readonly metaKey: boolean,
        readonly scanCode: ScanCode,
    ) {}

    equals(other: Chord): boolean {
        return (
            other instanceof ScanCodeChord &&
            this.ctrlKey === other.ctrlKey &&
            this.shiftKey === other.shiftKey &&
            this.altKey === other.altKey &&
            this.metaKey === other.metaKey &&
            this.scanCode === other.scanCode
        );
    }

    getHashCode(): string {
        const ctrl = this.ctrlKey ? "1" : "0";
        const shift = this.shiftKey ? "1" : "0";
        const alt = this.altKey ? "1" : "0";
        const meta = this.metaKey ? "1" : "0";
        return `S${ctrl}${shift}${alt}${meta}${this.scanCode}`;
    }

    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    isDuplicateModifierCase(): boolean {
        return (
            (this.ctrlKey && (this.scanCode === ScanCode.ControlLeft || this.scanCode === ScanCode.ControlRight)) ||
            (this.shiftKey && (this.scanCode === ScanCode.ShiftLeft || this.scanCode === ScanCode.ShiftRight)) ||
            (this.altKey && (this.scanCode === ScanCode.AltLeft || this.scanCode === ScanCode.AltRight)) ||
            (this.metaKey && (this.scanCode === ScanCode.MetaLeft || this.scanCode === ScanCode.MetaRight))
        );
    }
}

export type Chord = KeyCodeChord | ScanCodeChord;

/**
 * A keybinding is a sequence of chords.
 */
export class Keybinding {
    readonly chords: Chord[];

    constructor(chords: Chord[]) {
        if (chords.length === 0) {
            throw illegalArgument("chords");
        }
        this.chords = chords;
    }

    getHashCode(): string {
        let result = "";
        for (let i = 0, len = this.chords.length; i < len; i++) {
            if (i !== 0) {
                result += ";";
            }
            result += this.chords[i].getHashCode();
        }
        return result;
    }

    equals(other: Keybinding | null): boolean {
        if (other === null) {
            return false;
        }
        if (this.chords.length !== other.chords.length) {
            return false;
        }
        for (let i = 0; i < this.chords.length; i++) {
            if (!this.chords[i].equals(other.chords[i])) {
                return false;
            }
        }
        return true;
    }
}

export class ResolvedChord {
    constructor(
        readonly ctrlKey: boolean,
        readonly shiftKey: boolean,
        readonly altKey: boolean,
        readonly metaKey: boolean,
        readonly keyLabel: string | null,
        readonly keyAriaLabel: string | null,
    ) {}
}

export type SingleModifierChord = "ctrl" | "shift" | "alt" | "meta";

/**
 * A resolved keybinding. Consists of one or multiple chords.
 */
export abstract class ResolvedKeybinding {
    /**
     * This prints the binding in a format suitable for displaying in the UI.
     */
    abstract getLabel(): string | null;
    /**
     * This prints the binding in a format suitable for ARIA.
     */
    abstract getAriaLabel(): string | null;
    /**
     * This prints the binding in a format suitable for electron's accelerators.
     * See https://github.com/electron/electron/blob/master/docs/api/accelerator.md
     */
    abstract getElectronAccelerator(): string | null;
    /**
     * This prints the binding in a format suitable for user settings.
     */
    abstract getUserSettingsLabel(): string | null;
    /**
     * Is the user settings label reflecting the label?
     */
    abstract isWYSIWYG(): boolean;
    /**
     * Does the keybinding consist of more than one chord?
     */
    abstract hasMultipleChords(): boolean;
    /**
     * Returns the chords that comprise of the keybinding.
     */
    abstract getChords(): ResolvedChord[];
    /**
     * Returns the chords as strings useful for dispatching.
     * Returns null for modifier only chords.
     * @example keybinding "Shift" -> null
     * @example keybinding ("D" with shift == true) -> "shift+D"
     */
    abstract getDispatchChords(): (string | null)[];
    /**
     * Returns the modifier only chords as strings useful for dispatching.
     * Returns null for chords that contain more than one modifier or a regular key.
     * @example keybinding "Shift" -> "shift"
     * @example keybinding ("D" with shift == true") -> null
     */
    abstract getSingleModifierDispatchChords(): (SingleModifierChord | null)[];
}
