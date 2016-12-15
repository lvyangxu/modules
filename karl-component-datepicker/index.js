"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
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

        _this.state = {
            panelShow: false,
            type: _this.props.type ? _this.props.type : "day",
            currentPanel: "month"
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

            var date = new Date();

            this.setState({
                startYear: date.getFullYear() - 100,
                endYear: date.getFullYear() + 100
            });

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
                    this.state.value,
                    React.createElement("i", { className: "fa fa-calendar" })
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
            if (this.state.startYear == undefined || this.state.endYear == undefined) {
                return "";
            }

            switch (this.state.type) {
                case "day":
                    switch (this.state.currentPanel) {
                        case "year":
                            break;
                        case "month":
                            content = React.createElement(
                                "div",
                                { className: css.content },
                                React.createElement("div", { className: css.contentHead }),
                                React.createElement(
                                    "div",
                                    { className: css.contentBody },
                                    React.createElement("div", { className: css.month })
                                )
                            );
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
    }]);

    return radio;
}(React.Component);

module.exports = radio;
