/*
 * File: @mas/core/src/parts/request/browser/request.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/25/2023 01:54 pm
 *
 * Last Modified: 10/25/2023 01:58 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BinaryBuffer, bufferToStream } from "@mas/base/common/buffer";
import { CancellationToken } from "@mas/base/common/cancellation";
import { canceled } from "@mas/base/common/errors";
import { IRequestContext, IRequestOptions, OfflineError } from "@mas/core/parts/request/common/request";

export function request(options: IRequestOptions, token: CancellationToken): Promise<IRequestContext> {
    if (options.proxyAuthorization) {
        options.headers = {
            ...(options.headers || {}),
            "Proxy-Authorization": options.proxyAuthorization,
        };
    }

    const xhr = new XMLHttpRequest();
    return new Promise<IRequestContext>((resolve, reject) => {
        xhr.open(options.type || "GET", options.url || "", true, options.user, options.password);
        setRequestHeaders(xhr, options);

        xhr.responseType = "arraybuffer";
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        xhr.onerror = (e) =>
            reject(
                navigator.onLine
                    ? new Error((xhr.statusText && "XHR failed: " + xhr.statusText) || "XHR failed")
                    : new OfflineError(),
            );
        xhr.addEventListener("load", (e) => {
            resolve({
                res: {
                    statusCode: xhr.status,
                    headers: getResponseHeaders(xhr),
                },
                stream: bufferToStream(BinaryBuffer.wrap(new Uint8Array(xhr.response))),
            });
        });
        xhr.ontimeout = (e) => reject(new Error(`XHR timeout: ${options.timeout}ms`));

        if (options.timeout) {
            xhr.timeout = options.timeout;
        }

        xhr.send(options.data);

        // cancel
        token.onCancellationRequested(() => {
            xhr.abort();
            reject(canceled());
        });
    });
}

function setRequestHeaders(xhr: XMLHttpRequest, options: IRequestOptions): void {
    if (options.headers) {
        /* eslint-disable no-labels */
        outer: for (const k in options.headers) {
            switch (k) {
                case "User-Agent":
                case "Accept-Encoding":
                case "Content-Length":
                    // unsafe headers
                    continue outer;
            }
            xhr.setRequestHeader(k, options.headers[k]);
        }
    }
}

function getResponseHeaders(xhr: XMLHttpRequest): { [name: string]: string } {
    const headers: { [name: string]: string } = Object.create(null);
    for (const line of xhr.getAllResponseHeaders().split(/\r\n|\n|\r/g)) {
        if (line) {
            const idx = line.indexOf(":");
            headers[line.substr(0, idx).trim().toLowerCase()] = line.substr(idx + 1).trim();
        }
    }
    return headers;
}
