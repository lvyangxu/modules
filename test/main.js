"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var ReactDom = require("react-dom");

var Com = require("../karl-component-chart/index");
require("font-awesome-webpack");

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            a: 2
        };
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(Com, { title: "chart", yAxisText: "dollor", x: "date", type: "bar",
                    y: [{ id: "o", name: "o" }, { id: "p", name: "p" }, { id: "q", name: "q" }],
                    data: [{ date: "2016-9-11", m: 0.04, o: 1, p: 2, q: 3 }, { date: "2016-9-13", m: 0.04, n: 0.03, o: 3, p: 2 }, { date: "2016-9-12", m: 0.07, o: 5, p: 47 }, { date: "2016-9-14", m: 0.61, n: 0.05, o: 7, p: 4, q: 5 }, { date: "2016-9-15", m: 0.02, n: 0.08, p: 6 }] }),
                React.createElement(
                    "button",
                    { onClick: function onClick() {
                            _this2.setState({ a: 1 });
                        } },
                    "1"
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDom.render(React.createElement(App, null), document.getElementById("test"));

// ReactDom.render(<Com data={[1,2,3]}/>,document.getElementById("test"));
// {id: "o", name: "o"},
// {id: "p", name: "p"},
// {id: "q", name: "q"},
// {id: "r", name: "r"}

//# sourceMappingURL=main.js.map