"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.scss");
require("font-awesome-webpack");

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
    }, {
        key: "panelToggle",
        value: function panelToggle(e) {
            e.stopPropagation();
            this.setState({
                panelShow: !this.state.panelShow
            });
        }
    }, {
        key: "setPanel",
        value: function setPanel() {
            var content = void 0;
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
    }, {
        key: "drawMonthPanel",
        value: function drawMonthPanel() {
            var _this3 = this;

            var monthArr = [];
            for (var i = 1; i <= 12; i = i + 4) {
                var row = [i, i + 1, i + 2, i + 3];
                monthArr.push(row);
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
                        { className: css.middle },
                        this.state.year + "年"
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
                        { className: css.month },
                        monthArr.map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, className: css.row },
                                d.map(function (d1, j) {
                                    var className = d1 == _this3.state.month ? css.monthCell + " " + css.active : css.monthCell;
                                    return React.createElement(
                                        "div",
                                        { key: j, className: className, onClick: function onClick() {
                                                _this3.setMonth(d1);
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
    }, {
        key: "setMonth",
        value: function setMonth(m) {
            var value = this.buildValue({
                year: this.state.year,
                month: m
            });
            if (this.state.type == "month") {
                this.setState({
                    panelShow: false
                });
            }

            this.setState({
                month: m,
                value: value
            });
        }
    }, {
        key: "buildValue",
        value: function buildValue(json) {
            var type = json.hasOwnProperty("type") ? json.type : this.state.type;
            var value = void 0;
            switch (type) {
                case "month":
                    value = json.year + "-" + (json.month < 10 ? "0" + json.month : json.month);
                    break;
            }
            return value;
        }
    }, {
        key: "doLeft",
        value: function doLeft() {
            switch (this.state.currentPanel) {
                case "month":
                    this.setState({
                        year: this.state.year - 1
                    });
                    break;
            }
        }
    }, {
        key: "doRight",
        value: function doRight() {
            switch (this.state.currentPanel) {
                case "month":
                    this.setState({
                        year: this.state.year + 1
                    });
                    break;
            }
        }
    }]);

    return radio;
}(React.Component);

module.exports = radio;
