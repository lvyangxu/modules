"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");

/**
 * data
 */

var nav = function (_React$Component) {
    _inherits(nav, _React$Component);

    function nav(props) {
        _classCallCheck(this, nav);

        var _this = _possibleConstructorReturn(this, (nav.__proto__ || Object.getPrototypeOf(nav)).call(this, props));

        _this.state = {
            data: [],
            content: [],
            activeNav: "",
            height: 300
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
            var activeNav = "";
            var data = this.props.data;
            if (data[0].hasOwnProperty("child")) {
                activeNav = data[0].child[0];
            } else {
                activeNav = data[0].titleText;
            }

            var hash = window.location.hash.replace(/#/g, "");
            if (hash != "") {
                var isFind = false;
                data.forEach(function (d) {
                    if (d.hasOwnProperty("child")) {
                        if (d.child.includes(hash)) {
                            isFind = true;
                        }
                    } else {
                        if (hash == d.titleText) {
                            isFind = true;
                        }
                    }
                });
                if (isFind) {
                    activeNav = hash;
                }
            }

            this.setState({
                data: data,
                activeNav: activeNav,
                content: this.props.children,
                height: this.props.height ? this.props.height : 300
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.children != nextProps.children) {
                this.setState({
                    content: nextProps.children
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: css.base + " react-nav" },
                React.createElement(
                    "div",
                    { className: css.menu },
                    this.setMenu()
                ),
                React.createElement(
                    "div",
                    { className: css.content },
                    this.setContent()
                )
            );
        }
    }, {
        key: "setMenu",
        value: function setMenu() {
            var _this2 = this;

            return this.state.data.map(function (d, i) {
                var li = "";
                if (d.hasOwnProperty("child")) {
                    li = React.createElement(
                        "div",
                        { key: i },
                        React.createElement(
                            "div",
                            { className: css.li },
                            d.titleText
                        ),
                        d.child.map(function (d1, j) {
                            var className = d1 == _this2.state.activeNav ? css.liActive : css.li;
                            var secondLi = React.createElement(
                                "div",
                                { key: j, className: className, onClick: function onClick() {
                                        _this2.setState({ activeNav: d1 });
                                    } },
                                d1
                            );
                            return secondLi;
                        })
                    );
                } else {
                    li = React.createElement(
                        "div",
                        { key: i,
                            className: d.titleText == _this2.state.activeNav ? css.liActive : css.li,
                            onClick: function onClick() {
                                _this2.setState({ activeNav: d.titleText });
                            } },
                        d.titleText
                    );
                }
                return li;
            });
        }
    }, {
        key: "setContent",
        value: function setContent() {
            var _this3 = this;

            var firstIndex = -1,
                secondIndex = -1;
            this.state.data.forEach(function (d, i) {
                if (d.hasOwnProperty("child")) {
                    d.child.map(function (d1, j) {
                        if (d1 == _this3.state.activeNav) {
                            firstIndex = i;
                            secondIndex = j;
                        }
                    });
                } else {
                    if (d.titleText == _this3.state.activeNav) {
                        firstIndex = i;
                    }
                }
            });
            var activeContent = "";
            if (firstIndex >= 0) {
                activeContent = this.state.content[firstIndex];
                if (secondIndex >= 0) {
                    activeContent = activeContent.props.children[secondIndex];
                }
            }
            return activeContent;
        }
    }]);

    return nav;
}(React.Component);

module.exports = nav;

//# sourceMappingURL=index.js.map