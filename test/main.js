"use strict";

require("babel-polyfill");
var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-datepicker/index");

ReactDom.render(React.createElement(
    "div",
    null,
    React.createElement(Com, { type: "month", add: "1" })
), document.getElementById("test"));
