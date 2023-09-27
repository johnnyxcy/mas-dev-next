/*
 * File: @mas/base/src/common/marshalling-ids.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 11:27 am
 *
 * Last Modified: 09/27/2023 11:28 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const enum MarshalledId {
    Uri = 1,
    Regexp,
    ScmResource,
    ScmResourceGroup,
    ScmProvider,
    CommentController,
    CommentThread,
    CommentThreadInstance,
    CommentThreadReply,
    CommentNode,
    CommentThreadNode,
    TimelineActionContext,
    NotebookCellActionContext,
    NotebookActionContext,
    TerminalContext,
    TestItemContext,
    Date,
    TestMessageMenuArgs,
}
