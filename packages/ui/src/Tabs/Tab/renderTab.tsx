/*
 * File: @mas/ui/src/Tabs/Tab/renderTab.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 04:55 pm
 *
 * Last Modified: 12/29/2023 01:32 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from "@fluentui/react-components";

import { TabInternalSlots, TabState } from "./Tab.types";

/**
 * Render the final JSX of Tab
 */
export const renderTab_unstable = (state: TabState): JSX.Element => {
    assertSlots<TabInternalSlots>(state);

    return (
        <state.root>
            {state.icon && <state.icon />}
            {!state.iconOnly && <state.content />}
            {state.contentReservedSpace && <state.contentReservedSpace />}
            {state.iconAfter && <state.iconAfter />}
        </state.root>
    );
};
