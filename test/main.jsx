require("babel-polyfill");
let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-datepicker/index");


ReactDom.render(
    <div>
        <Com type="month" add="1"/>
    </div>
    , document.getElementById("test"));
