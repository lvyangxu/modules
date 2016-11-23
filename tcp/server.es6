let tcp = require("../karl-tcp-server/index");
require("babel-polyfill");
let tcp1 = new tcp({
    port: 4000,
    startCallback: () => {
        console.log("tcp server start");
    },
    errorCallback: d => {
        console.log("tcp error:" + d);
    },
    connectCallback: d => {
        let s = () => {
            tcp1.send(d, "haha");
            setTimeout(s, 5000);
        };
        s();

    }
});

tcp1.listen();





