"use strict";

require("babel-polyfill");
var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-table/index");

ReactDom.render(React.createElement(
    "div",
    null,
    React.createElement(Com, { project: "G02DataAnalysis", tableId: "create_data", sectionStyle: { padding: "50px" } })
), document.getElementById("display"));
