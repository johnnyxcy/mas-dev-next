/*
 * File: @mas/icons/.storybook/preview.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/10/2023 03:46 pm
 *
 * Last Modified: 12/01/2023 08:07 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        layout: "fullscreen",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
