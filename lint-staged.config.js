/*
 * File: mas-dev\lint-staged.config.js
 *
 * Author: 许翀轶 <chongyi.xu@drugchina.net>
 *
 * File Created: 11/08/2022 10:01 am
 *
 * Last Modified: 11/08/2022 10:07 am
 *
 * Modified By: 许翀轶 <chongyi.xu@drugchina.net>
 *
 * Copyright (c) 2022 MaS Dev Team
 */
module.exports = {
    "*": (files) => {
        const joined = files.join(",");
        console.info(joined);
        return [`nx affected:lint --files=${joined}`];
    }
};
