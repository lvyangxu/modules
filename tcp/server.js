"use strict";

var tcp = require("../karl-tcp-server/index");
require("babel-polyfill");
var tcp1 = new tcp({
    port: 4000,
    startCallback: function startCallback() {
        console.log("tcp server start");
    },
    errorCallback: function errorCallback(d) {
        console.log("tcp error:" + d);
    },
    connectCallback: function connectCallback(d) {
        var s = function s() {
            tcp1.send(d, "haha");
            setTimeout(s, 5000);
        };
        s();
    }
});

tcp1.listen();

//# sourceMappingURL=server.js.map