"use strict";

var React = require("react");
var ReactDom = require("react-dom");
// let Radio = require("karl-component-radio");
// let Select = require("karl-component-select");
var Carousel = require("../karl-component-carousel/index");
require("font-awesome-webpack");

ReactDom.render(React.createElement(
    Carousel,
    { data: ["a", "b", "c"] },
    React.createElement(
        "div",
        { className: "a" },
        React.createElement("img", { style: { width: "100%" }, src: "1.png" })
    ),
    React.createElement(
        "div",
        { className: "b" },
        React.createElement("img", { style: { width: "100%" }, src: "2.png" })
    ),
    React.createElement(
        "div",
        { className: "c" },
        React.createElement("img", { style: { width: "100%" }, src: "3.png" })
    )
), document.getElementById("test"));

// ReactDom.render(<Select data={[{id:"a",name:"1",checked:true}]}/>,document.getElementById("test1"));

//# sourceMappingURL=main.js.map