import React from "react";
import css from "./index.css";
import "font-awesome-webpack";
import date from "karl-date";

/**
 * react日期组件
 * type：日期类型，day或month，默认为day
 * callback：日期改变时执行的回调
 *
 * 示例：
 * <Datepicker type="month" callback={d=>{
 *         console.log('date is '+d);
 *     }}/>
 */
class datepicker extends React.Component {
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
            panelYear: year,
            panelMonth: month,
            panelDay: day,
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

    /**
     * 控制面板的显示和隐藏
     * @param e
     */
    panelToggle(e) {
        e.stopPropagation();
        this.setState({
            panelShow: !this.state.panelShow
        });
    }

    /**
     * 根据日期类型绘制ui
     * @returns {*}
     */
    setPanel() {
        let content;
        switch (this.state.type) {
            case "day":
                switch (this.state.currentPanel) {
                    case "year":
                        content = this.drawYearPanel();
                        break;
                    case "month":
                        content = this.drawMonthPanel();
                        break;
                    case "day":
                        content = this.drawDayPanel();
                        break;
                }
                break;
            case "month":
                switch (this.state.currentPanel) {
                    case "year":
                        content = this.drawYearPanel();
                        break;
                    case "month":
                        content = this.drawMonthPanel();
                        break;
                }
                break;
            case "week":
                switch (this.state.currentPanel) {
                    case "year":
                        content = this.drawYearPanel();
                        break;
                    case "month":
                        content = this.drawMonthPanel();
                        break;
                    case "day":
                        content = this.drawDayPanel();
                        break;
                }
                break;
        }
        return content;
    }

