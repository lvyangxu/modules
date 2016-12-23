"use strict";

var React = require("react");
var ReactDom = require("react-dom");
var Login = require("../../util/login.jsx");

ReactDom.render(React.createElement(Login, null), document.getElementById("login"));
