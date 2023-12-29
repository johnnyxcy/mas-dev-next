/*
 * File: @mas/ui/src/Tabs/Tab/Tab.types.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:46 pm
 *
 * Last Modified: 12/29/2023 01:30 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import {
    TabState as FuiState,
    TabProps as FuiTabProps,
    TabSlots as FuiTabSlots,
    Slot,
    ComponentState,
} from "@fluentui/react-components";

export type TabSlots = FuiTabSlots & {
    /**
     * The icon after the content.
     */
    iconAfter?: Slot<"span">;
};

export type TabInternalSlots = TabSlots & {
    contentReservedSpace?: Slot<"span">;
};

/**
 * State used in rendering Tab
 */
export type TabState = Omit<FuiState, "appearance"> &
    Pick<ComponentState<TabSlots>, "iconAfter"> & {
        /**
         * A tab supports 'transparent' and 'subtle' appearance.
         */
        appearance?: "transparent" | "subtle" | "card";
    };

export type TabProps = FuiTabProps & Pick<ComponentState<TabSlots>, "iconAfter">;
