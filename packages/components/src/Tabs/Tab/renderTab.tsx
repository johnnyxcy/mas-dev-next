/*
 * File: @mas/components/src/Tabs/Tab/renderTab.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 04:55 pm
 *
 * Last Modified: 12/01/2023 05:09 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { renderTab_unstable as renderFuiTab, TabState as FuiTabState } from "@fluentui/react-components";

import { TabState } from "./Tab.types";

export const renderTab_unstable = (state: TabState): JSX.Element => {
    return renderFuiTab(state as FuiTabState);
};
