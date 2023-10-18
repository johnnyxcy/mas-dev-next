/*
 * File: @mas/core/src/workbench/commands/common/command-service.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/18/2023 01:15 pm
 *
 * Last Modified: 10/18/2023 01:19 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { injectable } from "@mas/base/common/di";
import { Emitter, Event } from "@mas/base/common/event";
import { Disposable } from "@mas/base/common/lifecycle";
import { CommandsRegistry, ICommandEvent, ICommandService } from "@mas/core/platform/commands/common/commands";

@injectable()
export class CommandService extends Disposable implements ICommandService {
    private readonly _onWillExecuteCommand: Emitter<ICommandEvent> = this._register(new Emitter<ICommandEvent>());
    readonly onWillExecuteCommand: Event<ICommandEvent> = this._onWillExecuteCommand.event;

    private readonly _onDidExecuteCommand: Emitter<ICommandEvent> = new Emitter<ICommandEvent>();
    readonly onDidExecuteCommand: Event<ICommandEvent> = this._onDidExecuteCommand.event;

    constructor() {
        super();
        // this._extensionService
        //     .whenInstalledExtensionsRegistered()
        //     .then((value) => (this._extensionHostIsReady = value));
        // this._starActivation = null;
    }

    async executeCommand<T>(id: string, ...args: any[]): Promise<T> {
        this._logService.trace("CommandService#executeCommand", id);

        const activationEvent = `onCommand:${id}`;
        const commandIsRegistered = !!CommandsRegistry.getCommand(id);

        if (commandIsRegistered) {
            // if the activation event has already resolved (i.e. subsequent call),
            // we will execute the registered command immediately
            if (this._extensionService.activationEventIsDone(activationEvent)) {
                return this._tryExecuteCommand(id, args);
            }

            // if the extension host didn't start yet, we will execute the registered
            // command immediately and send an activation event, but not wait for it
            if (!this._extensionHostIsReady) {
                this._extensionService.activateByEvent(activationEvent); // intentionally not awaited
                return this._tryExecuteCommand(id, args);
            }

            // we will wait for a simple activation event (e.g. in case an extension wants to overwrite it)
            await this._extensionService.activateByEvent(activationEvent);
            return this._tryExecuteCommand(id, args);
        }

        // finally, if the command is not registered we will send a simple activation event
        // as well as a * activation event raced against registration and against 30s
        await Promise.all([
            this._extensionService.activateByEvent(activationEvent),
            Promise.race<any>([
                // race * activation against command registration
                this._activateStar(),
                Event.toPromise(Event.filter(CommandsRegistry.onDidRegisterCommand, (e) => e === id)),
            ]),
        ]);
        return this._tryExecuteCommand(id, args);
    }

    private _tryExecuteCommand(id: string, args: any[]): Promise<any> {
        const command = CommandsRegistry.getCommand(id);
        if (!command) {
            return Promise.reject(new Error(`command '${id}' not found`));
        }
        try {
            this._onWillExecuteCommand.fire({ commandId: id, args });
            const result = this._instantiationService.invokeFunction(command.handler, ...args);
            this._onDidExecuteCommand.fire({ commandId: id, args });
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
