/*
 * File: @mas/icons/stories/material-symbols.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/23/2023 04:30 pm
 *
 * Last Modified: 11/23/2023 06:22 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import { MaterialSymbols } from "@mas/icons/material-symbols";

import IconButton from "./icon-button";
import IconsPage from "./icons-page";

import "@mas/icons/material-symbols/outlined";
import "@mas/icons/material-symbols/rounded";
import "@mas/icons/material-symbols/sharp";

const OutlinedIconsPage: React.FC = () => {
    return (
        <IconsPage>
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

const RoundedIconsPage: React.FC = () => {
    return (
        <IconsPage>
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

const SharpIconsPage: React.FC = () => {
    return (
        <IconsPage>
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

type Story = StoryObj;

export const Outlined: Story = {
    render: () => <OutlinedIconsPage />,
};

export const Rounded: Story = {
    render: () => <RoundedIconsPage />,
};

export const Sharp: Story = {
    render: () => <SharpIconsPage />,
};
