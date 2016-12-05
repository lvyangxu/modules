let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-nav/index");
let Radio = require("../karl-component-radio");

ReactDom.render(
    <div>
        <Com data={[
            {text: 1, child: ["a", "b"]},
            {text: 2},
            {text: 3, child: ["c", "d"]}
        ]}>
            <div>
                <div>
                    <Radio data={[1, 2, 3]}/>
                </div>
                <div>bb</div>
            </div>
            <div>2</div>
            <div>
                <div>cc</div>
                <div>dd</div>
            </div>
        </Com>
    </div>
    , document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

let regex = new RegExp(/^-?(([1-9]{1}\d{0,14})|0)(.\d+)?$/g);
console.log(regex.test(1.2));
