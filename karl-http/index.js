"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = require("jquery");

var http = function () {
    function http() {
        _classCallCheck(this, http);
    }

    _createClass(http, null, [{
        key: "doAjaxInJquery",

        /**
         * do ajax with jquery
         * @param param ajax option
         * @returns {*|void}
         */
        value: function doAjaxInJquery(param) {
            var request = $.ajax({
                type: param.type || "post",
                url: param.url,
                cache: false,
                timeout: (param.requestTimeOutSecond || 30) * 1000,
                data: param.data,
                contentType: param.contentType || "application/x-www-form-urlencoded;charset=utf-8",
                dataType: param.dataType || "text"
            }).done(function (data) {
                param.successCallback(data);
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                param.failureCallback(textStatus);
            });
            return request;
        }
    }, {
        key: "post",


        /**
         * do http post with json contentType and dataType
         * @param url
         * @param data
         * @returns {Promise}
         */
        value: function post(url, data) {
            var promise = new Promise(function (resolve, reject) {
                data = data == undefined ? {} : data;
                http.doAjaxInJquery({
                    url: url,
                    data: data,
                    contentType: "application/json",
                    dataType: "json",
                    successCallback: function successCallback(d) {
                        if (d.success == undefined || d.message == undefined) {
                            reject("unexpected json:" + d);
                            return;
                        }
                        if (d.success == "true") {
                            resolve(d.message);
                        } else {
                            if (d.message == "unauthorized") {
                                window.location.href = "../login/";
                                return;
                            }
                            reject(d.message);
                        }
                    }, function: function _function(result) {
                        reject("http request error:" + result);
                    }
                });
            });
            return promise;
        }

        /**
         * do http get with json contentType and dataType
         * @param url
         * @param data
         * @returns {Promise}
         */

    }, {
        key: "get",
        value: function get(url, data) {
            var promise = new Promise(function (resolve, reject) {
                data = data == undefined ? {} : data;
                http.doAjaxInJquery({
                    type: "get",
                    url: url,
                    data: data,
                    contentType: "application/json",
                    dataType: "json",
                    successCallback: function successCallback(d) {
                        if (d.success == undefined || d.message == undefined) {
                            reject("unexpected json:" + d);
                            return;
                        }
                        if (d.success == "true") {
                            resolve(d.message);
                        } else {
                            if (d.message == "unauthorized") {
                                window.location.href = "../login/";
                                return;
                            }
                            reject(d.message);
                        }
                    }, function: function _function(result) {
                        reject("http request error:" + result);
                    }
                });
            });
            return promise;
        }
    }]);

    return http;
}();

module.exports = http;

//# sourceMappingURL=index.js.map