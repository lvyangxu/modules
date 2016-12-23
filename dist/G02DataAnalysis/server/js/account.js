let response = require("./response");
module.exports = {
    getItemName: (req, res) => {
        response.success(res, {
            project: global.accountConfig.project,
            loginRedirect: global.accountConfig.loginRedirect
        });
    },
    login: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (username == global.accountConfig.username && password == global.accountConfig.password) {
            //set session
            req.session.username = username;
            response.success(res);
        } else {
            response.fail(res, "invalid username or password");
        }
    },
    logout: () => {

    },
    relogin: (req, res) => {
        let [username, password] = ["username", "password"].map(d => {
            d = req.cookies[global.accountConfig[d + "Cookie"]];
            return d;
        });
        if (username == global.accountConfig.username && password == global.accountConfig.password) {
            //set session
            req.session.username = global.accountConfig.username;
            return true;
        } else {
            return false;
        }
    }
};