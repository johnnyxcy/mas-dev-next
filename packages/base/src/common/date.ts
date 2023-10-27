/*
 * File: @mas/base/src/common/date.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/27/2023 10:47 am
 *
 * Last Modified: 10/27/2023 02:47 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import nls from "@mas/i18n";

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

/**
 * Create a nls.localized difference of the time between now and the specified date.
 * @param date The date to generate the difference from.
 * @param appendAgoLabel Whether to append the " ago" to the end.
 * @param useFullTimeWords Whether to use full words (eg. seconds) instead of
 * shortened (eg. secs).
 * @param disallowNow Whether to disallow the string "now" when the difference
 * is less than 30 seconds.
 */
export function fromNow(
    date: number | Date,
    appendAgoLabel?: boolean,
    useFullTimeWords?: boolean,
    disallowNow?: boolean,
): string {
    if (typeof date !== "number") {
        date = date.getTime();
    }

    const seconds = Math.round((new Date().getTime() - date) / 1000);
    if (seconds < -30) {
        return nls.localizeByDefault("in {0}", fromNow(new Date().getTime() + seconds * 1000, false));
    }

    if (!disallowNow && seconds < 30) {
        return nls.localizeByDefault("now");
    }

    let value: number;
    if (seconds < minute) {
        value = seconds;

        if (appendAgoLabel) {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} second ago", value)
                    : nls.localizeByDefault("{0} sec ago", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} seconds ago", value)
                    : nls.localizeByDefault("{0} secs ago", value);
            }
        } else {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} second", value)
                    : nls.localizeByDefault("{0} sec", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} seconds", value)
                    : nls.localizeByDefault("{0} secs", value);
            }
        }
    }

    if (seconds < hour) {
        value = Math.floor(seconds / minute);
        if (appendAgoLabel) {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} minute ago", value)
                    : nls.localizeByDefault("{0} min ago", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} minutes ago", value)
                    : nls.localizeByDefault("{0} mins ago", value);
            }
        } else {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} minute", value)
                    : nls.localizeByDefault("{0} min", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} minutes", value)
                    : nls.localizeByDefault("{0} mins", value);
            }
        }
    }

    if (seconds < day) {
        value = Math.floor(seconds / hour);
        if (appendAgoLabel) {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} hour ago", value)
                    : nls.localizeByDefault("{0} hr ago", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} hours ago", value)
                    : nls.localizeByDefault("{0} hrs ago", value);
            }
        } else {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} hour", value)
                    : nls.localizeByDefault("{0} hr", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} hours", value)
                    : nls.localizeByDefault("{0} hrs", value);
            }
        }
    }

    if (seconds < week) {
        value = Math.floor(seconds / day);
        if (appendAgoLabel) {
            return value === 1
                ? nls.localizeByDefault("{0} day ago", value)
                : nls.localizeByDefault("{0} days ago", value);
        } else {
            return value === 1 ? nls.localizeByDefault("{0} day", value) : nls.localizeByDefault("{0} days", value);
        }
    }

    if (seconds < month) {
        value = Math.floor(seconds / week);
        if (appendAgoLabel) {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} week ago", value)
                    : nls.localizeByDefault("{0} wk ago", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} weeks ago", value)
                    : nls.localizeByDefault("{0} wks ago", value);
            }
        } else {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} week", value)
                    : nls.localizeByDefault("{0} wk", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} weeks", value)
                    : nls.localizeByDefault("{0} wks", value);
            }
        }
    }

    if (seconds < year) {
        value = Math.floor(seconds / month);
        if (appendAgoLabel) {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} month ago", value)
                    : nls.localizeByDefault("{0} mo ago", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} months ago", value)
                    : nls.localizeByDefault("{0} mos ago", value);
            }
        } else {
            if (value === 1) {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} month", value)
                    : nls.localizeByDefault("{0} mo", value);
            } else {
                return useFullTimeWords
                    ? nls.localizeByDefault("{0} months", value)
                    : nls.localizeByDefault("{0} mos", value);
            }
        }
    }

    value = Math.floor(seconds / year);
    if (appendAgoLabel) {
        if (value === 1) {
            return useFullTimeWords
                ? nls.localizeByDefault("{0} year ago", value)
                : nls.localizeByDefault("{0} yr ago", value);
        } else {
            return useFullTimeWords
                ? nls.localizeByDefault("{0} years ago", value)
                : nls.localizeByDefault("{0} yrs ago", value);
        }
    } else {
        if (value === 1) {
            return useFullTimeWords
                ? nls.localizeByDefault("{0} year", value)
                : nls.localizeByDefault("{0} yr", value);
        } else {
            return useFullTimeWords
                ? nls.localizeByDefault("{0} years", value)
                : nls.localizeByDefault("{0} yrs", value);
        }
    }
}

export function toLocalISOString(date: Date): string {
    return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        "T" +
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ":" +
        String(date.getSeconds()).padStart(2, "0") +
        "." +
        (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        "Z"
    );
}
