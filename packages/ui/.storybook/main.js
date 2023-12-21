/*
 * File: @mas/ui/.storybook/main.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/30/2023 04:24 pm
 *
 * Last Modified: 12/21/2023 06:12 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { dirname, join } from "node:path";
import { mergeConfig } from "vite";

import viteMarkdownPlugin from "@mas/vite-markdown-plugin";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 *
 * @param {string} value
 * @returns
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ["../stories/**/index.mdx", "../stories/**/index.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-interactions"),
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("storybook-dark-mode"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },

    viteFinal: (conf) => {
        return mergeConfig(conf, {
            plugins: [
                viteMarkdownPlugin({
                    mode: "markdown",
                }),
            ],
            build: {
                sourcemap: true,
            },
        });
    },
};
export default config;
