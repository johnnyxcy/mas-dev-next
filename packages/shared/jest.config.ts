/*
 * File: @mas/shared/jest.config.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/20/2023 04:44 pm
 *
 * Last Modified: 09/22/2023 02:35 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import extendJestConfig from "@mas/tools/jest/config.jest";

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default extendJestConfig({
    // !! Keep this update
    // A map from regular expressions to module names or to arrays of module
    // names that allow to stub out resources with a single module
    moduleNameMapper: {
        "^@mas/shared/(.*)$": "<rootDir>/src/$1",
    },
});
