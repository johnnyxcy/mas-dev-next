/*
 * File: @mas/core/src/action/common/categories.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 10:50 am
 *
 * Last Modified: 10/18/2023 10:50 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { localize } from "@mas/i18n/nls";

export const Categories = Object.freeze({
    View: { value: localize("view", "View"), original: "View" },
    Help: { value: localize("help", "Help"), original: "Help" },
    Test: { value: localize("test", "Test"), original: "Test" },
    File: { value: localize("file", "File"), original: "File" },
    Preferences: { value: localize("preferences", "Preferences"), original: "Preferences" },
    Developer: {
        value: localize(
            { key: "developer", comment: ["A developer on Code itself or someone diagnosing issues in Code"] },
            "Developer",
        ),
        original: "Developer",
    },
});
