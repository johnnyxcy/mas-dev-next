/*
 * File: @mas/ui/stories/Form/FormInputDefault.stories.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/09/2023 01:28 am
 *
 * Last Modified: 12/21/2023 06:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import * as React from "react";

import {
    makeStyles,
    shorthands,
    useId,
    Label,
    useToastController,
    Toaster,
    Toast,
    ToastTitle,
} from "@fluentui/react-components";
import { ArgTypes } from "@storybook/types";

import Form from "@mas/ui/Form";
import { FormInputProps } from "@mas/ui/Form/Input/Input.types";

const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        ...shorthands.gap("2px"),
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "400px",
    },
});

export const Default = (props: FormInputProps): JSX.Element => {
    const inputId = useId("input");
    const styles = useStyles();

    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);

    return (
        <div className={styles.root}>
            <Label htmlFor={inputId} size={props.size} disabled={props.disabled}>
                Sample input
            </Label>
            <Form.Input
                id={inputId}
                {...props}
                onComplete={(ev, { value }) => {
                    dispatchToast(
                        <Toast>
                            <ToastTitle>onComplete</ToastTitle>
                            value = {value}
                        </Toast>,
                        { intent: "info" },
                    );
                }}
            />
            <Toaster toasterId={toasterId} />
        </div>
    );
};

const argTypes: ArgTypes = {
    // Add these native props to the props table and controls pane
    placeholder: {
        description:
            "Placeholder text for the input. If using this instead of a label (which is " +
            "not recommended), be sure to provide an `aria-label` for screen reader users.",
        type: { name: "string", required: false }, // for inferring control type
        table: { type: { summary: "string" } }, // for showing type in prop table
    },
    disabled: {
        description: "Whether the input is disabled",
        type: { name: "boolean", required: false },
        table: { type: { summary: "boolean" } },
    },
    // Hide these from the props table and controls pane
    children: { table: { disable: true } },
    as: { table: { disable: true } },
};
Default.argTypes = argTypes;
