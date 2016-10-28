"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");
// var ReactTransitionGroup = require('react-addons-transition-group')

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// class TransitionItem extends React.Component{
//     constructor(props) {
//         super(props);
//     }
//
//     componentWillAppear(done) {
//         console.log('componentWillAppear', arguments);
//         done();
//     }
//
//     componentDidAppear() {
//         console.log('componentDidAppear', arguments);
//     }
//
//     componentDidEnter() {
//         console.log('componentDidEnter', arguments);
//     }
//
//     componentDidLeave() {
//         console.log('componentDidLeave', arguments);
//     }
//
//     render() {
//         return (
//             <div style={this.state}>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

var carousel = function (_React$Component) {
    _inherits(carousel, _React$Component);

    function carousel(props) {
        _classCallCheck(this, carousel);

        var _this = _possibleConstructorReturn(this, (carousel.__proto__ || Object.getPrototypeOf(carousel)).call(this, props));

        _this.state = {
            content: [],
            itemWidth: 200,
            index: 0
        };
        var bindArr = [];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(carousel, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                content: this.props.children
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}

        //                    {/*marginLeft: -this.state.index * 100 + "%"*/}

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
                        }, className: css.container },
                    React.createElement(
                        ReactCSSTransitionGroup,
                        { transitionAppearTimeout: 5000,
                            transitionEnterTimeout: 5000,
                            transitionLeaveTimeout: 5000,
                            transitionName: {
                                enter: css.enter,
                                enterActive: css.enterActive,
                                leave: css.leave,
                                leaveActive: css.leaveActive
                            } },
                        this.state.content.filter(function (d, i) {
                            return i == _this2.state.index;
                        }).map(function (d, i) {
                            return React.createElement(
                                "div",
                                { key: i, style: { width: 100 / _this2.state.content.length + "%" },
                                    className: css.item },
                                React.createElement(
                                    "div",
                                    { className: css.inner },
                                    d
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    "div",
                    { className: css.dots },
                    this.state.content.map(function (d, i) {
                        return React.createElement("div", { key: i,
                            className: _this2.state.index == i ? css.dot + " " + css.active : css.dot,
                            onClick: function onClick() {
                                _this2.setState({ index: i });
                            } });
                    })
                )
            );
        }
    }]);

    return carousel;
}(React.Component);

module.exports = carousel;

//# sourceMappingURL=index.js.map