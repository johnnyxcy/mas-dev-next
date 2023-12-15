import React from "react";

import { ForwardRefComponent, renderInput_unstable, useInputStyles_unstable } from "@fluentui/react-components";
import { useCustomStyleHook_unstable } from "@fluentui/react-shared-contexts";

import { FormInputProps } from "./Input.types";
import { useFormInput } from "./useInput";

/**
 * The Input component allows people to enter and edit text.
 */
export const Input: ForwardRefComponent<FormInputProps> = React.forwardRef((props, ref) => {
    const state = useFormInput(props, ref);

    useInputStyles_unstable(state);

    useCustomStyleHook_unstable("useInputStyles_unstable")(state);

    return renderInput_unstable(state);
});

Input.displayName = "Input";
