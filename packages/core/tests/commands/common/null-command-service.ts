/*
 * File: @mas/core/tests/commands/common/mock-command-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 10:43 am
 *
 * Last Modified: 10/18/2023 10:46 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Disposable } from "@mas/base/common/lifecycle";
import { ICommandService } from "@mas/core/commands/common/commands";

export const NullCommandService: ICommandService = {
    onWillExecuteCommand: () => Disposable.None,
    onDidExecuteCommand: () => Disposable.None,
    executeCommand() {
        return Promise.resolve(undefined);
    },
};
