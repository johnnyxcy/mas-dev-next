/*
 * File: @mas/core/src/commands/common/commands.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 10:44 am
 *
 * Last Modified: 10/18/2023 01:05 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { Container } from "@mas/base/common/di";
import { Emitter, type Event } from "@mas/base/common/event";
import { Iterable } from "@mas/base/common/iterator";
import { type IJSONSchema } from "@mas/base/common/json-schema";
import { toDisposable, type IDisposable } from "@mas/base/common/lifecycle";
import { LinkedList } from "@mas/base/common/linked-list";
import { validateConstraints, type TypeConstraint } from "@mas/base/common/types";
import { type ILocalizedString } from "@mas/core/action/common/actions";

export interface ICommandEvent {
    commandId: string;
    args: any[];
}

export interface ICommandHandler {
    (serviceAccessor: Container, ...args: any[]): void;
}

export interface ICommandMetadata {
    /**
     * NOTE: Please use an ILocalizedString. string is in the type for backcompat for now.
     * A short summary of what the command does. This will be used in:
     * - API commands
     * - when showing keybindings that have no other UX
     * - when searching for commands in the Command Palette
     */
    readonly description: ILocalizedString | string;
    readonly args?: ReadonlyArray<{
        readonly name: string;
        readonly isOptional?: boolean;
        readonly description?: string;
        readonly constraint?: TypeConstraint;
        readonly schema?: IJSONSchema;
    }>;
    readonly returns?: string;
}

export interface ICommand {
    id: string;
    handler: ICommandHandler;
    metadata?: ICommandMetadata | null;
}

export type ICommandsMap = Map<string, ICommand>;

export interface ICommandRegistry {
    onDidRegisterCommand: Event<string>;
    registerCommand(id: string, command: ICommandHandler): IDisposable;
    registerCommand(command: ICommand): IDisposable;
    registerCommandAlias(oldId: string, newId: string): IDisposable;
    getCommand(id: string): ICommand | undefined;
    getCommands(): ICommandsMap;
}

class CommandsRegistryImpl implements ICommandRegistry {
    private readonly _commands = new Map<string, LinkedList<ICommand>>();

    private readonly _onDidRegisterCommand = new Emitter<string>();
    readonly onDidRegisterCommand: Event<string> = this._onDidRegisterCommand.event;

    registerCommand(idOrCommand: string | ICommand, handler?: ICommandHandler): IDisposable {
        if (!idOrCommand) {
            throw new Error("invalid command");
        }

        if (typeof idOrCommand === "string") {
            if (!handler) {
                throw new Error("invalid command");
            }
            return this.registerCommand({ id: idOrCommand, handler });
        }

        // add argument validation if rich command metadata is provided
        if (idOrCommand.metadata && Array.isArray(idOrCommand.metadata.args)) {
            const constraints: Array<TypeConstraint | undefined> = [];
            for (const arg of idOrCommand.metadata.args) {
                constraints.push(arg.constraint);
            }
            const actualHandler = idOrCommand.handler;
            idOrCommand.handler = function (accessor, ...args: any[]) {
                validateConstraints(args, constraints);
                return actualHandler(accessor, ...args);
            };
        }

        // find a place to store the command
        const { id } = idOrCommand;

        let commands = this._commands.get(id);
        if (!commands) {
            commands = new LinkedList<ICommand>();
            this._commands.set(id, commands);
        }

        const removeFn = commands.unshift(idOrCommand);

        const ret = toDisposable(() => {
            removeFn();
            const command = this._commands.get(id);
            if (command?.isEmpty()) {
                this._commands.delete(id);
            }
        });

        // tell the world about this command
        this._onDidRegisterCommand.fire(id);

        return ret;
    }

    registerCommandAlias(oldId: string, newId: string): IDisposable {
        return CommandsRegistry.registerCommand(oldId, (serviceAccessor, ...args) =>
            serviceAccessor.get<ICommandService>(ICommandService).executeCommand(newId, ...args),
        );
    }

    getCommand(id: string): ICommand | undefined {
        const list = this._commands.get(id);
        if (!list || list.isEmpty()) {
            return undefined;
        }
        return Iterable.first(list);
    }

    getCommands(): ICommandsMap {
        const result = new Map<string, ICommand>();
        for (const key of this._commands.keys()) {
            const command = this.getCommand(key);
            if (command) {
                result.set(key, command);
            }
        }
        return result;
    }
}

const CommandsRegistry = new CommandsRegistryImpl();
export { CommandsRegistry };

export interface ICommandService {
    /**
     * An event is emitted when a command is about to be executed.
     *
     * It can be used to install or activate a command handler.
     */
    onWillExecuteCommand: Event<ICommandEvent>;

    /**
     * An event is emitted when a command was executed.
     */
    onDidExecuteCommand: Event<ICommandEvent>;

    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    executeCommand<T = any>(commandId: string, ...args: any[]): Promise<T | undefined>;
}
export const ICommandService = Symbol("ICommandService");
