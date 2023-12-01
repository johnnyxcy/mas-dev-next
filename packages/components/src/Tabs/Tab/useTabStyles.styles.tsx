/*
 * File: @mas/components/src/Tabs/Tab/useTabStyles.styles.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:59 pm
 *
 * Last Modified: 12/01/2023 08:33 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { useTabStyles_unstable as useFuiTabStyles, TabState as FuiTabState } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { TabState } from "./Tab.types";

const useCardTabStyles = makeStyles({
    card: {
        "backgroundColor": tokens.colorSubtleBackground,
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
        cursor: "pointer",
    },
    selected: {
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
    base: {
        "::before": {
            width: 0,
            heigh: 0,
        },
        "::after": {
            width: 0,
            heigh: 0,
        },
    },
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
            width: 0,
            heigh: 0,
        },
        "::after": {
            width: 0,
            heigh: 0,
        },
    },
    selected: {
        "::after": {
            backgroundColor: tokens.colorCompoundBrandStroke,
        },
        ":hover::after": {
            backgroundColor: tokens.colorCompoundBrandStrokeHover,
        },
        ":active::after": {
            backgroundColor: tokens.colorCompoundBrandStrokePressed,
        },
        "@media (forced-colors: active)": {
            "::after": {
                backgroundColor: "ButtonText",
            },
            ":hover::after": {
                backgroundColor: "ButtonText",
            },
            ":active::after": {
                backgroundColor: "ButtonText",
            },
        },
    },
    disabled: {
        "::after": {
            backgroundColor: tokens.colorNeutralForegroundDisabled,
        },
    },
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
            !disabled && rootStyles.card,
            !disabled && selected && rootStyles.selected,
            // pending indicator (before pseudo element)
            pendingIndicatorStyles.base,
            disabled && pendingIndicatorStyles.disabled,
            // active indicator (after pseudo element)
            selected && activeIndicatorStyles.base,
            selected && !disabled && activeIndicatorStyles.selected,
            selected && disabled && activeIndicatorStyles.disabled,

            state.root.className,
        );
    }

    useFuiTabStyles(fuiState);

    return state;
};
