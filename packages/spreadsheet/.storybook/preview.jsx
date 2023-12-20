/*
 * File: @mas/spreadsheet/.storybook/preview.jsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 04:24 pm
 *
 * Last Modified: 12/15/2023 01:31 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
// @ts-check
import { FluentProvider, webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { withLinks } from "@storybook/addon-links";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";

/** @type { import('@storybook/react').Preview } */
const preview = {
    decorators: [
        withLinks,
        (Story) => {
            const isDark = useDarkMode();
            return (
                <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
                    <Story />
                </FluentProvider>
            );
        },
    ],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        layout: "fullscreen",
        viewMode: "docs",
        controls: {
            disable: true,
            expanded: true,
        },
        docs: {
            source: {
                excludeDecorators: true,
                type: "source",
            },
        },
    },
};

export default preview;
