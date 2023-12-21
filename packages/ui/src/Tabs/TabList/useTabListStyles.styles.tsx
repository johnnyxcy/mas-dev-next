/*
 * File: @mas/ui/src/Tabs/TabList/useTabListStyles.styles.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/08/2023 03:14 pm
 *
 * Last Modified: 12/21/2023 06:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import {
    makeStyles,
    mergeClasses,
    tokens,
    useTabListStyles_unstable as useFuiTabListStyles,
} from "@fluentui/react-components";

import { TabListState } from "./TabList.types";

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
    root: {
        backgroundColor: tokens.colorNeutralBackground5,
    },
    horizontal: {
        paddingLeft: tokens.spacingHorizontalM,
        paddingRight: tokens.spacingHorizontalM,
    },
    vertical: {
        paddingTop: tokens.spacingVerticalM,
        paddingBottom: tokens.spacingVerticalM,
    },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export function useTabListStyles(state: TabListState): TabListState {
    const { appearance, vertical } = state;
    const styles = useStyles();

    if (appearance === "card") {
        state.root.className = mergeClasses(
            styles.root,
            vertical ? styles.vertical : styles.horizontal,
            state.root.className,
        );
    }

    useFuiTabListStyles({
        ...state,
        appearance: state.appearance === "card" ? "subtle" : state.appearance,
    });

    return state;
}
