/*
 * File: @mas/icons/stories/fluent-system.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/01/2023 09:25 am
 *
 * Last Modified: 12/01/2023 11:04 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { IcFluentFilledIcons } from "@mas/icons/fluent-system/filled";
import { IcFluentRegularIcons } from "@mas/icons/fluent-system/regular";

import IconButton from "./icon-button";
import IconsPage, { FontSizeOptions } from "./icons-page";

const FilledIconsPage: React.FC<{ size: FontSizeOptions }> = ({ size }) => {
    return (
        <IconsPage size={size}>
            {IcFluentFilledIcons.map((iconId) => {
                const match = /ic_fluent_(.+)_(\d+)_filled/.exec(iconId);
                if (match === null || Number.parseInt(match[2]) !== size) return null;
                const labelName = match[1];
                return (
                    <IconButton
                        key={iconId}
                        familyClassName="ic-fluent-filled"
                        iconId={iconId}
                        label={labelName}
                        variant="font"
                    />
                );
            })}
        </IconsPage>
    );
};

const RegularIconsPage: React.FC<{ size: FontSizeOptions }> = ({ size }) => {
    return (
        <IconsPage size={size}>
            {IcFluentRegularIcons.map((iconId) => {
                const match = /ic_fluent_(.+)_(\d+)_regular/.exec(iconId);
                if (match === null || Number.parseInt(match[2]) !== size) return null;
                const labelName = match[1];

                return (
                    <IconButton
                        key={iconId}
                        familyClassName="ic-fluent-regular"
                        iconId={iconId}
                        label={labelName}
                        variant="font"
                    />
                );
            })}
        </IconsPage>
    );
};

const meta: Meta = {
    title: "@mas/icons/FluentSystem",
};

export default meta;

const StoryArgs: Partial<StoryObj<{ size: FontSizeOptions }>> = {
    argTypes: {
        size: {
            options: [12, 16, 20, 24, 28, 48],
            control: { type: "select" },
        },
    },
    args: {
        size: 24,
    },
};

export const Regular: StoryObj<{ size: FontSizeOptions }> = {
    render: ({ size }) => <RegularIconsPage size={size} />,
    ...StoryArgs,
};

export const Filled: StoryObj<{ size: FontSizeOptions }> = {
    render: ({ size }) => <FilledIconsPage size={size} />,
    ...StoryArgs,
};
