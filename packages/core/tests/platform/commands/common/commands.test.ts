/*
 * File: @mas/core/tests/platform/commands/common/commands.test.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 01:06 pm
 *
 * Last Modified: 10/18/2023 01:13 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { assert, describe, test } from "vitest";

import { combinedDisposable } from "@mas/base/common/lifecycle";
import { ensureNoDisposablesAreLeakedInTestSuite } from "@mas/base/testing/common/utils";
import { CommandsRegistry } from "@mas/core/platform/commands/common/commands";

describe("Command Tests", function () {
    ensureNoDisposablesAreLeakedInTestSuite();

    test("register command - no handler", function () {
        assert.throws(() => CommandsRegistry.registerCommand("foo", null!));
    });

    test("register/dispose", () => {
        const command = (): void => {};
        const reg = CommandsRegistry.registerCommand("foo", command);
        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command);
        reg.dispose();
        assert.ok(CommandsRegistry.getCommand("foo") === undefined);
    });

    test("register/register/dispose", () => {
        const command1 = (): void => {};
        const command2 = (): void => {};

        // dispose overriding command
        let reg1 = CommandsRegistry.registerCommand("foo", command1);
        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command1);

        let reg2 = CommandsRegistry.registerCommand("foo", command2);
        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command2);
        reg2.dispose();

        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command1);
        reg1.dispose();
        assert.ok(CommandsRegistry.getCommand("foo") === undefined);

        // dispose override command first
        reg1 = CommandsRegistry.registerCommand("foo", command1);
        reg2 = CommandsRegistry.registerCommand("foo", command2);
        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command2);

        reg1.dispose();
        assert.ok(CommandsRegistry.getCommand("foo")!.handler === command2);

        reg2.dispose();
        assert.ok(CommandsRegistry.getCommand("foo") === undefined);
    });

    test("command with description", function () {
        const r1 = CommandsRegistry.registerCommand("test", function (accessor, args) {
            assert.ok(typeof args === "string");
        });

        const r2 = CommandsRegistry.registerCommand("test2", function (accessor, args) {
            assert.ok(typeof args === "string");
        });

        const r3 = CommandsRegistry.registerCommand({
            id: "test3",
            handler: (accessor, args) => {
                return true;
            },
            metadata: {
                description: "a command",
                args: [{ name: "value", constraint: Number }],
            },
        });

        CommandsRegistry.getCommands().get("test")!.handler.apply(undefined, [undefined!, "string"]);
        CommandsRegistry.getCommands().get("test2")!.handler.apply(undefined, [undefined!, "string"]);
        assert.throws(() =>
            CommandsRegistry.getCommands().get("test3")!.handler.apply(undefined, [undefined!, "string"]),
        );
        assert.strictEqual(
            CommandsRegistry.getCommands().get("test3")!.handler.apply(undefined, [undefined!, 1]) as unknown as true,
            true,
        );

        combinedDisposable(r1, r2, r3).dispose();
    });
});
