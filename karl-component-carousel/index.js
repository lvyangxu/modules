"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");
var $ = require("jquery");

var carousel = function (_React$Component) {
    _inherits(carousel, _React$Component);

    function carousel(props) {
        _classCallCheck(this, carousel);

        var _this = _possibleConstructorReturn(this, (carousel.__proto__ || Object.getPrototypeOf(carousel)).call(this, props));

        _this.state = {
            content: [],
            itemWidth: 200,
            index: 1,
            isMouseDown: false
        };
        var bindArr = ["touch", "switchTo", "switchRemain"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(carousel, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            // this.touch();
            this.mouse();

            var content = this.props.children.concat();
            var firstElement = content[0];
            var lastElement = content[content.length - 1];
            content = [lastElement].concat(content, firstElement);
            this.setState({
                content: content
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: css.base + " react-carousel" },
                React.createElement(
                    "div",
                    { style: {
                            width: 100 * this.state.content.length + "%"
                        }, className: css.container, ref: function ref(d) {
                            _this2.container = d;
                        } },
                    this.state.content.map(function (d, i) {
                        return React.createElement(
                            "div",
                            { key: i, style: {
                                    width: 100 / _this2.state.content.length + "%"
                                },
                                className: css.item },
                            React.createElement(
                                "div",
                                { className: css.inner },
                                d
                            )
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { className: css.dots },
                    this.state.content.filter(function (d, i) {
                        if (i == 0 || i == _this2.state.content.length - 1) {
                            return false;
                        } else {
                            return true;
                        }
                    }).map(function (d, i) {
                        return React.createElement("div", { key: i,
                            className: _this2.state.index - 1 == i ? css.dot + " " + css.active : css.dot,
                            onClick: function onClick() {
                                _this2.switchTo(i + 1);
                            } });
                    })
                )
            );
        }
    }, {
        key: "switchTo",
        value: function switchTo(i) {
            var _this3 = this;

            $(this.container).animate({ marginLeft: -i * 100 + "%" }, function () {
                //left to the start
                if (i == 0) {
                    i = _this3.state.content.length - 2;
                    $(_this3.container).css({ marginLeft: -i * 100 + "%" });
                    _this3.setState({
                        index: i
                    });
                }

                //right to the end
                if (i == _this3.state.content.length - 1) {
                    i = 1;
                    $(_this3.container).css({ marginLeft: -i * 100 + "%" });
                    _this3.setState({
                        index: i
                    });
                }
            });
            this.setState({
                index: i,
                isMouseDown: false
            });
        }
    }, {
        key: "touch",
        value: function touch() {
            var _this4 = this;

            //touch
            this.container.addEventListener('touchstart', function (e) {
                var _e$touches$ = e.touches[0];
                var x = _e$touches$.pageX;
                var y = _e$touches$.pageY;

                _this4.onMoveStart(x, y);
            }, false);
            this.container.addEventListener('touchmove', function (e) {
                var _e$touches$2 = e.touches[0];
                var x = _e$touches$2.pageX;
                var y = _e$touches$2.pageY;

                _this4.onMove(x, y);
            }, false);
            this.container.addEventListener('touchend', this.onMoveEnd);
        }
    }, {
        key: "mouse",
        value: function mouse() {
            var _this5 = this;

            // mouse
            this.container.addEventListener('mousedown', function (e) {
                e.preventDefault();
                _this5.setState({
                    startX: e.pageX,
                    isMouseDown: true
                });
            }, false);
            this.container.addEventListener('mousemove', function (e) {
                e.preventDefault();
                if (_this5.state.startX && _this5.state.isMouseDown) {
                    _this5.setState({
                        endX: e.pageX
                    });

                    var deltaX = e.pageX - _this5.state.startX;
                    var isChangeIndex = -1;
                    if ($(_this5.container).is(":animated")) {
                        //if right to the end,then switch like film
                        if (deltaX < 0 && _this5.state.index == _this5.state.content.length - 2) {
                            isChangeIndex = 1;
                        }
                        //if left to the start,then switch like film
                        if (deltaX > 0 && _this5.state.index == 1) {
                            isChangeIndex = _this5.state.content.length - 2;
                        }
                        $(_this5.container).stop();
                    }
                    var endMarginLeft = void 0;
                    var deltaXPercent = deltaX * _this5.state.content.length / $(_this5.container).width();
                    if (isChangeIndex != -1) {
                        endMarginLeft = (-isChangeIndex + deltaXPercent) * 100 + "%";
                    } else {
                        endMarginLeft = (-_this5.state.index + deltaXPercent) * 100 + "%";
                    }
                    $(_this5.container).css({ marginLeft: endMarginLeft });
                }
            }, false);
            this.container.addEventListener('mouseleave', function (e) {
                _this5.switchRemain(e);
            }, false);
            this.container.addEventListener('mouseup', function (e) {
                _this5.switchRemain(e);
            }, false);
        }
    }, {
        key: "switchRemain",
        value: function switchRemain(e) {
            e.preventDefault();

            var deltaX = this.state.endX - this.state.startX;
            this.setState({
                startX: undefined,
                endX: undefined
            });

            if (Math.abs(deltaX) < 30) {
                this.switchTo(this.state.index);
                return;
            }
            var endIndex = void 0;
            var endMin = 0;
            var endMax = this.state.content.length - 1;

            if (deltaX >= 30) {
                //drag right
                endIndex = this.state.index - 1;
                endIndex = Math.max(endIndex, endMin);
            } else if (deltaX <= -30) {
                //drag left
                endIndex = this.state.index + 1;
                endIndex = Math.min(endIndex, endMax);
            }
            endIndex = endIndex == undefined ? this.state.index : endIndex;
            this.switchTo(endIndex);
        }
    }]);

    return carousel;
}(React.Component);

module.exports = carousel;

//# sourceMappingURL=index.js.map