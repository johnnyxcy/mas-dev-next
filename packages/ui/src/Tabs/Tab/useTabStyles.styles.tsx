/*
 * File: @mas/ui/src/Tabs/Tab/useTabStyles.styles.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 02:59 pm
 *
 * Last Modified: 12/21/2023 06:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { useTabStyles_unstable as useFuiTabStyles, shorthands } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { TabState } from "./Tab.types";

const useCardTabStyles = makeStyles({
    card: {
        "backgroundColor": tokens.colorTransparentBackground,
        ":hover": {
            backgroundColor: tokens.colorTransparentBackgroundHover,
        },
        ":active": {
            backgroundColor: tokens.colorTransparentBackgroundPressed,
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
        ...shorthands.borderColor("none"),
        ...shorthands.borderRadius(0),
        ...shorthands.borderWidth(0),
    },
    disabled: {
        "cursor": "default",
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

const useDividerStyles = makeStyles({
    base: {
        "::before": {
            content: '""',
            display: "block",
            position: "absolute",
            backgroundColor: tokens.colorNeutralStroke1,
        },

        // 如果当前 fui-Tab 被 hover，则不显示 divider
        ":hover::before": {
            zIndex: -1,
        },
        // 如果下一个 fui-Tab 被 hover，则不显示 divider
        ":has(+ .fui-Tab:is(:hover))": {
            "::before": {
                zIndex: -1,
            },
        },
        // 如果下一个 fui-Tab 被选中，则不显示 divider
        ':has(+ .fui-Tab[aria-selected="true"])': {
            "::before": {
                zIndex: -1,
            },
        },
    },
    horizontal: {
        // 竖线
        "::before": {
            left: "auto",
            top: "auto",
            right: 0,
            bottom: "auto",
            height: "60%",
            width: tokens.strokeWidthThin,
        },
    },
    vertical: {
        // 横线
        "::before": {
            left: "50%",
            top: "auto",
            right: "auto",
            bottom: 0,
            transform: "translateX(-50%)",
            height: tokens.strokeWidthThin,
            width: "80%",
        },
    },
    disabled: {
        ":hover::before": {
            backgroundColor: tokens.colorSubtleBackgroundHover,
        },
        ":active::before": {
            backgroundColor: tokens.colorSubtleBackgroundPressed,
        },
    },
    selected: {
        // 如果当前 fui-Tab 被选中，则不显示 divider
        "::before": {
            display: "none",
        },
    },
});

const useIndicatorStyles = makeStyles({
    base: {
        "&> *": {
            zIndex: 2,
        },
        "::after": {
            position: "absolute",
            content: '""',
            zIndex: 0,
            backgroundColor: tokens.colorTransparentBackground,
            ...shorthands.borderRadius(tokens.borderRadiusNone),
        },
        ":hover::after": {
            boxShadow: tokens.shadow2,
            backgroundColor: tokens.colorNeutralBackground5Hover,
        },
        ":active::after": {
            backgroundColor: tokens.colorNeutralBackground5Pressed,
        },
    },
    vertical: {
        "::after": {
            height: "100%",
            width: "98%",
            top: 0,
            left: "auto",
            bottom: 0,
            right: 0,
            borderTopLeftRadius: tokens.borderRadiusXLarge,
            borderBottomLeftRadius: tokens.borderRadiusXLarge,
        },
    },
    horizontal: {
        "::after": {
            height: "92%",
            width: "100%",
            top: "auto",
            left: 0,
            bottom: 0,
            right: 0,
            borderTopLeftRadius: tokens.borderRadiusXLarge,
            borderTopRightRadius: tokens.borderRadiusXLarge,
        },
    },
    selected: {
        "::after": {
            zIndex: 1,
            boxShadow: tokens.shadow4,
            backgroundColor: tokens.colorNeutralForegroundInvertedSelected,
        },
        ":hover::after": {
            backgroundColor: tokens.colorNeutralForegroundInvertedHover,
        },
        ":active::after": {
            backgroundColor: tokens.colorNeutralForegroundInvertedPressed,
        },
    },
    selectedHorizontal: {
        "::after": {
            clipPath: "inset(-4px -4px 0 -4px)",
        },
    },
    selectedVertical: {
        "::after": {
            clipPath: "inset(-4px 0 -4px -4px)",
        },
    },
    disabled: {
        ":hover::after": {
            backgroundColor: tokens.colorNeutralBackground5Pressed,
        },
        ":active::after": {
            backgroundColor: tokens.colorNeutralBackground5Pressed,
        },
    },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
    const rootStyles = useCardTabStyles();
    const pendingIndicatorStyles = useDividerStyles();
    const activeIndicatorStyles = useIndicatorStyles();

    const { appearance, disabled, selected, vertical } = state;

    if (appearance === "card") {
        state.root.className = mergeClasses(
            rootStyles.card,
            !disabled && selected && rootStyles.selected,
            disabled && rootStyles.disabled,

            // divider (before pseudo element)
            pendingIndicatorStyles.base,
            vertical ? pendingIndicatorStyles.vertical : pendingIndicatorStyles.horizontal,
            selected && !disabled && pendingIndicatorStyles.selected,
            disabled && pendingIndicatorStyles.disabled,

            // indicator (after pseudo element)
            activeIndicatorStyles.base,
            vertical ? activeIndicatorStyles.vertical : activeIndicatorStyles.horizontal,
            selected && !disabled && activeIndicatorStyles.selected,
            selected && !disabled && vertical && activeIndicatorStyles.selectedVertical,
            selected && !disabled && !vertical && activeIndicatorStyles.selectedHorizontal,
            disabled && activeIndicatorStyles.disabled,

            state.root.className,
        );
    }

    useFuiTabStyles({
        ...state,
        appearance: state.appearance === "card" ? "subtle" : state.appearance,
    });

    return state;
};
