/*
 * File: @mas/base/src/common/linked-text.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 05:07 pm
 *
 * Last Modified: 09/27/2023 05:07 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { memoize } from "@mas/base/common/decorators";

export interface ILink {
    readonly label: string;
    readonly href: string;
    readonly title?: string;
}

export type LinkedTextNode = string | ILink;

export class LinkedText {
    constructor(readonly nodes: LinkedTextNode[]) {}

    @memoize
    toString(): string {
        return this.nodes.map((node) => (typeof node === "string" ? node : node.label)).join("");
    }
}

const LINK_REGEX = /\[([^\]]+)\]\(((?:https?:\/\/|command:|file:)[^\)\s]+)(?: (["'])(.+?)(\3))?\)/gi;

export function parseLinkedText(text: string): LinkedText {
    const result: LinkedTextNode[] = [];

    let index = 0;
    let match: RegExpExecArray | null;

    while ((match = LINK_REGEX.exec(text))) {
        if (match.index - index > 0) {
            result.push(text.substring(index, match.index));
        }

        const [, label, href, , title] = match;

        if (title) {
            result.push({ label, href, title });
        } else {
            result.push({ label, href });
        }

        index = match.index + match[0].length;
    }

    if (index < text.length) {
        result.push(text.substring(index));
    }

    return new LinkedText(result);
}