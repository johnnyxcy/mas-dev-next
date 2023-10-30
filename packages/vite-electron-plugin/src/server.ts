/*
 * File: vite-electron-plugin/src/server.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 02:55 pm
 *
 * Last Modified: 10/30/2023 03:16 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import { AddressInfo } from "node:net";
import { ViteDevServer } from "vite";

import { resolveHostname } from "@mas/vite-electron-plugin/host";

export function resolveServerUrl(server: ViteDevServer): string | void {
    const addressInfo = server.httpServer!.address();
    const isAddressInfo = (x: any): x is AddressInfo => x?.address;

    if (isAddressInfo(addressInfo)) {
        const { address, port } = addressInfo;
        const hostname = resolveHostname(address);

        const options = server.config.server;
        const protocol = options.https ? "https" : "http";
        const devBase = server.config.base;

        const path = typeof options.open === "string" ? options.open : devBase;
        const url = path.startsWith("http") ? path : `${protocol}://${hostname}:${port}${path}`;

        return url;
    }
}
