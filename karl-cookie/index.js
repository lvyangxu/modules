"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("karl-extend");

var cookie = function () {
    function cookie() {
        _classCallCheck(this, cookie);
    }

    _createClass(cookie, null, [{
        key: "get",


        /**
         * get cookie
         * @param cookieName
         * @returns {string}
         */
        value: function get(cookieName) {
            var result = "";
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(cookieName + "=");
                if (c_start != -1) {
                    c_start = c_start + cookieName.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    result = document.cookie.substring(c_start, c_end).urlBase64Decode();
                }
            }
            return result;
        }

        /**
         * set cookie
         * @param cookieName
         * @param cookieValue
         * @param expiredays
         */

    }, {
        key: "set",
        value: function set(cookieName, cookieValue, expiredays) {
            var exdate = new Date();
            cookieValue = cookieValue.base64UrlEncode();
            exdate.setDate(exdate.getDate() + expiredays);
            var exdateStr = expiredays == null ? "" : ";expires=" + exdate.toGMTString();
            document.cookie = cookieName + "=" + cookieValue + exdateStr + ";path=/";
        }
    }]);

    return cookie;
}();

module.exports = cookie;

//# sourceMappingURL=index.js.map