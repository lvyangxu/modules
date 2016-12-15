let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-datepicker/index");
let Radio = require("../karl-component-radio");

ReactDom.render(
    <Com data={[
        {id: "a", name: "gasga", group: "1", dom: <div><Radio data={[1, 2, 3]}/></div>},
        {id: "e", name: "sagas", dom: <div><Radio data={[1, 2, 3]}/></div>},
        {id: "b", name: "safas", group: "1", dom: <div><Radio data={[4, 5, 6]}/></div>},
        {id: "c", name: "gasgsa", group: "2", dom: <div><Radio data={[7, 8]}/></div>},
        {id: "d", name: "gas12rgsa", group: "2", dom: <div><Radio data={["a","b"]}/></div>},
        {id: "f", name: "sagas1", dom: <div><Radio data={[1, 2, 3]}/></div>}
    ]}/>
    , document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

