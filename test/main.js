"use strict";

var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-nav/index");
var Radio = require("../karl-component-radio");

ReactDom.render(React.createElement(Com, { data: [{ id: "a", name: "gasga", group: "1", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: [1, 2, 3] })
        ) }, { id: "e", name: "sagas", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: [1, 2, 3] })
        ) }, { id: "b", name: "safas", group: "1", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: [4, 5, 6] })
        ) }, { id: "c", name: "gasgsa", group: "2", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: [7, 8] })
        ) }, { id: "d", name: "gas12rgsa", group: "2", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: ["a", "b"] })
        ) }, { id: "f", name: "sagas1", dom: React.createElement(
            "div",
            null,
            React.createElement(Radio, { data: [1, 2, 3] })
        ) }] }), document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

//# sourceMappingURL=main.js.map