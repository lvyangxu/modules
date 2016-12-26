require("babel-polyfill");
let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-table/index");


ReactDom.render(
    <div>
        <Com project="G02DataAnalysis" tableId="create_data" sectionStyle={{padding: "50px"}}/>
    </div>
    , document.getElementById("display"));


