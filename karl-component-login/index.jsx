import http from "karl-http";
import React from "react";
import css from "./index.css";

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            tips: "",
            loginRedirect: ""
        };
        let bindArr = ["getItemName", "submit", "usernameChange", "passwordChange"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentWillMount() {
        this.getItemName();
    }

    render() {
        return (
            <div className={css.base + " react-login"}>
                <div className={css.row}>
                    <input value={this.state.username} onChange={this.usernameChange} placeholder="username"
                           name="karl-username" type="text"/>
                </div>
                <div className={css.row}>
                    <input value={this.state.password} onChange={this.passwordChange} placeholder="password"
                           name="karl-password" type="password"/>
                </div>
                <div className={css.row}>
                    <button onClick={this.submit}>sign in</button>
                </div>
                <div className={css.row}>
                    <div className="tips">{this.state.tips}</div>
                </div>
            </div>
        );
    }

    /**
     * 从服务器获取本地存储账号和密码的变量名称
     */
    async getItemName() {
        try {
            let data = await http.post("../account/getItemName");
            let project = data.project;
            let item = localStorage.getItem(project);
            let json = {
                project: project,
                loginRedirect: data.loginRedirect
            };
            //如果localStorage存储了账号密码，则取历史记录
            if (item != null) {
                console.log(item);
                if (item.hasOwnProperty("username") && item.hasOwnProperty("password")) {
                    json.username = item.username;
                    json.password = item.password;
                }
            }
            this.setState(json);
        } catch (e) {
            this.setState({"tips": "an error occured:" + e});
        }
    }

    usernameChange(e) {
        let d = e.target.value;
        d = d.trim();
        this.setState({"username": d});
    }

    passwordChange(e) {
        let d = e.target.value;
        d = d.trim();
        this.setState({"password": d});
    }

    async submit() {
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        try {
            await http.post("../account/login", data);
            localStorage.setItem(this.state.project, data);
            window.location.href = "../" + this.state.loginRedirect + "/";
        } catch (e) {
            this.setState({"tips": e.message});
        }

    }
}

module.exports = login;