/*
 * File: @mas/ui/src/index.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 04:06 pm
 *
 * Last Modified: 12/22/2023 04:16 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

export * from "@fluentui/react-components";

// #region Overrides

// #region Tabs
// Add "card" appearance to Tabs
export {
    Tab,
    TabList,
    type TabState,
    type TabListProps,
    type TabListState,
    type TabListContextValues,
    type TabListContextValue,
    useTabListStyles,
    useTabStyles_unstable,
    useTab_unstable,
} from "./Tabs";
// #endregion

// #endregion
