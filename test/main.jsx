let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-chart/index.jsx");

ReactDom.render(
    <div>
        <Com title="chart" yAxisText="kg" x="date"
             y={[
                 {id: "apple", name: "apple"},
                 {id: "banana", name: "banana"},
                 {id: "pear", name: "pear"},
             ]}
             data={[
                 {date: "2016-9-11", apple: 1, banana: 2, pear: 3},
                 {date: "2016-9-13", apple: 0.03, banana: 3, pear: 2},
                 {date: "2016-9-12", apple: 5, banana: 47},
                 {date: "2016-9-14", apple: 0.05, banana: 7, pear: 4},
                 {date: "2016-9-15", apple: 0.08, banana: 6}
             ]}/>
    </div>
    , document.getElementById("test"));
// data={[
//     {id: "a", name: "gasga", group: "1", dom: <div><Radio data={[1, 2, 3]}/></div>},
// {id: "e", name: "sagas", dom: <div><Radio data={[1, 2, 3]}/></div>},
// {id: "b", name: "safas", group: "1", dom: <div><Radio data={[4, 5, 6]}/></div>},
// {id: "c", name: "gasgsa", group: "2", dom: <div><Radio data={[7, 8]}/></div>},
// {id: "d", name: "gas12rgsa", group: "2", dom: <div><Radio data={["a","b"]}/></div>},
// {id: "f", name: "sagas1", dom: <div><Radio data={[1, 2, 3]}/></div>}
// ]}entById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
//

