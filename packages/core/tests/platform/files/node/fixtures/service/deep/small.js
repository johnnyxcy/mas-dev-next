/*
 * File: @mas/core/tests/platform/files/node/fixtures/service/deep/small.js
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 11/06/2023 04:24 pm
 *
 * Last Modified: 11/06/2023 04:24 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
"use strict";
var M;
(function (M) {
    var C = (function () {
        function C() {}
        return C;
    })();
    (function (x, property, number) {
        if (property === undefined) {
            property = w;
        }
        var local = 1;
        // unresolved symbol because x is local
        //self.x++;
        self.w--; // ok because w is a property
        property;
        f = function (y) {
            return y + x + local + w + self.w;
        };
        function sum(z) {
            return z + f(z) + w + self.w;
        }
    });
})(M || (M = {}));
var c = new M.C(12, 5);
