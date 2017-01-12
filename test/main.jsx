require("babel-polyfill");
let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-chart/index");
let data1 = [
    {date: "2016-9-11", apple: 32, banana: 33, pear: 34, server: 1, region: "中国"},
    {date: "2016-9-11", apple: 21, banana: 2, pear: 3, server: 2, region: "美国"},
    {date: "2016-9-13", apple: 3, banana: 3, pear: 2, server: 1, region: "阿拉伯"},
    {date: "2016-9-12", apple: 5, banana: 47, server: 1, region: "中国"},
    {date: "2016-10-14", apple: 5, banana: 7, pear: 4, server: 1, region: "美国"},
    {date: "2017-1-15", apple: 8, banana: 6, server: 1, region: "美国"}
];
let data2 = [
    {date: "2016-9-11", apple: 1, banana: 2, pear: 3},
    {date: "2016-9-13", apple: 0.03, banana: 13, pear: 2},
    {date: "2016-9-12", apple: 5, banana: 27},
    {date: "2016-9-14", apple: 0.05, banana: 7, pear: 3},
    {date: "2016-9-15", apple: 0.08, banana: 6}
];

class Xx extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data1
        };
    }

    render() {
        return (
            <div>
                <Com title="chart" yAxisText="kg" x="date" y={[
                    {id: "apple", name: "apple"},
                    {id: "banana", name: "banana"},
                    {id: "pear", name: "pear"}
                ]} data={this.state.data} group={["server", "region"]} type="curve"/>
                <button onClick={()=> {
                    let data = data2;
                    this.setState({data: data});
                }}>1
                </button>
            </div>);
    }

}


ReactDom.render(
    <div>
        <Xx/>

    </div>
    , document.getElementById("test"));
