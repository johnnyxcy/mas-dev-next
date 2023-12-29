/*
 * File: @mas/ui/src/Tabs/Tab/Tab.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:46 pm
 *
 * Last Modified: 12/29/2023 05:47 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import * as React from "react";

import { TabState as FuiTabState } from "@fluentui/react-components";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";
import { ForwardRefComponent } from "@fluentui/react-utilities";

import { TabProps } from "./Tab.types";
import { renderTab_unstable } from "./renderTab";
import { useTab_unstable } from "./useTab";
import { useTabStyles_unstable } from "./useTabStyles.styles";

/**
 * A tab provides a selectable item in a tab list.
 */
export const Tab: ForwardRefComponent<TabProps> = React.forwardRef((props, ref) => {
    const state = useTab_unstable(props, ref);

    useTabStyles_unstable(state);

    useCustomStyleHook_unstable("useTabStyles_unstable")(state);

    return renderTab_unstable(state as FuiTabState);
});

Tab.displayName = "Tab";
