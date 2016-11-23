let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-datepicker/index");
require("font-awesome-webpack");


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 2
        }
    }

    render() {
        return (
            <div>
                <Com/>
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

