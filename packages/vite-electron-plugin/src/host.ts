/*
 * File: @mas/tools/src/vite-electron-plugin/host.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 02:54 pm
 *
 * Last Modified: 10/30/2023 02:55 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/**
 * @see https://github.com/vitejs/vite/blob/v4.0.1/packages/vite/src/node/constants.ts#L137-L147
 */
export function resolveHostname(hostname: string) {
    const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1", "0000:0000:0000:0000:0000:0000:0000:0001"]);
    const wildcardHosts = new Set(["0.0.0.0", "::", "0000:0000:0000:0000:0000:0000:0000:0000"]);

    return loopbackHosts.has(hostname) || wildcardHosts.has(hostname) ? "localhost" : hostname;
}
