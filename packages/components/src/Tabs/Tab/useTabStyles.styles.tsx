/*
 * File: @mas/components/src/Tabs/Tab/useTabStyles.styles.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:59 pm
 *
 * Last Modified: 12/05/2023 06:41 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import {
    useTabStyles_unstable as useFuiTabStyles,
    TabState as FuiTabState,
    shorthands,
} from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { TabState } from "./Tab.types";

const useCardTabStyles = makeStyles({
    card: {
        ...shorthands.borderColor("none"),
        ...shorthands.borderRadius(0),
        ...shorthands.borderWidth(0),
        "backgroundColor": tokens.colorNeutralBackground5,
        ":hover": {
            backgroundColor: tokens.colorSubtleBackgroundHover,
        },
        ":active": {
            backgroundColor: tokens.colorSubtleBackgroundPressed,
        },
        "& .fui-Tab__icon": {
            color: tokens.colorNeutralForeground2,
        },
        ":hover .fui-Tab__icon": {
            color: tokens.colorNeutralForeground2Hover,
        },
        ":active .fui-Tab__icon": {
            color: tokens.colorNeutralForeground2Pressed,
        },
        "& .fui-Tab__content": {
            color: tokens.colorNeutralForeground2,
        },
        ":hover .fui-Tab__content": {
            color: tokens.colorNeutralForeground2Hover,
        },
        ":active .fui-Tab__content": {
            color: tokens.colorNeutralForeground2Pressed,
        },
    },
    disabled: {
        "cursor": "default",
        ":hover": {
            backgroundColor: "none",
        },
        ":active": {
            backgroundColor: "none",
        },
        "& .fui-Tab__icon": {
            color: tokens.colorNeutralForegroundDisabled,
        },
        "& .fui-Tab__content": {
            color: tokens.colorNeutralForegroundDisabled,
        },
        ":hover .fui-Tab__icon": {
            color: tokens.colorNeutralForegroundDisabled,
        },
        ":active .fui-Tab__icon": {
            color: tokens.colorNeutralForegroundDisabled,
        },
        ":hover .fui-Tab__content": {
            color: tokens.colorNeutralForegroundDisabled,
        },
        ":active .fui-Tab__content": {
            color: tokens.colorNeutralForegroundDisabled,
        },
    },
    selected: {
        "backgroundColor": tokens.colorNeutralBackground1,
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground1,
        },
        "& .fui-Tab__icon": {
            color: tokens.colorCompoundBrandForeground1,
        },
        ":hover .fui-Tab__icon": {
            color: tokens.colorCompoundBrandForeground1Hover,
        },
        ":active .fui-Tab__icon": {
            color: tokens.colorCompoundBrandForeground1Pressed,
        },
        "& .fui-Tab__content": {
            color: tokens.colorNeutralForeground1,
        },
        ":hover .fui-Tab__content": {
            color: tokens.colorNeutralForeground1Hover,
        },
        ":active .fui-Tab__content": {
            color: tokens.colorNeutralForeground1Pressed,
        },
    },
});

const usePendingIndicatorStyles = makeStyles({
    base: {},
    disabled: {
        ":hover::before": {
            backgroundColor: tokens.colorTransparentStroke,
        },
        ":active::before": {
            backgroundColor: tokens.colorTransparentStroke,
        },
    },
});

const useActiveIndicatorStyles = makeStyles({
    base: {
        "::before": {
            height: 0,
            width: 0,
        },
        "::after": {
            content: '""',
            display: "block",
            position: "absolute",
            left: "auto",
            top: "auto",
            right: 0,
            bottom: "auto",
            height: "60%",
            width: tokens.strokeWidthThin,
            backgroundColor: tokens.colorNeutralStroke1,
        },
        ":hover::after": {
            backgroundColor: "transparent",
        },
        ":active::after": {
            backgroundColor: "transparent",
        },
    },
    selected: {
        "::after": { backgroundColor: "transparent" },
        ":hover::after": {
            backgroundColor: "transparent",
        },
    },
    disabled: {},
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
    const rootStyles = useCardTabStyles();
    const pendingIndicatorStyles = usePendingIndicatorStyles();
    const activeIndicatorStyles = useActiveIndicatorStyles();

    const { appearance, disabled, selected } = state;

    const fuiState: FuiTabState = {
        ...state,
        appearance: state.appearance === "card" ? "subtle" : state.appearance,
    };

    if (appearance === "card") {
        state.root.className = mergeClasses(
            rootStyles.card,
            !disabled && selected && rootStyles.selected,
            disabled && rootStyles.disabled,
            // pending indicator (before pseudo element)
            pendingIndicatorStyles.base,
            disabled && pendingIndicatorStyles.disabled,
            // active indicator (after pseudo element)
            activeIndicatorStyles.base,
            selected && !disabled && activeIndicatorStyles.selected,
            selected && disabled && activeIndicatorStyles.disabled,

            state.root.className,
        );
    }

    useFuiTabStyles(fuiState);

    return state;
};
