/*
 * File: @mas/ui/src/Tabs/Tab/Tab.types.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:46 pm
 *
 * Last Modified: 12/22/2023 04:39 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { TabState as FuiState } from "@fluentui/react-components";

/**
 * State used in rendering Tab
 */
export type TabState = Omit<FuiState, "appearance"> & {
    /**
     * A tab supports 'transparent' and 'subtle' appearance.
     */
    appearance?: "transparent" | "subtle" | "card";
};
