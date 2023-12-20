/*
 * File: @mas/spreadsheet/stories/Spreadsheet/index.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/15/2023 10:08 am
 *
 * Last Modified: 12/15/2023 11:30 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { Meta } from "@storybook/react";

// import Spreadsheet from "@mas/spreadsheet/Spreadsheet";

export { Default } from "./Default.stories";

const meta: Meta = {
    title: "Spreadsheet",
    // component: Spreadsheet,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Simple Demo",
            },
        },
    },
};

export default meta;
