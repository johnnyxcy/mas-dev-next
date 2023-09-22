/*
 * File: @mas/tools/jest/config.jest.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 04:57 pm
 *
 * Last Modified: 09/22/2023 02:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import { JestConfigWithTsJest } from "ts-jest";

export default function extendJestConfig(overrides: JestConfigWithTsJest): JestConfigWithTsJest {
    return {
        // transform: {
        //     "^.+\\.(ts|tsx)$": [
        //         "ts-jest",
        //         {
        //             tsconfig: "./tsconfig.json",
        //         },
        //     ],
        // },

        // The directory where Jest should store its cached dependency information
        cacheDirectory: ".jest/cache",

        // Automatically clear mock calls, instances, contexts and results before every test
        clearMocks: true,

        // Indicates whether the coverage information should be collected while executing the test
        collectCoverage: undefined,

        // An array of glob patterns indicating a set of files for which coverage information should be collected
        collectCoverageFrom: ["src/**/*.ts", "!src/**/__tests__/*.ts", "!src/**/*.d.ts", "!src/**/index.ts"],

        // The directory where Jest should output its coverage files
        coverageDirectory: ".jest/coverage",

        // An array of regexp pattern strings used to skip coverage collection
        coveragePathIgnorePatterns: ["/__tests__/", "/node_modules/"],

        // Indicates which provider should be used to instrument code for coverage
        // using istanbul to ignore coverage with setting coverageProvider to "babel"
        // /* istanbul ignore if */: ignore the next if statement.
        // /* istanbul ignore else */: ignore the else portion of an if statement.
        // /* istanbul ignore next */: ignore the next thing in the source-code ( functions, if statements, classes, you name it).
        // /* istanbul ignore file */: ignore an entire source-file (this should be placed at the top of the file).
        coverageProvider: "babel",

        // A list of reporter names that Jest uses when writing coverage reports
        // coverageReporters: [
        //   "json",
        //   "text",
        //   "lcov",
        //   "clover"
        // ],

        // A preset that is used as a base for Jest's configuration
        preset: "ts-jest",

        // The regexp pattern or array of patterns that Jest uses to detect test files
        // testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
        testRegex: "(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js|jsx)$",

        testPathIgnorePatterns: ["lib/*", "node_modules/*"],

        // Indicates whether each individual test should be reported during the run
        verbose: true,

        setupFilesAfterEnv: ["jest-expect-message"],

        ...overrides,
    };
}
