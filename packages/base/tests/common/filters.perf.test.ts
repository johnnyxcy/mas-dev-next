/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, it } from "vitest";

import * as filters from "@mas/base/common/filters";

const patterns = ["cci", "ida", "pos", "CCI", "enbled", "callback", "gGame", "cons", "zyx", "aBc"];

describe.skipIf(!process.env.TEST_PERF)("Performance - fuzzyMatch", async function () {
    const { data } = await import("./fixtures/filters.perf.data");
    // suiteSetup(() => console.profile());
    // suiteTeardown(() => console.profileEnd());

    console.log(
        `Matching ${data.length} items against ${patterns.length} patterns (${
            data.length * patterns.length
        } operations) `,
    );

    function test(name: string, match: filters.FuzzyScorer) {
        it(name, () => {
            const t1 = Date.now();
            let count = 0;
            for (let i = 0; i < 2; i++) {
                for (const pattern of patterns) {
                    const patternLow = pattern.toLowerCase();
                    for (const item of data) {
                        count += 1;
                        match(pattern, patternLow, 0, item, item.toLowerCase(), 0);
                    }
                }
            }
            const d = Date.now() - t1;
            console.log(name, `${d}ms, ${Math.round(count / d) * 15}/15ms, ${Math.round(count / d)}/1ms`);
        });
    }

    test("fuzzyScore", filters.fuzzyScore);
    test("fuzzyScoreGraceful", filters.fuzzyScoreGraceful);
    test("fuzzyScoreGracefulAggressive", filters.fuzzyScoreGracefulAggressive);
});

describe.skipIf(!process.env.TEST_PERF)("Performance - IFilter", async function () {
    const { data } = await import("./fixtures/filters.perf.data");

    function test(name: string, match: filters.IFilter) {
        it(name, () => {
            const t1 = Date.now();
            let count = 0;
            for (let i = 0; i < 2; i++) {
                for (const pattern of patterns) {
                    for (const item of data) {
                        count += 1;
                        match(pattern, item);
                    }
                }
            }
            const d = Date.now() - t1;
            console.log(name, `${d}ms, ${Math.round(count / d) * 15}/15ms, ${Math.round(count / d)}/1ms`);
        });
    }

    test("matchesFuzzy", filters.matchesFuzzy);
    test("matchesFuzzy2", filters.matchesFuzzy2);
    test("matchesPrefix", filters.matchesPrefix);
    test("matchesContiguousSubString", filters.matchesContiguousSubString);
    test("matchesCamelCase", filters.matchesCamelCase);
});
