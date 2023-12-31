/*
 * File: @mas/base/src/common/keybinding-labels.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:14 pm
 *
 * Last Modified: 10/27/2023 04:03 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import nls from "@mas/i18n";

import { Modifiers } from "@mas/base/common/keybindings";
import { OperatingSystem } from "@mas/base/common/platform";

export interface ModifierLabels {
    readonly ctrlKey: string;
    readonly shiftKey: string;
    readonly altKey: string;
    readonly metaKey: string;
    readonly separator: string;
}

export interface KeyLabelProvider<T extends Modifiers> {
    (keybinding: T): string | null;
}

export class ModifierLabelProvider {
    readonly modifierLabels: ModifierLabels[];

    constructor(mac: ModifierLabels, windows: ModifierLabels, linux: ModifierLabels = windows) {
        this.modifierLabels = [null!]; // index 0 will never me accessed.
        this.modifierLabels[OperatingSystem.Macintosh] = mac;
        this.modifierLabels[OperatingSystem.Windows] = windows;
        this.modifierLabels[OperatingSystem.Linux] = linux;
    }

    toLabel<T extends Modifiers>(
        OS: OperatingSystem,
        chords: readonly T[],
        keyLabelProvider: KeyLabelProvider<T>,
    ): string | null {
        if (chords.length === 0) {
            return null;
        }

        const result: string[] = [];
        for (let i = 0, len = chords.length; i < len; i++) {
            const chord = chords[i];
            const keyLabel = keyLabelProvider(chord);
            if (keyLabel === null) {
                // this keybinding cannot be expressed...
                return null;
            }
            result[i] = _simpleAsString(chord, keyLabel, this.modifierLabels[OS]);
        }
        return result.join(" ");
    }
}

/**
 * A label provider that prints modifiers in a suitable format for displaying in the UI.
 */
export const UILabelProvider = new ModifierLabelProvider(
    {
        ctrlKey: "\u2303",
        shiftKey: "⇧",
        altKey: "⌥",
        metaKey: "⌘",
        separator: "",
    },
    {
        ctrlKey: nls.localizeByDefault("Ctrl"),
        shiftKey: nls.localizeByDefault("Shift"),
        altKey: nls.localizeByDefault("Alt"),
        metaKey: nls.localizeByDefault("Windows"),
        separator: "+",
    },
    {
        ctrlKey: nls.localizeByDefault("Ctrl"),
        shiftKey: nls.localizeByDefault("Shift"),
        altKey: nls.localizeByDefault("Alt"),
        metaKey: nls.localizeByDefault("Super"),
        separator: "+",
    },
);

/**
 * A label provider that prints modifiers in a suitable format for ARIA.
 */
export const AriaLabelProvider = new ModifierLabelProvider(
    {
        ctrlKey: nls.localizeByDefault("Control"),
        shiftKey: nls.localizeByDefault("Shift"),
        altKey: nls.localizeByDefault("Option"),
        metaKey: nls.localizeByDefault("Command"),
        separator: "+",
    },
    {
        ctrlKey: nls.localizeByDefault("Control"),
        shiftKey: nls.localizeByDefault("Shift"),
        altKey: nls.localizeByDefault("Alt"),
        metaKey: nls.localizeByDefault("Windows"),
        separator: "+",
    },
    {
        ctrlKey: nls.localizeByDefault("Control"),
        shiftKey: nls.localizeByDefault("Shift"),
        altKey: nls.localizeByDefault("Alt"),
        metaKey: nls.localizeByDefault("Super"),
        separator: "+",
    },
);

/**
 * A label provider that prints modifiers in a suitable format for Electron Accelerators.
 * See https://github.com/electron/electron/blob/master/docs/api/accelerator.md
 */
export const ElectronAcceleratorLabelProvider = new ModifierLabelProvider(
    {
        ctrlKey: "Ctrl",
        shiftKey: "Shift",
        altKey: "Alt",
        metaKey: "Cmd",
        separator: "+",
    },
    {
        ctrlKey: "Ctrl",
        shiftKey: "Shift",
        altKey: "Alt",
        metaKey: "Super",
        separator: "+",
    },
);

/**
 * A label provider that prints modifiers in a suitable format for user settings.
 */
export const UserSettingsLabelProvider = new ModifierLabelProvider(
    {
        ctrlKey: "ctrl",
        shiftKey: "shift",
        altKey: "alt",
        metaKey: "cmd",
        separator: "+",
    },
    {
        ctrlKey: "ctrl",
        shiftKey: "shift",
        altKey: "alt",
        metaKey: "win",
        separator: "+",
    },
    {
        ctrlKey: "ctrl",
        shiftKey: "shift",
        altKey: "alt",
        metaKey: "meta",
        separator: "+",
    },
);

function _simpleAsString(modifiers: Modifiers, key: string, labels: ModifierLabels): string {
    if (key === null) {
        return "";
    }

    const result: string[] = [];

    // translate modifier keys: Ctrl-Shift-Alt-Meta
    if (modifiers.ctrlKey) {
        result.push(labels.ctrlKey);
    }

    if (modifiers.shiftKey) {
        result.push(labels.shiftKey);
    }

    if (modifiers.altKey) {
        result.push(labels.altKey);
    }

    if (modifiers.metaKey) {
        result.push(labels.metaKey);
    }

    // the actual key
    if (key !== "") {
        result.push(key);
    }

    return result.join(labels.separator);
}
