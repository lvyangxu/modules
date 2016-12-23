"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var date = function () {
    function date() {
        _classCallCheck(this, date);
    }

    _createClass(date, null, [{
        key: "isLeapYear",

        /**
         * 判断是否是闰年
         * @param year
         * @returns {boolean}
         */
        value: function isLeapYear(year) {
            if (year % 4 != 0) {
                return false;
            }
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }

        /**
         * 根据年和月获取当月的天数
         * @param year
         * @param month
         * @returns {number}
         */

    }, {
        key: "getDaysOfMonth",
        value: function getDaysOfMonth(year, month) {
            var days = 30;
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    days = 31;
                    break;
                case 2:
                    if (this.isLeapYear(year)) {
                        days = 29;
                    } else {
                        days = 28;
                    }
                    break;
            }
            return days;
        }

        /**
         * 根据年和月获取上个月的天数
         * @param year
         * @param month
         * @returns {number}
         */

    }, {
        key: "getDaysOfLastMonth",
        value: function getDaysOfLastMonth(year, month) {
            if (month == 1) {
                year--;
                month = 12;
            } else {
                year = year;
                month--;
            }
            var days = this.getDaysOfMonth(year, month);
            return days;
        }
    }]);

    return date;
}();

module.exports = date;
