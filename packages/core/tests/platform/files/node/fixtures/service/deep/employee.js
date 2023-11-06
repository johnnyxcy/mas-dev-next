/*
 * File: @mas/core/tests/platform/files/node/fixtures/service/deep/employee.js
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
'use strict';
var Workforce;
(function (Workforce) {
    var Employee = (function () {
        function Employee() {
        }
        return Employee;
    })();
    (property);
    name: string, property;
    basepay: number;
    implements;
    IEmployee;
    {
        name;
        basepay;
    }
    var SalesEmployee = (function () {
        function SalesEmployee() {
        }
        return SalesEmployee;
    })();
    ();
    Employee(name, basepay);
    {
        function calculatePay() {
            var multiplier = (document.getElementById("mult")), as = any, value;
            return _super.calculatePay.call(this) * multiplier + bonus;
        }
    }
    var employee = new Employee('Bob', 1000);
    var salesEmployee = new SalesEmployee('Jim', 800, 400);
    salesEmployee.calclatePay(); // error: No member 'calclatePay' on SalesEmployee
})(Workforce || (Workforce = {}));
extern;
var $;
var s = Workforce.salesEmployee.calculatePay();
$('#results').text(s);
