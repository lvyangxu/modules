"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");
var $ = require("jquery");

/**
 *
 */

var nav = function (_React$Component) {
    _inherits(nav, _React$Component);

    function nav(props) {
        _classCallCheck(this, nav);

        var _this = _possibleConstructorReturn(this, (nav.__proto__ || Object.getPrototypeOf(nav)).call(this, props));

        _this.state = {
            data: [],
            activeDom: "",
            activeId: ""
        };
        var bindArr = [];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(nav, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            //设置菜单和内容的宽度和高度自适应
            this.setSize();
            window.addEventListener("resize", function (e) {
                _this2.setSize();
            });

            var data = this.props.data;
            var activeId = data[0].id;
            var activeDom = data[0].dom;

            var json = {
                data: data,
                activeId: activeId,
                activeDom: activeDom
            };

            //根据锚点设置默认选中的菜单
            var hash = window.location.hash.replace(/#/g, "");
            if (hash != "") {
                var active = data.find(function (d) {
                    return d.id == hash;
                });
                if (active != undefined) {
                    json.activeId = hash;
                    json["group-show-" + active.group] = true;
                }
            }

            this.setState(json);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: css.base + " react-nav", ref: function ref(d) {
                        _this3.base = d;
                    } },
                React.createElement(
                    "div",
                    { className: css.menu, ref: function ref(d) {
                            _this3.menu = d;
                        } },
                    this.setMenu()
                ),
                React.createElement(
                    "div",
                    { className: css.content, ref: function ref(d) {
                            _this3.content = d;
                        } },
                    this.setContent()
                )
            );
        }
    }, {
        key: "setSize",
        value: function setSize() {
            var marginTop = $(this.base).offset().top;
            var height = $(window).height() - marginTop;
            var width = $(window).width() - 200;
            $(this.menu).css({ height: height });
            $(this.content).css({
                height: height,
                width: width
            });
        }
    }, {
        key: "setMenu",
        value: function setMenu() {
            var _this4 = this;

            var groups = [];
            this.state.data.forEach(function (d) {
                if (!groups.includes(d.group)) {
                    groups.push(d.group);
                }
            });

            var liArr = [];
            this.state.data.forEach(function (d) {
                if (d.hasOwnProperty("group")) {
                    //如果含有group,判断是否添加过该group
                    var hasInclude = liArr.find(function (d1) {
                        return d1.group == d.group;
                    });

                    if (hasInclude != undefined) {
                        (function () {
                            //如果添加过该group,则将新的数据合并到该一级菜单下
                            var li = React.createElement(
                                "div",
                                { onClick: function onClick() {
                                        _this4.setState({
                                            activeId: d.id
                                        });
                                    }, key: d.id, className: _this4.state.activeId == d.id ? css.active + " " + css.li + " " + css.li1 : css.li + " " + css.li1 },
                                d.name
                            );
                            liArr = liArr.map(function (d1) {
                                if (d1.group == d.group) {
                                    var arr = d1.dom.concat();
                                    arr.push(li);
                                    d1.dom = arr;
                                    return d1;
                                } else {
                                    return d1;
                                }
                            });
                        })();
                    } else {
                        //如果没有添加过group,则新添加一个一级菜单
                        var _li = React.createElement(
                            "div",
                            { onClick: function onClick() {
                                    _this4.setState({
                                        activeId: d.id
                                    });
                                }, key: d.id, className: _this4.state.activeId == d.id ? css.active + " " + css.li + " " + css.li1 : css.li + " " + css.li1 },
                            d.name
                        );
                        liArr.push({ group: d.group, dom: [_li] });
                    }
                } else {
                    //如果不含有group属性，则为第一级菜单
                    var _li2 = React.createElement(
                        "div",
                        { className: _this4.state.activeId == d.id ? css.active + " " + css.li : css.li,
                            onClick: function onClick() {
                                _this4.setState({
                                    activeId: d.id
                                });
                            } },
                        d.name
                    );
                    liArr.push({ dom: _li2 });
                }
            });

            var menu = liArr.map(function (d, i) {
                var showName = "group-show-" + d.group;
                if (d.hasOwnProperty("group")) {
                    return React.createElement(
                        "div",
                        { key: i },
                        React.createElement(
                            "div",
                            { className: css.li, onClick: function onClick() {
                                    var json = {};
                                    json[showName] = !_this4.state[showName];
                                    _this4.setState(json);
                                } },
                            React.createElement("i", {
                                className: _this4.state[showName] ? "fa fa-caret-down" : "fa fa-caret-right" }),
                            d.group
                        ),
                        React.createElement(
                            "div",
                            { style: _this4.state[showName] ? {} : { display: "none" } },
                            d.dom
                        )
                    );
                } else {
                    return React.createElement(
                        "div",
                        { key: i },
                        d.dom
                    );
                }
            });
            return menu;
        }
    }, {
        key: "setContent",
        value: function setContent() {
            var _this5 = this;

            var active = this.state.data.find(function (d) {
                return d.id == _this5.state.activeId;
            });
            if (active != undefined) {
                window.location.hash = active.id;
            }

            return this.state.data.map(function (d, i) {
                return React.createElement(
                    "div",
                    { key: i, style: d.id == _this5.state.activeId ? {} : { display: "none" } },
                    d.dom
                );
            });
        }
    }]);

    return nav;
}(React.Component);

module.exports = nav;

//# sourceMappingURL=index.js.map