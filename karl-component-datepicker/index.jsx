import React from "react";
import css from "./index.css";
import "font-awesome-webpack";
import date from "karl-date";

/**
 * react日期组件
 * type：日期类型，day/month/second，默认为day
 * add：默认值的偏移量，day为1日，month为1月，week为1周
 * callback：日期改变时执行的回调
 * initCallback：初始化后执行的回调
 *
 * 示例：
 * <Datepicker add="2" type="month" callback={d=>{
 *         console.log('date is '+d);
 *     }}/>
 */
class datepicker extends React.Component {
    constructor(props) {
        super(props);
        let type = this.props.type ? this.props.type : "day";
        let add = this.props.add ? this.props.add : 0;
        add = Number.parseInt(add);
        let currentPanel;
        switch (type) {
            case "day":
                currentPanel = "day";
                break;
            case "month":
                currentPanel = "month";
                break;
            case "second":
                currentPanel = "second";
                break;
        }
        let {year:year1, month:month1, day:day1, hour:hour1, minute:minute1, second:second1} = date.add(new Date());
        switch (type) {
            case "day":
                day1 = day1 + add;
                break;
            case "month":
                month1 = month1 + add;
                break;
            case "second":
                second1 = second1 + add;
                break;
        }
        let {year, month, day, hour, minute, second} = date.add({
            year: year1,
            month: month1,
            day: day1,
            hour: hour1,
            minute: minute1,
            second: second1
        });
        let value = this.buildValue({
            type: type,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
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
            hour: hour,
            minute: minute,
            second: second,
            panelYear: year,
            panelMonth: month,
            panelDay: day,
            panelHour: hour,
            panelMinute: minute,
            panelSecond: second,
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
        if (this.props.initCallback) {
            this.props.initCallback(this.state.value);
        }
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
        switch (this.state.currentPanel) {
            case "day":
                content = this.drawDayPanel();
                break;
            default:
                content = this.drawPanel(this.state.currentPanel);
                break;
        }
        return content;
    }

    /**
     * 绘制除日面板以外的所有面板
     * @param type
     * @returns {XML}
     */
    drawPanel(type) {
        let arr = [];
        let gradtion = ["year", "month", "day", "hour", "minute", "second"];
        let index = gradtion.findIndex(d=> {
            return d == type;
        });
        let start, end, step, title;
        switch (type) {
            case "year":
                let modNum = this.state.year % 12;
                start = this.state.year - 12 + modNum + 1;
                end = this.state.year + modNum;
                step = 4;
                title = `${start}-${end}`;
                break;
            case "month":
                start = 1;
                end = 12;
                step = 4;
                title = `${this.state.year}年`;
                break;
            case "hour":
                start = 0;
                end = 23;
                step = 6;
                title = `${this.state.year}年${this.state.month}月${this.state.day}日`;
                break;
            case "minute":
                start = 0;
                end = 59;
                step = 10;
                title = `${this.state.year}年${this.state.month}月${this.state.day}日${this.state.hour}时`;
                break;
            case "second":
                start = 0;
                end = 59;
                step = 10;
                title = `${this.state.year}年${this.state.month}月${this.state.day}日${this.state.hour}时${this.state.minute}分`;
                break;

        }

        for (let i = start; i <= end; i = i + step) {
            let row = [];
            for (let j = 0; j <= step - 1; j++) {
                row.push(i + j);
            }
            arr.push(row);
        }

        let content = <div className={css.content}>
            <div className={css.contentHead}>
                <div className={css.left} onClick={() => {
                    this.doLeft();
                }}><i className="fa fa-angle-double-left"/></div>
                <div className={css.middle} onClick={() => {
                    //返回上一级面板，如果已到最高层，则返回第2层
                    let currentPanel;
                    if (index == 0) {
                        currentPanel = gradtion[1];
                    } else {
                        currentPanel = gradtion[index - 1];
                    }
                    this.setState({
                        currentPanel: currentPanel
                    });
                }}>{title}</div>
                <div className={css.right} onClick={() => {
                    this.doRight();
                }}><i className="fa fa-angle-double-right"/></div>
            </div>
            <div className={css.contentBody}>
                <div className={css.page}>
                    {
                        arr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let isEqual = false;
                                    switch (type) {
                                        case "year":
                                            isEqual = this.state.year == d1;
                                            break;
                                        case "month":
                                            isEqual = this.state.year == this.state.panelYear && this.state.month == d1;
                                            break;
                                        case "day":
                                            isEqual = this.state.year == this.state.panelYear && this.state.month == this.state.panelMonth &&
                                                this.state.day == d1;
                                            break;
                                        case "hour":
                                            isEqual = this.state.year == this.state.panelYear && this.state.month == this.state.panelMonth &&
                                                this.state.day == this.state.panelDay && this.state.hour == d1;
                                            break;
                                        case "minute":
                                            isEqual = this.state.year == this.state.panelYear && this.state.month == this.state.panelMonth &&
                                                this.state.day == this.state.panelDay && this.state.hour == this.state.panelHour &&
                                                this.state.minute == d1;
                                            break;
                                        case "second":
                                            isEqual = this.state.year == this.state.panelYear && this.state.month == this.state.panelMonth &&
                                                this.state.day == this.state.panelDay && this.state.hour == this.state.panelHour &&
                                                this.state.minute == this.state.panelMinute && this.state.second == d1;
                                            break;
                                    }

                                    let className = isEqual ?
                                        (css.cell + " " + css[type] + " " + css.active) :
                                        (css.cell + " " + css[type]);
                                    return <div key={j} className={className} onClick={() => {
                                        let oldJson = {};
                                        gradtion.forEach(d2=> {
                                            if (d2 == type) {
                                                oldJson[d2] = d1;
                                            } else {
                                                oldJson[d2] = this.state[d2];
                                            }
                                        });
                                        let json = date.add(oldJson);
                                        this.setValue(type, json);
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
        let gradtion = ["year", "month", "day", "hour", "minute", "second"];
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
                    //返回上一级面板，如果已到最高层，则返回第2层
                    let index = gradtion.findIndex(d=> {
                        return d == "day";
                    });
                    if (index == 0) {
                        index = 1;
                    } else {
                        index--;
                    }
                    this.setState({
                        currentPanel: gradtion[index]
                    });
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
                <div className={css.page}>
                    <div className={css.row}>
                        {
                            titleArr.map((d, i) => {
                                return <div key={i} className={css.cell + " " + css.day + " " + css.title}>{d}</div>;
                            })
                        }
                    </div>
                    {
                        arr.map((d, i) => {
                            return <div key={i} className={css.row}>{
                                d.map((d1, j) => {
                                    let isActive = this.state.panelYear == this.state.year;
                                    isActive = isActive && (this.state.panelMonth == this.state.month);
                                    isActive = isActive && (this.state.panelDay == d1.text);
                                    isActive = isActive && (d1.add == 0);
                                    let className = isActive ? (css.cell + " " + css.day + " " + css.active) : (css.cell + " " + css.day);
                                    if (d1.add != 0) {
                                        className = className + " " + css.dark;
                                    }
                                    return <div key={j} className={className} onClick={() => {
                                        let json = date.add({
                                            year: this.state.year,
                                            month: this.state.month,
                                            day: d1.text,
                                            hour: this.state.hour,
                                            minute: this.state.minute,
                                            second: this.state.second
                                        }, {month: d1.add});
                                        this.setValue("day", json);
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

    setValue(type, json) {
        let value = this.buildValue(json);
        let {year, month, day, hour, minute, second} = json;
        let newState = {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            panelYear: year,
            panelMonth: month,
            panelDay: day,
            panelHour: hour,
            panelMinute: minute,
            panelSecond: second,
            value: value
        };
        let gradtion = ["year", "month", "day", "hour", "minute", "second"];
        let endPanel;
        switch (this.state.type) {
            case "month":
                endPanel = "month";
                break;
            case "day":
                endPanel = "day";
                break;
            case "second":
                endPanel = "second";
                break;
        }
        let isLastPanel = false;
        if (this.state.currentPanel == endPanel) {
            //到达最后一级面板时关闭
            isLastPanel = true;
            newState.panelShow = false;
        } else {
            //跳转到下一级面板
            let index = gradtion.findIndex(d=> {
                return d == type;
            });
            index++;
            newState.currentPanel = gradtion[index];
        }
        this.setState(newState, ()=> {
            if (isLastPanel && this.props.callback) {
                this.props.callback(value);
            }
        });
    }

    /**
     * 根据年月日时分秒和日期类型构建显示的text value
     * @param json
     * @returns {*}
     */
    buildValue(json) {
        let type = json.hasOwnProperty("type") ? json.type : this.state.type;
        let year = json.year;
        let month = json.month < 10 ? ("0" + json.month) : json.month;
        let day = json.day < 10 ? ("0" + json.day) : json.day;
        let hour = json.hour < 10 ? ("0" + json.hour) : json.hour;
        let minute = json.minute < 10 ? ("0" + json.minute) : json.minute;
        let second = json.second < 10 ? ("0" + json.second) : json.second;
        let value;
        switch (type) {
            case "day":
                value = `${year}-${month}-${day}`;
                break;
            case "month":
                value = `${year}-${month}`;
                break;
            case "second":
                value = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
            default:
                let json = {};
                let gradtion = ["year", "month", "day", "hour", "minute", "second"];
                let index = gradtion.findIndex(d=>{
                    return d == this.state.currentPanel;
                });
                let changePanel = gradtion[index - 1];
                json[changePanel] = this.state[changePanel] - 1;
                this.setState(json, ()=> {
                    let date = new Date(this.state.year, this.state.month - 1, this.state.day, this.state.hour, this.state.minute, this.state.second);
                    this.setState({
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        minute: date.getMinutes(),
                        second: date.getSeconds()
                    })
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
            default:
                let json = {};
                let gradtion = ["year", "month", "day", "hour", "minute", "second"];
                let index = gradtion.findIndex(d=>{
                    return d == this.state.currentPanel;
                });
                let changePanel = gradtion[index - 1];
                json[changePanel] = this.state[changePanel] + 1;
                this.setState(json, ()=> {
                    let date = new Date(this.state.year, this.state.month - 1, this.state.day, this.state.hour, this.state.minute, this.state.second);
                    this.setState({
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        minute: date.getMinutes(),
                        second: date.getSeconds()
                    })
                });
                break;
        }
    }

}
module.exports = datepicker;