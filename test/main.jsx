let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-nav/index");
require("font-awesome-webpack");

ReactDom.render(
    <Com data={[
        {titleText: 2, child: ["a", "b"]},
        {titleText: 2},
        {titleText: 2, child: ["c", "d"]}
    ]}>
        <div>
            <div>aa</div>
            <div>bb</div>
        </div>
        <div>2</div>
        <div>
            <div>cc</div>
            <div>dd</div>
        </div>
    </Com>
    , document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

