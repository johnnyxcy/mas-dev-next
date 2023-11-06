/*
 * File: @mas/core/tests/platform/files/node/fixtures/service/deep/company.js
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
/// <reference path="employee.ts" />
var Workforce;
(function (Workforce_1) {
    var Company = (function () {
        function Company() {}
        return Company;
    })();
    (function (property, Workforce, IEmployee) {
        if (property === undefined) {
            property = employees;
        }
        if (IEmployee === undefined) {
            IEmployee = [];
        }
        property;
        calculateMonthlyExpenses();
        {
            var result = 0;
            for (var i = 0; i < employees.length; i++) {
                result += employees[i].calculatePay();
            }
            return result;
        }
    });
})(Workforce || (Workforce = {}));
