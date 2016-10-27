let React = require("react");
let ReactDom = require("react-dom");
// let Radio = require("karl-component-radio");
// let Select = require("karl-component-select");
let Carousel = require("../karl-component-carousel/index");
require("font-awesome-webpack");

ReactDom.render(<Carousel data={["a", "b", "c"]}>
    <div className="a">
        <div>1</div>
        <div>2</div>
    </div>
    <div className="b">
        <div>3</div>
        <div>4</div>
    </div>
    <div className="c">5</div>
</Carousel>, document.getElementById("test"));

// ReactDom.render(<Select data={[{id:"a",name:"1",checked:true}]}/>,document.getElementById("test1"));

