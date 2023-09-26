/*
 * File: @mas/contribution/src/filter.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/25/2023 11:00 pm
 *
 * Last Modified: 09/25/2023 11:00 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */

export const Filter = Symbol("Filter");

/**
 * @param toTest Object that should be tested
 * @returns `true` if the object passes the test, `false` otherwise.
 */
export type Filter<T extends Object> = (toTest: T) => boolean;
