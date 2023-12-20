/*
 * File: @mas/components/stories/Form/FuiField.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/18/2023 04:29 pm
 *
 * Last Modified: 12/18/2023 04:52 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import * as React from "react";

import {
    Checkbox,
    Combobox,
    Field,
    Input,
    makeResetStyles,
    Option,
    Radio,
    RadioGroup,
    Slider,
    SpinButton,
    Switch,
    Textarea,
    tokens,
} from "@fluentui/react-components";

const useStackClassName = makeResetStyles({
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
});

export const ComponentExamples: React.FC = () => (
    <div className={useStackClassName()}>
        <Field label="Input">
            <Input />
        </Field>
        <Field label="Textarea">
            <Textarea />
        </Field>
        <Field label="Combobox">
            <Combobox>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Combobox>
        </Field>
        <Field label="SpinButton">
            <SpinButton />
        </Field>
        <Field hint="Checkboxes use their own label instead of the Field label.">
            <Checkbox label="Checkbox" />
        </Field>
        <Field label="Slider">
            <Slider defaultValue={25} />
        </Field>
        <Field label="Switch">
            <Switch />
        </Field>
        <Field label="RadioGroup">
            <RadioGroup>
                <Radio label="Option 1" />
                <Radio label="Option 2" />
                <Radio label="Option 3" />
            </RadioGroup>
        </Field>
    </div>
);
