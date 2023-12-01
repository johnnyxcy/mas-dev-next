/*
 * File: @mas/icons/.storybook/main.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/10/2023 03:46 pm
 *
 * Last Modified: 12/01/2023 08:08 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { dirname, join } from "node:path";
import { mergeConfig } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 *
 * @param {string} value
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-interactions"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
    docs: {
        autodocs: "tag",
    },

    viteFinal: (conf) => {
        return mergeConfig(conf, {
            build: {
                sourcemap: true,
            },
        });
    },
};
export default config;
