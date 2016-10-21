let $ = require("jquery");

class http {
    /**
     * do ajax with jquery
     * @param param ajax option
     * @returns {*|void}
     */
    static doAjaxInJquery(param) {
        let request = $.ajax({
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
    };

    /**
     * do http post with json contentType and dataType
     * @param url
     * @param data
     * @returns {Promise}
     */
    static post(url, data) {
        let promise = new Promise((resolve, reject)=> {
            data = (data == undefined) ? {} : data;
            http.doAjaxInJquery({
                url: url,
                data: data,
                contentType: "application/json",
                dataType: "json",
                successCallback: (d)=> {
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
                }, function (result) {
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
    static get(url, data) {
        let promise = new Promise((resolve, reject)=> {
            data = (data == undefined) ? {} : data;
            http.doAjaxInJquery({
                type: "get",
                url: url,
                data: data,
                contentType: "application/json",
                dataType: "json",
                successCallback: (d)=> {
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
                }, function (result) {
                    reject("http request error:" + result);
                }
            });
        });
        return promise;
    }
}

module.exports = http;