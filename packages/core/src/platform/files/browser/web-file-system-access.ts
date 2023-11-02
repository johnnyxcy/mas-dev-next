/*
 * File: @mas/core/src/platform/files/browser/web-file-system-access.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/02/2023 03:53 pm
 *
 * Last Modified: 11/02/2023 04:18 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Typings for the https://wicg.github.io/file-system-access
 *
 * Use `supported(window)` to find out if the browser supports this kind of API.
 */
export namespace WebFileSystemAccess {
    export function supported(obj: any & Window): boolean {
        if (typeof obj?.showDirectoryPicker === "function") {
            return true;
        }

        return false;
    }

    export function isFileSystemHandle(handle: unknown): handle is FileSystemHandle {
        const candidate = handle as FileSystemHandle | undefined;
        if (!candidate) {
            return false;
        }

        return (
            typeof candidate.kind === "string" &&
            typeof candidate.queryPermission === "function" &&
            typeof candidate.requestPermission === "function"
        );
    }

    export function isFileSystemFileHandle(handle: FileSystemHandle): handle is FileSystemFileHandle {
        return handle.kind === "file";
    }

    export function isFileSystemDirectoryHandle(handle: FileSystemHandle): handle is FileSystemDirectoryHandle {
        return handle.kind === "directory";
    }
}
