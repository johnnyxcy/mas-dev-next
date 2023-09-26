/*
 * File: @mas/contribution/src/common/contribution-filter-registry.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 11:26 pm
 *
 * Last Modified: 09/26/2023 03:41 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
// *****************************************************************************
// Copyright (C) 2021 STMicroelectronics and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { injectable, multiInject, optional } from "inversify";

import {
    ContributionType,
    IContributionFilterRegistry,
    IFilterContribution,
} from "@mas/contribution/common/contribution-filter";
import { Filter } from "@mas/contribution/common/filter";

/**
 * Registry of contribution filters.
 *
 * Implement/bind to the `FilterContribution` interface/symbol to register your contribution filters.
 */
@injectable()
export class ContributionFilterRegistryImpl implements IContributionFilterRegistry {
    protected initialized = false;
    protected genericFilters: Filter<Object>[] = [];
    protected typeToFilters = new Map<ContributionType, Filter<Object>[]>();

    constructor(@multiInject(IFilterContribution) @optional() contributions: IFilterContribution[] = []) {
        for (const contribution of contributions) {
            contribution.registerContributionFilters(this);
        }
        this.initialized = true;
    }

    addFilters(types: "*" | ContributionType[], filters: Filter<Object>[]): void {
        if (this.initialized) {
            throw new Error("cannot add filters after initialization is done.");
        } else if (types === "*") {
            this.genericFilters.push(...filters);
        } else {
            for (const type of types) {
                this.getOrCreate(type).push(...filters);
            }
        }
    }

    applyFilters<T extends Object>(toFilter: T[], type: ContributionType): T[] {
        const filters = this.getFilters(type);
        if (filters.length === 0) {
            return toFilter;
        }
        return toFilter.filter((object) => filters.every((filter) => filter(object)));
    }

    protected getOrCreate(type: ContributionType): Filter<Object>[] {
        let value = this.typeToFilters.get(type);
        if (value === undefined) {
            this.typeToFilters.set(type, (value = []));
        }
        return value;
    }

    protected getFilters(type: ContributionType): Filter<Object>[] {
        return [...(this.typeToFilters.get(type) || []), ...this.genericFilters];
    }
}
