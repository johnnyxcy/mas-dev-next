/*
 * File: @mas/contribution/src/common/contribution-provider.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 11:28 pm
 *
 * Last Modified: 09/26/2023 03:41 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { interfaces } from "inversify";

import { IContributionFilterRegistry } from "@mas/contribution/common/contribution-filter";

export const IContributionProvider = Symbol("IContributionProvider");

export interface IContributionProvider<T extends object> {
    /**
     * @param recursive `true` if the contributions should be collected from the parent containers as well. Otherwise, `false`. It is `false` by default.
     */
    getContributions(recursive?: boolean): T[];
}

class ContainerBasedContributionProvider<T extends object> implements IContributionProvider<T> {
    protected services: T[] | undefined;

    constructor(
        protected readonly serviceIdentifier: interfaces.ServiceIdentifier<T>,
        protected readonly container: interfaces.Container,
    ) {}

    getContributions(recursive?: boolean): T[] {
        if (this.services === undefined) {
            const currentServices: T[] = [];
            let filterRegistry: IContributionFilterRegistry | undefined;
            let currentContainer: interfaces.Container | null = this.container;
            while (currentContainer !== null) {
                if (currentContainer.isBound(this.serviceIdentifier)) {
                    try {
                        currentServices.push(...currentContainer.getAll(this.serviceIdentifier));
                    } catch (error) {
                        console.error(error);
                    }
                }
                if (filterRegistry === undefined && currentContainer.isBound(IContributionFilterRegistry)) {
                    filterRegistry = currentContainer.get(IContributionFilterRegistry);
                }
                currentContainer = recursive === true ? currentContainer.parent : null;
            }

            this.services = filterRegistry
                ? filterRegistry.applyFilters(currentServices, this.serviceIdentifier)
                : currentServices;
        }
        return this.services;
    }
}

export type Bindable = interfaces.Bind | interfaces.Container;
export namespace Bindable {
    export function isContainer(arg: Bindable): arg is interfaces.Container {
        return (
            typeof arg !== "function" &&
            // https://github.com/eclipse-theia/theia/issues/3204#issue-371029654
            // In InversifyJS `4.14.0` containers no longer have a property `guid`.
            ("guid" in arg || "parent" in arg)
        );
    }
}

export function bindContributionProvider(bindable: Bindable, id: symbol): void {
    const bindingToSyntax = Bindable.isContainer(bindable)
        ? bindable.bind(IContributionProvider)
        : bindable(IContributionProvider);
    bindingToSyntax
        .toDynamicValue((ctx) => new ContainerBasedContributionProvider(id, ctx.container))
        .inSingletonScope()
        .whenTargetNamed(id);
}

/**
 * Helper function to bind a service to a list of contributions easily.
 * @param bindable a Container or the bind function directly.
 * @param service an already bound service to refer the contributions to.
 * @param contributions array of contribution identifiers to bind the service to.
 */
export function bindContribution(
    bindable: Bindable,
    service: interfaces.ServiceIdentifier<any>,
    contributions: interfaces.ServiceIdentifier<any>[],
): void {
    const bind: interfaces.Bind = Bindable.isContainer(bindable) ? bindable.bind.bind(bindable) : bindable;
    for (const contribution of contributions) {
        bind(contribution).toService(service);
    }
}
