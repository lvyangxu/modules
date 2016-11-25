"use strict";

var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-nav/index");
require("font-awesome-webpack");

ReactDom.render(React.createElement(
    Com,
    { data: [{ titleText: 2, child: ["a", "b"] }, { titleText: 2 }, { titleText: 2, child: ["c", "d"] }] },
    React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            null,
            "aa"
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
), document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

//# sourceMappingURL=main.js.map