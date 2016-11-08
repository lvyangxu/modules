let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-chart/index");
require("font-awesome-webpack");


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Com title="chart" yAxisText="dollor" x="date"
                     y={[
                         {id: "m", name: "m"},
                         {id: "n", name: "n"},
                         {id: "o", name: "o"},
                         {id: "p", name: "p"},
                         {id: "q", name: "q"},
                         {id: "r", name: "r"}
                     ]}
                     data={[
                         {date: "2016-9-11", m: 4, o: 1, p: 2,q:3},
                         {date: "2016-9-13", m: 4, n: 3, o: 3, p: 2},
                         {date: "2016-9-12", m: 7, o: 5, p: 8},
                         {date: "2016-9-14", n: 5, o: 7, p: 4,q:5},
                         {date: "2016-9-15", m: 2, n: 8, p: 6}
                     ]}/>
            </div>
        )
    }
}
ReactDom.render(<App/>
    , document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));

