/*
 * File: @mas/tools/src/vite-electron-plugin/electron-env.d.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/30/2023 03:09 pm
 *
 * Last Modified: 10/30/2023 03:09 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "test" | "production";
        readonly VITE_DEV_SERVER_URL: string;
    }

    interface Process {
        electronApp: import("node:child_process").ChildProcess;
    }
}

interface ImportMeta {
    /** shims Vite */
    env: Record<string, any>;
}
