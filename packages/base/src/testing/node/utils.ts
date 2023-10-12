/*
 * File: @mas/base/src/testing/node/utils.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 10/12/2023 10:52 am
 *
 * Last Modified: 10/12/2023 10:59 am
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

import { randomPath } from "@mas/base/common/extpath";
import { join } from "@mas/base/common/path";

import * as testUtils from "@mas/base/testing/common/utils";

export function getRandomTestPath(tmpdir: string, ...segments: string[]): string {
    return randomPath(join(tmpdir, ...segments));
}

export import flakySuite = testUtils.flakySuite;
