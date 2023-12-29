/*
 * File: @mas/ui/src/Tabs/Tab/useTab.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:46 pm
 *
 * Last Modified: 12/29/2023 01:36 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { slot, useTab_unstable as useFuiTab } from "@fluentui/react-components";

import { TabState, TabProps } from "./Tab.types";

export const useTab_unstable = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
    const { iconAfter } = props;

    const state = useFuiTab(props, ref) as TabState;
    const iconAfterSlot = slot.optional(iconAfter, { elementType: "span" });
    const iconOnly = Boolean(state.icon?.children && !state.content.children && !iconAfterSlot?.children);
    state.iconAfter = iconAfterSlot;
    state.iconOnly = iconOnly;
    return state;
};
