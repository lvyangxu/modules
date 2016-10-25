let React = require("react");
let ReactDom = require("react-dom");
let Radio = require("karl-component-radio");



ReactDom.render(<Radio data={["1","2"]}/>,document.getElementById("test"));
ReactDom.render(<Radio data={["3","4"]}/>,document.getElementById("test1"));

