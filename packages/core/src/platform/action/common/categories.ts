/*
 * File: @mas/core/src/platform/action/common/categories.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 10:50 am
 *
 * Last Modified: 10/27/2023 04:05 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import nls from "@mas/i18n";

export const Categories = Object.freeze({
    View: { value: nls.localizeByDefault("View"), original: "View" },
    Help: { value: nls.localizeByDefault("Help"), original: "Help" },
    Test: { value: nls.localizeByDefault("Test"), original: "Test" },
    File: { value: nls.localizeByDefault("File"), original: "File" },
    Preferences: { value: nls.localizeByDefault("Preferences"), original: "Preferences" },
    Developer: {
        value: nls.localizeByDefault("Developer"),
        original: "Developer",
    },
});
