/*
 * File: @mas/base/src/common/network.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 02:39 pm
 *
 * Last Modified: 09/27/2023 03:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export namespace Schemas {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */
    export const inMemory = "inmemory";

    /**
     * A schema that is used for setting files
     */
    export const vscode = "vscode";

    /**
     * A schema that is used for internal private files
     */
    export const internal = "private";

    /**
     * A walk-through document.
     */
    export const walkThrough = "walkThrough";

    /**
     * An embedded code snippet.
     */
    export const walkThroughSnippet = "walkThroughSnippet";

    export const http = "http";

    export const https = "https";

    export const file = "file";

    export const mailto = "mailto";

    export const untitled = "untitled";

    export const data = "data";

    export const command = "command";

    export const vscodeRemote = "vscode-remote";

    export const vscodeRemoteResource = "vscode-remote-resource";

    export const vscodeManagedRemoteResource = "vscode-managed-remote-resource";

    export const vscodeUserData = "vscode-userdata";

    export const vscodeCustomEditor = "vscode-custom-editor";

    export const vscodeNotebookCell = "vscode-notebook-cell";
    export const vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata";
    export const vscodeNotebookCellOutput = "vscode-notebook-cell-output";
    export const vscodeInteractiveInput = "vscode-interactive-input";

    export const vscodeSettings = "vscode-settings";

    export const vscodeWorkspaceTrust = "vscode-workspace-trust";

    export const vscodeTerminal = "vscode-terminal";

    export const vscodeChatSesssion = "vscode-chat-editor";

    /**
     * Scheme used internally for webviews that aren't linked to a resource (i.e. not custom editors)
     */
    export const webviewPanel = "webview-panel";

    /**
     * Scheme used for loading the wrapper html and script in webviews.
     */
    export const vscodeWebview = "vscode-webview";

    /**
     * Scheme used for extension pages
     */
    export const extension = "extension";

    /**
     * Scheme used as a replacement of `file` scheme to load
     * files with our custom protocol handler (desktop only).
     */
    export const vscodeFileResource = "vscode-file";

    /**
     * Scheme used for temporary resources
     */
    export const tmp = "tmp";

    /**
     * Scheme used vs live share
     */
    export const vsls = "vsls";

    /**
     * Scheme used for the Source Control commit input's text document
     */
    export const vscodeSourceControl = "vscode-scm";
}
