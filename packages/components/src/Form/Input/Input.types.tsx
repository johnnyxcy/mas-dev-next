/*
 * File: @mas/components/src/Form/Input/Input.types.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/09/2023 12:06 am
 *
 * Last Modified: 12/12/2023 09:31 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import React from "react";

import { InputProps as FuiInputProps } from "@fluentui/react-components";

/**
 * `onComplete` has 2 types: `onEnter` and `onBlur`.
 * `onEnter` is called when the user presses the `Enter` key.
 * `onBlur` is called when the user leaves the input.
 * @note `onEsc` will always trigger `onBlur`.
 */
export type FormInputOnCompleteEventHandler = (
    ev: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
    data: FormInputOnCompleteData,
) => void;

export type FormInputProps = FuiInputProps & {
    /**
     * Called when the user changes the input's value.
     */
    onComplete?: FormInputOnCompleteEventHandler;
};

/**
 * Data passed to the `onChange` callback when a user changes the input's value.
 */
export type FormInputOnCompleteData = {
    /** Updated input value from the user */
    value: string;
};
