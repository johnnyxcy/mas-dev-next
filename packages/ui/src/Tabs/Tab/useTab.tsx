/*
 * File: @mas/ui/src/Tabs/Tab/useTab.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:46 pm
 *
 * Last Modified: 12/21/2023 06:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { TabProps, useTab_unstable as useFuiTab } from "@fluentui/react-components";

import { TabState } from "./Tab.types";

export const useTab_unstable = (props: TabProps, ref: React.Ref<HTMLElement>): TabState => {
    return useFuiTab(props, ref);
};
