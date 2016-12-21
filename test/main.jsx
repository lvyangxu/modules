let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-nav/index.jsx");

ReactDom.render(
    <div>
        <Com data={[
            {id: "online", name: "在线人数", group: "服务器信息", dom: <div className="page-section"></div>},
            {id: "daily-new", name: "日新增", group: "服务器信息", dom: <div></div>},
            {id: "daily-active", name: "日活跃", group: "服务器信息", dom: <div></div>},
            {id: "daily-charge", name: "流水", group: "服务器信息", dom: <div></div>},
            {id: "weekly-monthly-new", name: "周月新增", group: "服务器信息", dom: <div></div>},
            {id: "charge-query", name: "充值流水", group: "日志查询", dom: <div></div>},
            {id: "cost-query", name: "消耗流水", group: "日志查询", dom: <div></div>},
            {id: "stamina-query", name: "体力购买流水", group: "日志查询", dom: <div></div>},
            {id: "server_total", name: "产出流水", group: "日志查询", dom: <div></div>},
            {id: "server_total", name: "留存", group: "用户分析", dom: <div></div>},
            {id: "server_total", name: "LTV", group: "用户分析", dom: <div></div>},
            {id: "server_total", name: "等级分布", group: "用户分析", dom: <div></div>},
            {id: "server_total", name: "当前钻石持有排名", group: "快照查询", dom: <div></div>},
            {id: "server_total", name: "角色汇总表", group: "快照查询", dom: <div></div>},
            {id: "server_total", name: "账号汇总表", group: "快照查询", dom: <div></div>},
            {id: "server_total", name: "设备汇总表", group: "快照查询", dom: <div></div>},
            {id: "server_total", name: "当日充值排名", group: "排名相关", dom: <div></div>}
        ]}/>
    </div>
    , document.getElementById("test"));

//autoprefixer babel-cli babel-core babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals babel-polyfill babel-preset-es2015 babel-preset-react css-loader del file-loader font-awesome-webpack gulp gulp-clean-css gulp-concat-css gulp-css-url-rebase gulp-htmlmin gulp-postcss gulp-rename gulp-replace gulp-uglify gulp-util jquery karl-component-nav karl-component-radio karl-component-select karl-date karl-extend karl-http less node-sass postcss postcss-loader react react-addons-css-transition-group react-addons-transition-group react-dom sass-loader style-loader url-loader webpack webpack-stream xml2js

