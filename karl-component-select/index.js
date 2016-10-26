"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");

/**
 * select component,props means:
 * data:a json array,json struct is {id:*,name:*,checked:*}
 * optionNumPerColumn:how many options display in one column
 * lang:ui language,default en
 * callback:function after value change,param is current data
 */

var select = function (_React$Component) {
    _inherits(select, _React$Component);

    function select(props) {
        _classCallCheck(this, select);

        var _this = _possibleConstructorReturn(this, (select.__proto__ || Object.getPrototypeOf(select)).call(this, props));

        _this.state = {
            panelShow: false,
            data: [],
            allChecked: false,
            optionNumPerColumn: _this.props.optionNumPerColumn ? _this.props.optionNumPerColumn : 10,
            lang: _this.props.lang == "ch" ? "ch" : "en"
        };
        var bindArr = ["panelToggle", "setData", "check", "allCheck"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(select, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var data = this.setData(this.props.data);
            this.setState({ data: data });

            window.addEventListener("click", function () {
                if (_this2.state.panelShow) {
                    _this2.setState({ panelShow: false });
                }
            }, false);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var data = this.setData(nextProps.data);
            this.setState({ data: data });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: css.base + " react-select" },
                React.createElement(
                    "div",
                    { className: css.input, onClick: this.panelToggle },
                    this.props.text,
                    React.createElement("i", { className: "fa fa-caret-down" })
                ),
                React.createElement(
                    "div",
                    { className: css.panel, style: this.state.panelShow ? {} : { display: "none" },
                        onClick: function onClick(e) {
                            e.stopPropagation();
                        } },
                    React.createElement(
                        "div",
                        { className: css.allCheck },
                        React.createElement("input", { type: "checkbox", onChange: function onChange(e) {
                                _this3.allCheck(e);
                            }, checked: this.state.allChecked }),
                        React.createElement(
                            "label",
                            null,
                            this.state.lang == "ch" ? "全选" : "check all"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: css.options },
                        this.state.data.map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, className: css.column },
                                d.map(function (d1, j) {
                                    return React.createElement(
                                        "div",
                                        { className: css.option, key: j },
                                        React.createElement("input", { type: "checkbox", onChange: function onChange(e) {
                                                _this3.check(e, d1.id);
                                            }, checked: d1.checked }),
                                        React.createElement(
                                            "label",
                                            null,
                                            d1.name
                                        )
                                    );
                                })
                            );
                        })
                    )
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
        key: "setData",
        value: function setData(d) {
            var columnDataArr = [];
            var num = this.state.optionNumPerColumn;
            for (var i = 0; i < d.length; i = i + num) {
                var end = i + num > d.length ? d.length : i + num;
                var columnData = d.slice(i, end);
                columnDataArr.push(columnData);
            }
            return columnDataArr;
        }
    }, {
        key: "check",
        value: function check(e, id) {
            var _this4 = this;

            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.focus();
            var data = this.state.data.map(function (d) {
                d = d.map(function (d1) {
                    if (d1.id == id) {
                        d1.checked = !d1.checked;
                    }
                    return d1;
                });
                return d;
            });
            this.setState({
                data: data
            });
            if (this.props.callback) {
                (function () {
                    var sourceData = [];
                    _this4.state.data.forEach(function (d) {
                        d.forEach(function (d1) {
                            sourceData.push(d1);
                        });
                    });
                    _this4.props.callback(sourceData);
                })();
            }
        }
    }, {
        key: "allCheck",
        value: function allCheck(e) {
            var _this5 = this;

            e.target.parentNode.parentNode.parentNode.focus();
            var isAllChecked = !this.state.allChecked;
            var data = this.state.data.map(function (d) {
                d.map(function (d1) {
                    d1.checked = isAllChecked;
                });
                return d;
            });
            this.setState({
                allChecked: isAllChecked,
                data: data
            });
            if (this.props.callback) {
                (function () {
                    var sourceData = [];
                    _this5.state.data.forEach(function (d) {
                        d.forEach(function (d1) {
                            sourceData.push(d1);
                        });
                    });
                    _this5.props.callback(sourceData);
                })();
            }
        }
    }]);

    return select;
}(React.Component);

module.exports = select;

//# sourceMappingURL=index.js.map