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
            type: this.props.type ? this.props.type : "day",
            currentPanel: "month"
        };
        let bindArr = ["panelToggle"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        let date = new Date();

        this.setState({
            startYear: date.getFullYear() - 100,
            endYear: date.getFullYear() + 100,
        });

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
            <div className={css.base + " react-datepicker"}>
                <div className={css.input} onClick={this.panelToggle}>
                    {this.state.value}<i className="fa fa-calendar"></i>
                </div>
                <div className={css.panel}
                     onClick={(e) => {
                         e.stopPropagation();
                     }}
                     style={(this.state.panelShow) ? {} : {display: "none"}}>
                    {
                        this.setPanel()
                    }
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

    setPanel() {
        let content;
        if (this.state.startYear == undefined || this.state.endYear == undefined) {
            return "";
        }

        switch (this.state.type) {
            case "day":
                switch (this.state.currentPanel) {
                    case "year":
                        break;
                    case "month":
                        content = <div className={css.content}>
                            <div className={css.contentHead}>
                            </div>
                            <div className={css.contentBody}>
                                <div className={css.month}></div>
                            </div>
                        </div>;
                        break;
                    case "day":
                        break;
                }
                break;
            case "month":
                switch (this.state.currentPanel) {
                    case "year":
                        break;
                    case "month":
                        break;
                }
                break;
            case "week":
                switch (this.state.currentPanel) {
                    case "year":
                        break;
                    case "month":
                        break;
                    case "day":
                        break;
                }
                break;
        }
        return content;
    }

}

module.exports = radio;