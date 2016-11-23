let http = require("karl-http");
let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

/**
 * radio component,props means:
 * data:an array,element can be string or number
 * defaultBlank:if this props exits,then default value is "",else default value is the first option
 * callback:function after value change,param is current select value
 */
class radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelShow: false,
            startYear: 1900,
            endYear: 2100,
            type: this.props.type ? this.props.type : "day"
        };
        let bindArr = ["panelToggle"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {

        window.addEventListener("click", () => {
            if (this.state.panelShow) {
                this.setState({panelShow: false});
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className={css.base + " react-radio"}>
                <div className={css.display} onClick={this.panelToggle}>
                    {this.state.value}<i className="fa fa-calendar"></i>
                </div>
                <div className={css.panel}
                     onClick={(e) => {
                         e.stopPropagation();
                     }}
                     style={(this.state.panelShow) ? {} : {display: "none"}}>
                </div>
            </div>
        );
    }

    panelToggle(e) {
        e.stopPropagation();
        this.setState({
            panelShow: !this.state.panelShow
        });
    }


}

module.exports = radio;