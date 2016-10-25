"use strict";

var React = require("react");
var ReactDom = require("react-dom");
var Radio = require("karl-component-radio");

ReactDom.render(React.createElement(Radio, { data: ["1", "2"] }), document.getElementById("test"));
ReactDom.render(React.createElement(Radio, { data: ["3", "4"] }), document.getElementById("test1"));

//# sourceMappingURL=main.js.map