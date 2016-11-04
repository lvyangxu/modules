"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
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
        var bindArr = ["delegateMouse", "delegateTouch", "animateTo", "cssTo", "startMove", "doMove", "endMove", "autoPlay"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(carousel, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.delegateMouse();
            this.delegateTouch();
            var content = this.props.children.concat();
            var firstElement = content[0];
            var lastElement = content[content.length - 1];
            content = [lastElement].concat(content, firstElement);
            this.setState({
                content: content,
                dots: !(this.props.dots == false || this.props.dots == "false"),
                arrows: !(this.props.arrows == false || this.props.arrows == "false"),
                auto: !(this.props.auto == false || this.props.auto == "false")
            });

            if (!(this.props.auto == false || this.props.auto == "false")) {
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

            return React.createElement(
                "div",
                { className: css.base + " react-carousel" },
                React.createElement(
                    "div",
                    { style: {
                            width: 100 * this.state.content.length + "%",
                            marginLeft: "-100%"
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
                    { className: css.dots, style: this.state.dots ? {} : { display: "none" } },
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
                                _this2.animateTo(i + 1);
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
            $(this.container).animate({ marginLeft: -i * 100 + "%" });
            this.setState({
                index: i,
                isMouseDown: false
            });
        }
    }, {
        key: "cssTo",
        value: function cssTo(i, offset) {
            offset = offset == undefined ? 0 : offset;
            $(this.container).css({ marginLeft: -i * 100 + offset + "%" });
            this.setState({
                index: i
            });
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
                if ($(this.container).is(":animated")) {
                    $(this.container).stop();
                }
                var endMarginLeft = void 0;
                var deltaXPercent = deltaX * this.state.content.length / $(this.container).width();
                endMarginLeft = (-this.state.index + deltaXPercent) * 100 + "%";
                $(this.container).css({ marginLeft: endMarginLeft });
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
                    var offset = $(this.container).css("marginLeft");
                    offset = Number.parseFloat(offset) * this.state.content.length / $(this.container).width();
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
                    var _offset = $(this.container).css("marginLeft");
                    _offset = Number.parseFloat(_offset) * this.state.content.length / $(this.container).width();
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
    }]);

    return carousel;
}(React.Component);

module.exports = carousel;

//# sourceMappingURL=index.js.map