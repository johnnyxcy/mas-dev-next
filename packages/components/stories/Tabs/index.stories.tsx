/*
 * File: @mas/components/stories/Tabs/index.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 05:38 pm
 *
 * Last Modified: 12/02/2023 12:01 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { TabList } from "@fluentui/react-components";

import { Meta } from "@storybook/react";

import bestPracticesMd from "./TabListBestPractices.md";
import descriptionMd from "./TabListDescription.md";

export { Default } from "./TabListDefault.stories";
export { Horizontal } from "./TabListHorizontal.stories";
export { Vertical } from "./TabListVertical.stories";
export { Appearance } from "./TabListAppearance.stories";
export { Disabled } from "./TabListDisabled.stories";
export { SizeSmall } from "./TabListSizeSmall.stories";
export { SizeMedium } from "./TabListSizeMedium.stories";
export { SizeLarge } from "./TabListSizeLarge.stories";
export { WithIcon } from "./TabListWithIcon.stories";
export { IconOnly } from "./TabListIconOnly.stories";
export { WithOverflow } from "./TabListWithOverflow.stories";
export { WithPanels } from "./TabListWithPanels.stories";

const meta: Meta = {
    title: "Components/TabList",
    component: TabList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: [descriptionMd, bestPracticesMd].join("\n"),
            },
        },
    },
};
export default meta;
