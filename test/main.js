"use strict";

var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-nav/index");
var Radio = require("../karl-component-radio");

ReactDom.render(React.createElement(
    "div",
    null,
    React.createElement(
        Com,
        { data: [{ text: 1, child: ["a", "b"] }, { text: 2 }, { text: 3, child: ["c", "d"] }] },
        React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                React.createElement(Radio, { data: [1, 2, 3] })
            ),
            React.createElement(
                "div",
                null,
                "bb"
            )
        ),
        React.createElement(
            "div",
            null,
            "2"
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                "cc"
            ),
            React.createElement(
                "div",
                null,
                "dd"
            )
        )
    )
), document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

var regex = new RegExp(/^-?(([1-9]{1}\d{0,14})|0)(.\d+)?$/g);
console.log(regex.test(1.2));

//# sourceMappingURL=main.js.map