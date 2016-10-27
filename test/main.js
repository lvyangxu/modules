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
        React.createElement(
            "div",
            null,
            "1"
        ),
        React.createElement(
            "div",
            null,
            "2"
        )
    ),
    React.createElement(
        "div",
        { className: "b" },
        React.createElement(
            "div",
            null,
            "3"
        ),
        React.createElement(
            "div",
            null,
            "4"
        )
    ),
    React.createElement(
        "div",
        { className: "c" },
        "5"
    )
), document.getElementById("test"));

// ReactDom.render(<Select data={[{id:"a",name:"1",checked:true}]}/>,document.getElementById("test1"));

//# sourceMappingURL=main.js.map