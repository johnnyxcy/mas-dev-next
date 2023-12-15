/*
 * File: @mas/components/src/Form/Input/useInput.tsx
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 12/09/2023 12:21 am
 *
 * Last Modified: 12/12/2023 09:40 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import React from "react";

import { useEventCallback, useInput_unstable, InputState as FuiInputState } from "@fluentui/react-components";

import { Delayer } from "@mas/base/common/async";

import { FormInputProps } from "./Input.types";

export function useFormInput(props: FormInputProps, ref: React.Ref<HTMLInputElement>): FuiInputState {
    const state = useInput_unstable(props, ref);

    const delayer = React.useMemo(() => new Delayer(10), []);

    const { onComplete, onKeyDown, onBlur } = props;

    state.input.onBlur = useEventCallback((ev: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(ev);

        if (ev.isDefaultPrevented()) {
            return;
        }

        delayer.trigger(
            () =>
                onComplete?.(ev, {
                    value: ev.target.value,
                }),
        );
    });

    state.input.onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(ev);

        if (ev.isDefaultPrevented()) {
            return;
        }

        const dispatchOnBlurEv = (): void => {
            ev.currentTarget.blur();
        };

        if (ev.key === "Enter") {
            delayer.trigger(
                () =>
                    onComplete?.(ev, {
                        value: ev.currentTarget.value,
                    }),
            );
            dispatchOnBlurEv();
        } else if (ev.key === "Escape") {
            dispatchOnBlurEv();
        }
    });

    return state;
}
