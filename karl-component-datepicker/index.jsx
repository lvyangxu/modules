let React = require("react");
let css = require("./index.scss");
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
        let type = this.props.type ? this.props.type : "day";
        let currentPanel = type == "day" ? "day" : "month";
        let date = new Date();
        let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDay()];
        let value = this.buildValue({
            type: type,
            year: year,
            month: month,
            day: day
        });
        this.state = {
            panelShow: false,
            type: type,
            currentPanel: currentPanel,
            startYear: year - 100,
            endYear: year + 100,
            year: year,
            month: month,
            day: day,
            value: value
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
            <div className={css.base + " react-datepicker"}>
                <div className={css.input} onClick={this.panelToggle}>
                    <div className={css.value}>{this.state.value}</div>
                    <div className={css.icon}><i className="fa fa-calendar"></i></div>
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
        switch (this.state.type) {
            case "day":
                switch (this.state.currentPanel) {
                    case "year":
                        break;
                    case "month":
                        content = this.drawMonthPanel();
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
                        content = this.drawMonthPanel();
                        break;
                }
                break;
            case "week":
                switch (this.state.currentPanel) {
                    case "year":
                        break;
                    case "month":
                        content = this.drawMonthPanel();
                        break;
                    case "day":
                        break;
                }
                break;
        }
        return content;
    }

    drawMonthPanel() {
        let monthArr = [];
        for (let i = 1; i <= 12; i = i + 4) {
            let row = [i, i + 1, i + 2, i + 3];
            monthArr.push(row);
        }

        let content = <div className={css.content}>
            <div className={css.contentHead}>
                <div className={css.left} onClick={() => {
                    this.doLeft();
                }}><i className="fa fa-angle-double-left"/></div>
                <div className={css.middle}>
                    {
                        this.state.year + "年"
                    }
                </div>
                <div className={css.right} onClick={() => {
                    this.doRight();
                }}><i className="fa fa-angle-double-right"/></div>
            </div>
            <div className={css.contentBody}>
                <div className={css.month}>
                    {
                        monthArr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let className = d1 == this.state.month ? (css.monthCell + " " + css.active) : css.monthCell;
                                    return <div key={j} className={className} onClick={() => {
                                        this.setMonth(d1);
                                    }}>{d1}</div>;
                                })
                            }</div>;
                        })
                    }
                </div>
            </div>
        </div>;
        return content;
    }

    setMonth(m) {
        let value = this.buildValue({
            year: this.state.year,
            month: m
        });
        if(this.state.type == "month"){
            this.setState({
                panelShow: false
            });
        }

        this.setState({
            month: m,
            value: value
        });
    }

    buildValue(json) {
        let type = json.hasOwnProperty("type") ? json.type : this.state.type;
        let value;
        switch (type) {
            case "month":
                value = json.year + "-" + (json.month < 10 ? ("0" + json.month) : json.month);
                break;
        }
        return value;
    }

    doLeft() {
        switch (this.state.currentPanel) {
            case "month":
                this.setState({
                    year: this.state.year - 1
                });
                break;
        }
    }

    doRight() {
        switch (this.state.currentPanel) {
            case "month":
                this.setState({
                    year: this.state.year + 1
                });
                break;
        }
    }
}

module.exports = radio;