/*
 * File: @mas/components/stories/Form/index.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/09/2023 01:28 am
 *
 * Last Modified: 12/09/2023 01:32 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Input } from "@fluentui/react-components";
import { Meta } from "@storybook/react";

import bestPracticesMd from "./InputBestPractices.md";
import descriptionMd from "./InputDescription.md";

export { Default } from "./FormInputDefault.stories";

const meta: Meta = {
    title: "Components/Input",
    component: Input,
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
