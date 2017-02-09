"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("./index.css");

var _index2 = _interopRequireDefault(_index);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * react轮播组件,组件第一级子元素为进行轮播的dom
 * dots：为false或"false"时不显示，默认显示
 * auto：为false或"false"时不自动播放，默认自动播放，间隔为5秒
 *
 * 示例：
 * <Carousel>
 *     <img src="1.png"/>
 *     <img src="2.png"/>
 *     <img src="3.png"/>
 * </Carousel>
 */
var scroll = function (_React$Component) {
    _inherits(scroll, _React$Component);

    function scroll(props) {
        _classCallCheck(this, scroll);

        var _this = _possibleConstructorReturn(this, (scroll.__proto__ || Object.getPrototypeOf(scroll)).call(this, props));

        _this.state = {
            content: [],
            index: 0,
            isMouseDown: false,
            isScrolling: false
        };
        var bindArr = ["delegateScroll", "delegateTouch", "animateTo", "cssTo", "startMove", "doMove", "endMove", "autoPlay"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(scroll, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            // this.delegateTouch();
            this.delegateScroll();
            var content = this.props.children.concat();
            this.setState({
                content: content,
                dots: !(this.props.dots == false || this.props.dots == "false"),
                auto: !(this.props.auto == false || this.props.auto == "false")
            });

            if (this.props.auto == true || this.props.auto == "true") {
                this.autoPlay();
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: _index2.default.base + " react-scroll" },
                _react2.default.createElement(
                    "div",
                    { className: _index2.default.container, ref: function ref(d) {
                            _this2.container = d;
                        } },
                    this.state.content.map(function (d, i) {
                        var style = Object.assign({
                            height: (0, _jquery2.default)(window).height()
                        }, d.props.style);
                        var json = {
                            style: style,
                            className: _index2.default.item,
                            key: i
                        };
                        var dom = _react2.default.cloneElement(d, json);
                        return dom;
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: _index2.default.dots, style: this.state.dots ? {} : { display: "none" } },
                    this.state.content.map(function (d, i) {
                        return _react2.default.createElement("div", { key: i,
                            className: _this2.state.index == i ? _index2.default.dot + " " + _index2.default.active : _index2.default.dot,
                            onClick: function onClick() {
                                _this2.animateTo(i);
                            } });
                    })
                )
            );
        }
    }, {
        key: "autoPlay",
        value: function autoPlay() {
            var _this3 = this;

            setTimeout(function () {
                if (_this3.state.manual) {
                    return;
                }
                if (!_this3.state.isHover) {
                    if (_this3.state.index == _this3.state.content.length - 2) {
                        _this3.cssTo(0);
                        _this3.animateTo(1);
                    } else {
                        _this3.animateTo(_this3.state.index + 1);
                    }
                }
                _this3.autoPlay();
            }, 5000);
        }
    }, {
        key: "animateTo",
        value: function animateTo(i) {
            // $(this.container).animate({marginLeft: -i * 100 + "%"});
            // this.setState({
            //     index: i,
            //     isMouseDown: false
            // });
        }
    }, {
        key: "cssTo",
        value: function cssTo(i, offset) {
            // offset = (offset == undefined) ? 0 : offset;
            // $(this.container).css({marginLeft: -i * 100 + offset + "%"});
            // this.setState({
            //     index: i
            // });
        }
    }, {
        key: "startMove",
        value: function startMove(x) {
            this.setState({
                startX: x,
                isMouseDown: true,
                manual: true
            });
        }
    }, {
        key: "doMove",
        value: function doMove(x) {
            if (this.state.startX && this.state.isMouseDown) {
                this.setState({
                    endX: x
                });

                var deltaX = x - this.state.startX;
                if ((0, _jquery2.default)(this.container).is(":animated")) {
                    (0, _jquery2.default)(this.container).stop();
                }
                var endMarginLeft = void 0;
                var deltaXPercent = deltaX * this.state.content.length / (0, _jquery2.default)(this.container).width();
                endMarginLeft = (-this.state.index + deltaXPercent) * 100 + "%";
                (0, _jquery2.default)(this.container).css({ marginLeft: endMarginLeft });
            }
        }
    }, {
        key: "endMove",
        value: function endMove() {
            var deltaX = this.state.endX - this.state.startX;
            this.setState({
                startX: undefined,
                endX: undefined
            });

            if (Math.abs(deltaX) < 30) {
                this.animateTo(this.state.index);
                return;
            }
            var endIndex = void 0;
            var endMin = 0;
            var endMax = this.state.content.length - 1;

            if (deltaX >= 30) {
                //drag right
                endIndex = this.state.index - 1;
                endIndex = Math.max(endIndex, endMin);
                if (endIndex == 0) {
                    endIndex = this.state.content.length - 1;
                    var offset = (0, _jquery2.default)(this.container).css("marginLeft");
                    offset = Number.parseFloat(offset) * this.state.content.length / (0, _jquery2.default)(this.container).width();
                    offset = offset + 1;
                    offset = offset * 100;
                    this.cssTo(endIndex, offset);
                    endIndex--;
                }
            } else if (deltaX <= -30) {
                //drag left
                endIndex = this.state.index + 1;
                endIndex = Math.min(endIndex, endMax);
                if (endIndex == this.state.content.length - 1) {
                    endIndex = 0;
                    var _offset = (0, _jquery2.default)(this.container).css("marginLeft");
                    _offset = Number.parseFloat(_offset) * this.state.content.length / (0, _jquery2.default)(this.container).width();
                    _offset = _offset + this.state.content.length - 2;
                    _offset = _offset * 100;
                    this.cssTo(endIndex, _offset);
                    endIndex++;
                }
            }
            endIndex = endIndex == undefined ? this.state.index : endIndex;
            this.animateTo(endIndex);
        }
    }, {
        key: "delegateTouch",
        value: function delegateTouch() {
            var _this4 = this;

            this.container.addEventListener('touchstart', function (e) {
                e.preventDefault();
                _this4.startMove(e.touches[0].pageX);
            }, false);
            this.container.addEventListener('touchmove', function (e) {
                e.preventDefault();
                _this4.doMove(e.touches[0].pageX);
            }, false);
            this.container.addEventListener('touchend', function (e) {
                e.preventDefault();
                _this4.endMove();
            });
        }
    }, {
        key: "delegateMouse",
        value: function delegateMouse() {
            var _this5 = this;

            this.container.addEventListener('mouseover', function (e) {
                e.preventDefault();
                _this5.setState({
                    isHover: true
                });
            }, false);
            this.container.addEventListener('mousedown', function (e) {
                e.preventDefault();
                _this5.startMove(e.pageX);
            }, false);
            this.container.addEventListener('mousemove', function (e) {
                e.preventDefault();
                _this5.doMove(e.pageX);
            }, false);
            this.container.addEventListener('mouseleave', function (e) {
                e.preventDefault();
                _this5.setState({
                    isHover: false
                });
                _this5.endMove();
            }, false);
            this.container.addEventListener('mouseup', function (e) {
                e.preventDefault();
                _this5.endMove();
            }, false);
        }
    }, {
        key: "delegateScroll",
        value: function delegateScroll() {
            var _this6 = this;

            (0, _jquery2.default)(document).delegate("", "mousewheel DOMMouseScroll", function (event) {
                event.preventDefault();
                if (_this6.state.isScrolling) {
                    return;
                }
                var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                var index = _this6.state.index;
                if (delta > 0) {
                    //朝上
                    if (index != 0) {
                        index--;
                    }
                } else {
                    if (index != _this6.state.content.length - 1) {
                        index++;
                    }
                }

                _this6.setState({
                    isScrolling: true,
                    index: index
                }, function () {
                    (0, _jquery2.default)(_this6.container).animate({
                        "margin-top": -(0, _jquery2.default)(window).height() * _this6.state.index
                    }, 800, "linear", function () {
                        _this6.setState({ isScrolling: false });
                    });
                });
            });
        }
    }]);

    return scroll;
}(_react2.default.Component);

module.exports = scroll;
