"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.scss");
require("font-awesome-webpack");
var date = require("karl-date");

/**
 * radio component,props means:
 * data:an array,element can be string or number
 * defaultBlank:if this props exits,then default value is "",else default value is the first option
 * callback:function after value change,param is current select value
 */

var radio = function (_React$Component) {
    _inherits(radio, _React$Component);

    function radio(props) {
        _classCallCheck(this, radio);

        var _this = _possibleConstructorReturn(this, (radio.__proto__ || Object.getPrototypeOf(radio)).call(this, props));

        var type = _this.props.type ? _this.props.type : "day";
        var currentPanel = type == "day" ? "day" : "month";
        var date = new Date();
        var _ref = [date.getFullYear(), date.getMonth() + 1, date.getDay()],
            year = _ref[0],
            month = _ref[1],
            day = _ref[2];

        var value = _this.buildValue({
            type: type,
            year: year,
            month: month,
            day: day
        });
        _this.state = {
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

        var bindArr = ["panelToggle"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });

        return _this;
    }

    _createClass(radio, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            window.addEventListener("click", function () {
                if (_this2.state.panelShow) {
                    _this2.setState({ panelShow: false });
                }
            }, false);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: css.base + " react-datepicker" },
                React.createElement(
                    "div",
                    { className: css.input, onClick: this.panelToggle },
                    React.createElement(
                        "div",
                        { className: css.value },
                        this.state.value
                    ),
                    React.createElement(
                        "div",
                        { className: css.icon },
                        React.createElement("i", { className: "fa fa-calendar" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: css.panel,
                        onClick: function onClick(e) {
                            e.stopPropagation();
                        },
                        style: this.state.panelShow ? {} : { display: "none" } },
                    this.setPanel()
                )
            );
        }

        /**
         * 控制面板的显示和隐藏
         * @param e
         */

    }, {
        key: "panelToggle",
        value: function panelToggle(e) {
            e.stopPropagation();
            this.setState({
                panelShow: !this.state.panelShow
            });
        }

        /**
         * 根据日期类型绘制ui
         * @returns {*}
         */

    }, {
        key: "setPanel",
        value: function setPanel() {
            var content = void 0;
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

    }, {
        key: "drawYearPanel",
        value: function drawYearPanel() {
            var _this3 = this;

            var modNum = this.state.year % 12;
            var startYear = this.state.year - 12 + modNum + 1;
            var endYear = this.state.year + modNum;
            var arr = [];
            for (var i = startYear; i <= endYear; i = i + 4) {
                arr.push([i, i + 1, i + 2, i + 3]);
            }
            var content = React.createElement(
                "div",
                { className: css.content },
                React.createElement(
                    "div",
                    { className: css.contentHead },
                    React.createElement(
                        "div",
                        { className: css.left, onClick: function onClick() {
                                _this3.doLeft();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-left" })
                    ),
                    React.createElement(
                        "div",
                        { className: css.middle, onClick: function onClick() {
                                _this3.toMonthPanel();
                            } },
                        startYear + "-" + endYear
                    ),
                    React.createElement(
                        "div",
                        { className: css.right, onClick: function onClick() {
                                _this3.doRight();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-right" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: css.contentBody },
                    React.createElement(
                        "div",
                        { className: css.year },
                        arr.map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, className: css.row },
                                d.map(function (d1, j) {
                                    var className = _this3.state.panelYear == d1 ? css.yearCell + " " + css.active : css.yearCell;
                                    return React.createElement(
                                        "div",
                                        { key: j, className: className, onClick: function onClick() {
                                                _this3.setYear(d1);
                                            } },
                                        d1
                                    );
                                })
                            );
                        })
                    )
                )
            );
            return content;
        }

        /**
         * 绘制月面板
         * @returns {XML}
         */

    }, {
        key: "drawMonthPanel",
        value: function drawMonthPanel() {
            var _this4 = this;

            var arr = [];
            for (var i = 1; i <= 12; i = i + 4) {
                var row = [i, i + 1, i + 2, i + 3];
                arr.push(row);
            }

            var content = React.createElement(
                "div",
                { className: css.content },
                React.createElement(
                    "div",
                    { className: css.contentHead },
                    React.createElement(
                        "div",
                        { className: css.left, onClick: function onClick() {
                                _this4.doLeft();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-left" })
                    ),
                    React.createElement(
                        "div",
                        { className: css.middle, onClick: function onClick() {
                                _this4.toYearPanel();
                            } },
                        this.state.year + "年"
                    ),
                    React.createElement(
                        "div",
                        { className: css.right, onClick: function onClick() {
                                _this4.doRight();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-right" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: css.contentBody },
                    React.createElement(
                        "div",
                        { className: css.month },
                        arr.map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, className: css.row },
                                d.map(function (d1, j) {
                                    var className = d1 == _this4.state.month && _this4.state.year == _this4.state.panelYear ? css.monthCell + " " + css.active : css.monthCell;
                                    return React.createElement(
                                        "div",
                                        { key: j, className: className, onClick: function onClick() {
                                                _this4.setMonth(d1);
                                            } },
                                        d1
                                    );
                                })
                            );
                        })
                    )
                )
            );
            return content;
        }

        /**
         * 绘制日面板
         * @returns {XML}
         */

    }, {
        key: "drawDayPanel",
        value: function drawDayPanel() {
            var _this5 = this;

            var arr = [];
            var _ref2 = [this.state.year, this.state.month],
                year = _ref2[0],
                month = _ref2[1];

            var titleArr = ["一", "二", "三", "四", "五", "六", "日"];
            var daysOfMonth = date.getDaysOfMonth(year, month);
            var daysOfLastMonth = date.getDaysOfLastMonth(year, month);
            var daysOfWeek = new Date(year, month - 1, 1).getDay();
            daysOfWeek = daysOfWeek == 0 ? 7 : daysOfWeek;
            var prefixDays = daysOfWeek - 1;

            for (var i = 1; i <= 42; i = i + 7) {
                var row = [];
                //计算该位置的天数
                for (var j = i; j <= i + 6; j++) {
                    if (j <= prefixDays) {
                        var text = daysOfLastMonth - prefixDays + j;
                        row.push({ text: text, add: -1 });
                    } else if (j > daysOfMonth + prefixDays) {
                        var _text = j - daysOfMonth - prefixDays;
                        row.push({ text: _text, add: 1 });
                    } else {
                        var _text2 = j - prefixDays;
                        row.push({ text: _text2, add: 0 });
                    }
                }
                arr.push(row);
            }

            var content = React.createElement(
                "div",
                { className: css.content },
                React.createElement(
                    "div",
                    { className: css.contentHead },
                    React.createElement(
                        "div",
                        { className: css.left, onClick: function onClick() {
                                _this5.doLeft();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-left" })
                    ),
                    React.createElement(
                        "div",
                        { className: css.middle, onClick: function onClick() {
                                _this5.toYearPanel();
                            } },
                        this.state.year + "年" + this.state.month + "月"
                    ),
                    React.createElement(
                        "div",
                        { className: css.right, onClick: function onClick() {
                                _this5.doRight();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-right" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: css.contentBody },
                    React.createElement(
                        "div",
                        { className: css.day },
                        React.createElement(
                            "div",
                            { className: css.row },
                            titleArr.map(function (d, i) {
                                return React.createElement(
                                    "div",
                                    { key: i, className: css.dayCell + " " + css.title },
                                    d
                                );
                            })
                        ),
                        arr.map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, className: css.row },
                                d.map(function (d1, j) {
                                    var className = css.dayCell;
                                    var isActive = _this5.state.panelYear == _this5.state.year;
                                    isActive = isActive && _this5.state.panelMonth == _this5.state.month;
                                    isActive = isActive && _this5.state.panelDay == d1.text;
                                    isActive = isActive && d1.add == 0;
                                    className = isActive ? css.dayCell + " " + css.active : className;
                                    if (d1.add != 0) {
                                        className = className + " " + css.dark;
                                    }
                                    return React.createElement(
                                        "div",
                                        { key: j, className: className, onClick: function onClick() {
                                                var _ref3 = [_this5.state.year, _this5.state.month],
                                                    year = _ref3[0],
                                                    month = _ref3[1];

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
                                                _this5.setDay(year, month, d1.text);
                                            } },
                                        d1.text
                                    );
                                })
                            );
                        })
                    )
                )
            );
            return content;
        }

        /**
         * 设置年的值
         * @param y
         */

    }, {
        key: "setYear",
        value: function setYear(y) {
            var _this6 = this;

            var _ref4 = [y, this.state.month, this.state.day],
                year = _ref4[0],
                month = _ref4[1],
                day = _ref4[2];

            var value = this.buildValue({
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
            }, function () {
                if (_this6.props.callback) {
                    _this6.props.callback(value);
                }
            });
        }

        /**
         * 设置月的值
         * @param m
         */

    }, {
        key: "setMonth",
        value: function setMonth(m) {
            var _this7 = this;

            var _ref5 = [this.state.year, m, this.state.day],
                year = _ref5[0],
                month = _ref5[1],
                day = _ref5[2];

            var value = this.buildValue({
                year: year,
                month: month,
                day: day
            });
            var json = {
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

            this.setState(json, function () {
                if (_this7.props.callback) {
                    _this7.props.callback(value);
                }
            });
        }

        /**
         * 设置日的值
         * @param d
         */

    }, {
        key: "setDay",
        value: function setDay(y, m, d) {
            var _this8 = this;

            var year = y,
                month = m,
                day = d;

            var value = this.buildValue({
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
            }, function () {
                if (_this8.props.callback) {
                    _this8.props.callback(value);
                }
            });
        }

        /**
         * 根据年月日和日期类型构建显示的text value
         * @param json
         * @returns {*}
         */

    }, {
        key: "buildValue",
        value: function buildValue(json) {
            var type = json.hasOwnProperty("type") ? json.type : this.state.type;
            var month = json.month < 10 ? "0" + json.month : json.month;
            var day = json.day < 10 ? "0" + json.day : json.day;
            var value = void 0;
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

    }, {
        key: "doLeft",
        value: function doLeft() {
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
                    var _ref6 = [this.state.year, this.state.month],
                        year = _ref6[0],
                        month = _ref6[1];

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

    }, {
        key: "doRight",
        value: function doRight() {
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
                    var _ref7 = [this.state.year, this.state.month],
                        year = _ref7[0],
                        month = _ref7[1];

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

    }, {
        key: "toYearPanel",
        value: function toYearPanel() {
            this.setState({
                currentPanel: "year"
            });
        }

        /**
         * 转到月界面
         */

    }, {
        key: "toMonthPanel",
        value: function toMonthPanel() {
            this.setState({
                currentPanel: "month"
            });
        }
    }]);

    return radio;
}(React.Component);

module.exports = radio;