    /**
     * 绘制年面板
     * @returns {XML}
     */
    drawYearPanel() {
        let modNum = this.state.year % 12;
        let startYear = this.state.year - 12 + modNum + 1;
        let endYear = this.state.year + modNum;
        let arr = [];
        for (let i = startYear; i <= endYear; i = i + 4) {
            arr.push([i, i + 1, i + 2, i + 3]);
        }
        let content = <div className={css.content}>
            <div className={css.contentHead}>
                <div className={css.left} onClick={() => {
                    this.doLeft();
                }}><i className="fa fa-angle-double-left"/></div>
                <div className={css.middle} onClick={() => {
                    this.toMonthPanel();
                }}>
                    {
                        `${startYear}-${endYear}`
                    }
                </div>
                <div className={css.right} onClick={() => {
                    this.doRight();
                }}><i className="fa fa-angle-double-right"/></div>
            </div>
            <div className={css.contentBody}>
                <div className={css.year}>
                    {
                        arr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let className = (this.state.panelYear == d1) ? (css.yearCell + " " + css.active) : css.yearCell;
                                    return <div key={j} className={className} onClick={() => {
                                        this.setYear(d1);
                                    }}>{d1}</div>;
                                })
                            }</div>
                        })
                    }
                </div>
            </div>
        </div>;
        return content;
    }

    /**
     * 绘制月面板
     * @returns {XML}
     */
    drawMonthPanel() {
        let arr = [];
        for (let i = 1; i <= 12; i = i + 4) {
            let row = [i, i + 1, i + 2, i + 3];
            arr.push(row);
        }

        let content = <div className={css.content}>
            <div className={css.contentHead}>
                <div className={css.left} onClick={() => {
                    this.doLeft();
                }}><i className="fa fa-angle-double-left"/></div>
                <div className={css.middle} onClick={() => {
                    this.toYearPanel();
                }}>
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
                        arr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let className = (d1 == this.state.month && this.state.year == this.state.panelYear) ? (css.monthCell + " " + css.active) : css.monthCell;
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

    /**
     * 绘制日面板
     * @returns {XML}
     */
    drawDayPanel() {
        let arr = [];
        let [year, month] = [this.state.year, this.state.month];
        let titleArr = ["一", "二", "三", "四", "五", "六", "日"];
        let daysOfMonth = date.getDaysOfMonth(year, month);
        let daysOfLastMonth = date.getDaysOfLastMonth(year, month);
        let daysOfWeek = new Date(year, month - 1, 1).getDay();
        daysOfWeek = daysOfWeek == 0 ? 7 : daysOfWeek;
        let prefixDays = daysOfWeek - 1;

        for (let i = 1; i <= 42; i = i + 7) {
            let row = [];
            //计算该位置的天数
            for (let j = i; j <= i + 6; j++) {
                if (j <= prefixDays) {
                    let text = daysOfLastMonth - prefixDays + j;
                    row.push({text: text, add: -1});
                } else if (j > (daysOfMonth + prefixDays)) {
                    let text = j - daysOfMonth - prefixDays;
                    row.push({text: text, add: 1});
                } else {
                    let text = j - prefixDays;
                    row.push({text: text, add: 0});
                }
            }
            arr.push(row);
        }


        let content = <div className={css.content}>
            <div className={css.contentHead}>
                <div className={css.left} onClick={() => {
                    this.doLeft();
                }}><i className="fa fa-angle-double-left"/></div>
                <div className={css.middle} onClick={() => {
                    this.toYearPanel();
                }}>
                    {
                        `${this.state.year}年${this.state.month}月`
                    }
                </div>
                <div className={css.right} onClick={() => {
                    this.doRight();
                }}><i className="fa fa-angle-double-right"/></div>
            </div>
            <div className={css.contentBody}>
                <div className={css.day}>
                    <div className={css.row}>
                        {
                            titleArr.map((d, i) => {
                                return <div key={i} className={css.dayCell + " " + css.title}>{d}</div>;
                            })
                        }
                    </div>
                    {
                        arr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let className = css.dayCell;
                                    let isActive = this.state.panelYear == this.state.year;
                                    isActive = isActive && (this.state.panelMonth == this.state.month);
                                    isActive = isActive && (this.state.panelDay == d1.text);
                                    isActive = isActive && (d1.add == 0);
                                    className = isActive ? (css.dayCell + " " + css.active) : className;
                                    if (d1.add != 0) {
                                        className = className + " " + css.dark;
                                    }
                                    return <div key={j} className={className} onClick={() => {
                                        let [year, month] = [this.state.year, this.state.month];
                                        if (d1.add == -1) {
                                            if (month == 1) {
                                                year--;
                                                month = 12;
                                            } else {
                                                month--;
                                            }
                                        } else if (d1.add == 1) {
                                            if (month == 12) {
                                                year++;
                                                month = 1;
                                            } else {
                                                month++;
                                            }
                                        }
                                        this.setDay(year, month, d1.text);
                                    }}>{d1.text}</div>;
                                })
                            }</div>;
                        })
                    }
                </div>
            </div>
        </div>;
        return content;
    }

    /**
     * 设置年的值
     * @param y
     */
    setYear(y) {
        let [year, month, day] = [y, this.state.month, this.state.day];
        let value = this.buildValue({
            year: year,
            month: month,
            day: day
        });

        this.setState({
            currentPanel: "month",
            panelYear: year,
            year: year,
            month: month,
            value: value
        }, () => {
            if (this.props.callback) {
                this.props.callback(value);
            }
        });
    }

    /**
     * 设置月的值
     * @param m
     */
    setMonth(m) {
        let [year, month, day] = [this.state.year, m, this.state.day];
        let value = this.buildValue({
            year: year,
            month: month,
            day: day
        });
        let json = {
            panelYear: year,
            panelMonth: month,
            year: year,
            month: month,
            value: value
        };

        if (this.state.type == "month") {
            json.panelShow = false;
        } else if (this.state.type == "day") {
            json.currentPanel = "day";
        }

        this.setState(json, () => {
            if (this.props.callback) {
                this.props.callback(value);
            }
        });
    }

    /**
     * 设置日的值
     * @param d
     */
    setDay(y, m, d) {
        let [year, month, day] = [y, m, d];
        let value = this.buildValue({
            year: year,
            month: month,
            day: day
        });

        this.setState({
            panelShow: false,
            panelYear: year,
            panelMonth: month,
            panelDay: day,
            year: year,
            month: month,
            day: day,
            value: value
        }, () => {
            if (this.props.callback) {
                this.props.callback(value);
            }
        });
    }

    /**
     * 根据年月日和日期类型构建显示的text value
     * @param json
     * @returns {*}
     */
    buildValue(json) {
        let type = json.hasOwnProperty("type") ? json.type : this.state.type;
        let month = json.month < 10 ? ("0" + json.month) : json.month;
        let day = json.day < 10 ? ("0" + json.day) : json.day;
        let value;
        switch (type) {
            case "day":
                value = json.year + "-" + month + "-" + day;
                break;
            case "month":
                value = json.year + "-" + month;
                break;
        }
        return value;
    }

    /**
     * 日期左按钮
     */
    doLeft() {
        switch (this.state.currentPanel) {
            case "year":
                this.setState({
                    year: this.state.year - 12
                });
                break;
            case "month":
                this.setState({
                    year: this.state.year - 1
                });
            case "day":
                let [year, month] = [this.state.year, this.state.month];
                if (month == 1) {
                    year--;
                    month = 12;
                } else {
                    month--;
                }
                this.setState({
                    year: year,
                    month: month
                });
                break;
        }
    }

    /**
     * 日期右按钮
     */
    doRight() {
        switch (this.state.currentPanel) {
            case "year":
                this.setState({
                    year: this.state.year + 12
                });
                break;
            case "month":
                this.setState({
                    year: this.state.year + 1
                });
                break;
            case "day":
                let [year, month] = [this.state.year, this.state.month];
                if (month == 12) {
                    year++;
                    month = 1;
                } else {
                    month++;
                }
                this.setState({
                    year: year,
                    month: month
                });
                break;
        }
    }

    /**
     * 转到年界面
     */
    toYearPanel() {
        this.setState({
            currentPanel: "year"
        });
    }

    /**
     * 转到月界面
     */
    toMonthPanel() {
        this.setState({
            currentPanel: "month"
        });
    }

}
module.exports = datepicker;