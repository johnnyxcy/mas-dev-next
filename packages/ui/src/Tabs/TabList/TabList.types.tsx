/*
 * File: @mas/ui/src/Tabs/TabList/TabList.types.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 05:18 pm
 *
 * Last Modified: 12/21/2023 06:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import {
    TabListProps as FuiTabListProps,
    TabListContextValue as FuiTabListContextValue,
    ComponentState,
    TabListSlots,
} from "@fluentui/react-components";

export type TabListProps = Omit<FuiTabListProps, "appearance"> & {
    /**
     * A tab list can supports 'card', 'transparent' and 'subtle' appearance.
     *- 'card': A card-like appearance with a border and background.
     *- 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
     *- 'transparent': No background and border styling
     * The appearance affects each of the contained tabs.
     * @default 'transparent'
     */
    appearance?: "card" | "transparent" | "subtle";
};

export type TabListContextValue = Omit<FuiTabListContextValue, "appearance"> &
    Required<Pick<TabListProps, "appearance">>;

export type TabListContextValues = {
    /**
     * The context of the tab list available to each tab.
     */
    tabList: TabListContextValue;
};

export type TabListState = ComponentState<Required<TabListSlots>> & TabListContextValue;
