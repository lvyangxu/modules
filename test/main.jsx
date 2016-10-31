let React = require("react");
let ReactDom = require("react-dom");
// let Radio = require("karl-component-radio");
// let Select = require("karl-component-select");
let Carousel = require("../karl-component-carousel/index");
require("font-awesome-webpack");

ReactDom.render(<Carousel data={["a", "b", "c"]}>
    <div className="a">
        <img style={{width:"100%"}} src="1.png"/>
    </div>
    <div className="b">
        <img style={{width:"100%"}} src="2.png"/>
    </div>
    <div className="c">
        <img style={{width:"100%"}} src="3.png"/>
    </div>
</Carousel>, document.getElementById("test"));

// ReactDom.render(<Select data={[{id:"a",name:"1",checked:true}]}/>,document.getElementById("test1"));

