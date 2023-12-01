/*
 * File: @mas/components/src/Tabs/TabList/TabList.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 05:17 pm
 *
 * Last Modified: 12/01/2023 05:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import {
    renderTabList_unstable,
    TabListProps as FuiTabListProps,
    useTabListStyles_unstable,
    useTabListContextValues_unstable,
    useTabList_unstable,
} from "@fluentui/react-components";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import { ForwardRefComponent } from "@fluentui/react-utilities";

import { TabListProps } from "./TabList.types";

/**
 * A tab list provides single selection from a set of tabs.
 */
export const TabList: ForwardRefComponent<TabListProps> = React.forwardRef((props, ref) => {
    const state = useTabList_unstable(props as FuiTabListProps, ref);
    const contextValues = useTabListContextValues_unstable(state);

    useTabListStyles_unstable(state);

    useCustomStyleHook_unstable("useTabListStyles_unstable")(state);

    return renderTabList_unstable(state, contextValues);
});

TabList.displayName = "TabList";
