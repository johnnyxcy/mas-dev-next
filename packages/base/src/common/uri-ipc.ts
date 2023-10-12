/*
 * File: @mas/base/src/common/uri-ipc.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/28/2023 08:48 am
 *
 * Last Modified: 10/11/2023 10:23 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BinaryBuffer } from "@mas/base/common/buffer";
import { MarshalledObject } from "@mas/base/common/marshalling";
import { MarshalledId } from "@mas/base/common/marshalling-ids";
import { URI, UriComponents } from "@mas/base/common/uri";

export interface IURITransformer {
    transformIncoming(uri: UriComponents): UriComponents;
    transformOutgoing(uri: UriComponents): UriComponents;
    transformOutgoingURI(uri: URI): URI;
    transformOutgoingScheme(scheme: string): string;
}

export interface UriParts {
    scheme: string;
    authority?: string;
    path?: string;
    query?: string;
    fragment?: string;
}

export interface IRawURITransformer {
    transformIncoming(uri: UriParts): UriParts;
    transformOutgoing(uri: UriParts): UriParts;
    transformOutgoingScheme(scheme: string): string;
}

function toJSON(uri: URI): UriComponents {
    return <UriComponents>(<any>uri.toJSON());
}

export class URITransformer implements IURITransformer {
    private readonly _uriTransformer: IRawURITransformer;

    constructor(uriTransformer: IRawURITransformer) {
        this._uriTransformer = uriTransformer;
    }

    transformIncoming(uri: UriComponents): UriComponents {
        const result = this._uriTransformer.transformIncoming(uri);
        return result === uri ? uri : toJSON(URI.from(result));
    }

    transformOutgoing(uri: UriComponents): UriComponents {
        const result = this._uriTransformer.transformOutgoing(uri);
        return result === uri ? uri : toJSON(URI.from(result));
    }

    transformOutgoingURI(uri: URI): URI {
        const result = this._uriTransformer.transformOutgoing(uri);
        return result === uri ? uri : URI.from(result);
    }

    transformOutgoingScheme(scheme: string): string {
        return this._uriTransformer.transformOutgoingScheme(scheme);
    }
}

export const DefaultURITransformer: IURITransformer = new (class {
    transformIncoming(uri: UriComponents) {
        return uri;
    }

    transformOutgoing(uri: UriComponents): UriComponents {
        return uri;
    }

    transformOutgoingURI(uri: URI): URI {
        return uri;
    }

    transformOutgoingScheme(scheme: string): string {
        return scheme;
    }
})();

function _transformOutgoingURIs(obj: any, transformer: IURITransformer, depth: number): any {
    if (!obj || depth > 200) {
        return null;
    }

    if (typeof obj === "object") {
        if (obj instanceof URI) {
            return transformer.transformOutgoing(obj);
        }

        // walk object (or array)
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const r = _transformOutgoingURIs(obj[key], transformer, depth + 1);
                if (r !== null) {
                    obj[key] = r;
                }
            }
        }
    }

    return null;
}

export function transformOutgoingURIs<T>(obj: T, transformer: IURITransformer): T {
    const result = _transformOutgoingURIs(obj, transformer, 0);
    if (result === null) {
        // no change
        return obj;
    }
    return result;
}

function _transformIncomingURIs(obj: any, transformer: IURITransformer, revive: boolean, depth: number): any {
    if (!obj || depth > 200) {
        return null;
    }

    if (typeof obj === "object") {
        if ((<MarshalledObject>obj).$mid === MarshalledId.Uri) {
            return revive ? URI.revive(transformer.transformIncoming(obj)) : transformer.transformIncoming(obj);
        }

        if (obj instanceof BinaryBuffer) {
            return null;
        }

        // walk object (or array)
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const r = _transformIncomingURIs(obj[key], transformer, revive, depth + 1);
                if (r !== null) {
                    obj[key] = r;
                }
            }
        }
    }

    return null;
}

export function transformIncomingURIs<T>(obj: T, transformer: IURITransformer): T {
    const result = _transformIncomingURIs(obj, transformer, false, 0);
    if (result === null) {
        // no change
        return obj;
    }
    return result;
}

export function transformAndReviveIncomingURIs<T>(obj: T, transformer: IURITransformer): T {
    const result = _transformIncomingURIs(obj, transformer, true, 0);
    if (result === null) {
        // no change
        return obj;
    }
    return result;
}
