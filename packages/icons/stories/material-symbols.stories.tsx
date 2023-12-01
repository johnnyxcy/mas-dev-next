/*
 * File: @mas/icons/stories/material-symbols.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/23/2023 04:30 pm
 *
 * Last Modified: 12/01/2023 10:47 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { MaterialSymbols } from "@mas/icons/material-symbols";

import IconButton from "./icon-button";
import IconsPage, { FontSizeOptions } from "./icons-page";

import "@mas/icons/material-symbols/outlined";
import "@mas/icons/material-symbols/rounded";
import "@mas/icons/material-symbols/sharp";

const OutlinedIconsPage: React.FC<{ size: FontSizeOptions }> = ({ size }) => {
    return (
        <IconsPage size={size}>
            {MaterialSymbols.map((iconId) => (
                <IconButton
                    key={iconId}
                    familyClassName="material-symbols-outlined"
                    iconId={iconId}
                    label={iconId}
                    variant="font-symbols"
                />
            ))}
        </IconsPage>
    );
};

const RoundedIconsPage: React.FC<{ size: FontSizeOptions }> = ({ size }) => {
    return (
        <IconsPage size={size}>
            {MaterialSymbols.map((iconId) => (
                <IconButton
                    key={iconId}
                    familyClassName="material-symbols-rounded"
                    iconId={iconId}
                    label={iconId}
                    variant="font-symbols"
                />
            ))}
        </IconsPage>
    );
};

const SharpIconsPage: React.FC<{ size: FontSizeOptions }> = ({ size }) => {
    return (
        <IconsPage size={size}>
            {MaterialSymbols.map((iconId) => (
                <IconButton
                    key={iconId}
                    familyClassName="material-symbols-sharp"
                    iconId={iconId}
                    label={iconId}
                    variant="font-symbols"
                />
            ))}
        </IconsPage>
    );
};

const meta: Meta = {
    title: "@mas/icons/MaterialSymbols",
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

export const Outlined: StoryObj<{ size: FontSizeOptions }> = {
    render: ({ size }) => <OutlinedIconsPage size={size} />,
    ...StoryArgs,
};

export const Rounded: StoryObj<{ size: FontSizeOptions }> = {
    render: ({ size }) => <RoundedIconsPage size={size} />,
    ...StoryArgs,
};

export const Sharp: StoryObj<{ size: FontSizeOptions }> = {
    render: ({ size }) => <SharpIconsPage size={size} />,
    ...StoryArgs,
};
