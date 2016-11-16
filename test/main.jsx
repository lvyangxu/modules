let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-chart/index");
require("font-awesome-webpack");


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a:2
        }
    }

    render() {
        return (
            <div>
                <Com title="chart" yAxisText="dollor" x="date" type="bar"
                     y={[
                         {id: "o", name: "o"},
                         {id: "p", name: "p"},
                         {id: "q", name: "q"},
                     ]}
                     data={[
                         {date: "2016-9-11", m: 0.04, o: 1, p: 2, q: 3},
                         {date: "2016-9-13", m: 0.04, n: 0.03, o: 3, p: 2},
                         {date: "2016-9-12", m: 0.07, o: 5, p: 47},
                         {date: "2016-9-14", m: 0.61, n: 0.05, o: 7, p: 4, q: 5},
                         {date: "2016-9-15", m: 0.02, n: 0.08, p: 6}
                     ]}/>
                <button onClick={() => {
                    this.setState({a: 1});
                }}>1
                </button>
            </div>
        )
    }
}
ReactDom.render(<App/>
    , document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}
