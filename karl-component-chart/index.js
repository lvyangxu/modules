"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("font-awesome-webpack");

/**
 * chart component,props means:
 */

var chart = function (_React$Component) {
    _inherits(chart, _React$Component);

    function chart(props) {
        _classCallCheck(this, chart);

        var _this = _possibleConstructorReturn(this, (chart.__proto__ || Object.getPrototypeOf(chart)).call(this, props));

        var yDataMax = _this.getYDataMax(_this.props.y, _this.props.data);
        var yAxisNumArr = _this.getYAxisNumArr(yDataMax);
        var y = _this.props.y.map(function (d) {
            var max = 230;
            var r = Math.floor(Math.random() * max);
            var g = Math.floor(Math.random() * max);
            var b = Math.floor(Math.random() * max);
            d.color = "rgba(" + r + "," + g + "," + b + ",1)";
            return d;
        });

        _this.state = {
            x: _this.props.x,
            y: y,
            title: _this.props.title,
            yAxisText: _this.props.yAxisText,
            type: _this.props.type ? _this.props.type : "curve",
            data: _this.props.data,
            yAxisNumArr: yAxisNumArr,
            xUnitLength: 100 * 0.8 / _this.props.data.length,
            yUnitLength: 50 * 0.8 / 10,
            yDataMax: yDataMax,
            angleNum: _this.props.angleNum ? _this.props.angleNum : 12,
            endPointLineLength: _this.props.endPointLineLength ? _this.props.endPointLineLength : 0.1
        };
        var bindArr = ["vectorTransform", "getYAxisNumArr"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(chart, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState(nextProps);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: css.base + " react-chart" },
                React.createElement(
                    "svg",
                    { viewBox: "0 0 110 60", onMouseMove: this.setActive },
                    this.state.title ? React.createElement(
                        "g",
                        { className: css.title },
                        React.createElement(
                            "text",
                            { x: "50", y: "3" },
                            this.state.title
                        )
                    ) : "",
                    React.createElement(
                        "g",
                        { className: css.xAxis },
                        React.createElement("path", { d: "M10 55 h 80" }),
                        this.state.data.map(function (d, i) {
                            var w = _this2.state.xUnitLength;
                            var x = i * w + 10;
                            return React.createElement(
                                "g",
                                { key: i },
                                React.createElement("path", { d: "M" + x + " 55 v1" }),
                                React.createElement(
                                    "text",
                                    { x: x + w / 2, y: 60 },
                                    d[_this2.state.x]
                                )
                            );
                        })
                    ),
                    React.createElement(
                        "g",
                        { className: css.yAxis },
                        this.state.yAxisNumArr.map(function (d, i) {
                            var y = 55 - i * _this2.state.yUnitLength;
                            var yTextDelta = 1;
                            return React.createElement(
                                "text",
                                { key: i, x: 6, y: y - _this2.state.yUnitLength + yTextDelta },
                                d
                            );
                        })
                    ),
                    this.state.yAxisText ? React.createElement(
                        "g",
                        { className: css.yAxisText },
                        React.createElement(
                            "text",
                            { x: "3", y: "35", transform: "rotate(-90,3,35)" },
                            this.state.yAxisText
                        )
                    ) : "",
                    React.createElement(
                        "g",
                        { className: css.xGrid },
                        this.state.yAxisNumArr.map(function (d, i) {
                            var y = 55 - (i + 1) * _this2.state.yUnitLength;
                            return React.createElement("path", { key: i, d: "M10 " + y + " h 80" });
                        }),
                        React.createElement("path", { d: "M90 55 v1" })
                    ),
                    this.state.type == "curve" ? React.createElement(
                        "g",
                        { className: css.curve },
                        this.state.y.map(function (d, i) {
                            var lastX = void 0,
                                lastY = void 0;
                            var path = _this2.state.data.filter(function (d1) {
                                return d1.hasOwnProperty(d.id);
                            }).map(function (d1) {
                                var id = d.id;
                                //find the index of x axis
                                var j = _this2.state.data.findIndex(function (d2) {
                                    return d1[_this2.state.x] == d2[_this2.state.x];
                                });

                                var _vectorTransform = _this2.vectorTransform({ x: j, y: d1[id] });

                                var x = _vectorTransform.x;
                                var y = _vectorTransform.y;

                                var firstIndex = _this2.state.data.findIndex(function (d2) {
                                    return d2.hasOwnProperty(id);
                                });
                                var p = "";
                                if (j == firstIndex) {
                                    p = "M " + x + " " + y;
                                } else {
                                    var _getBezierCurvesVecto = _this2.getBezierCurvesVector(lastX, lastY, x, y);

                                    var x1 = _getBezierCurvesVecto.x1;
                                    var y1 = _getBezierCurvesVecto.y1;
                                    var x2 = _getBezierCurvesVecto.x2;
                                    var y2 = _getBezierCurvesVecto.y2;

                                    p = "C " + x1 + " " + y1 + "," + x2 + " " + y2 + "," + x + " " + y;
                                }
                                lastX = x;
                                lastY = y;
                                return p;
                            }).join(" ");
                            var color = _this2.state.y[i].color;
                            return React.createElement("path", { stroke: color, key: i, d: path });
                        })
                    ) : "",
                    React.createElement(
                        "g",
                        { className: css.dots },
                        this.state.y.map(function (d, i) {
                            return _this2.state.data.filter(function (d1) {
                                return d1.hasOwnProperty(d.id);
                            }).map(function (d1) {
                                var j = _this2.state.data.findIndex(function (d2) {
                                    return d1[_this2.state.x] == d2[_this2.state.x];
                                });

                                var _vectorTransform2 = _this2.vectorTransform({ x: j, y: d1[d.id] });

                                var x = _vectorTransform2.x;
                                var y = _vectorTransform2.y;

                                var dots = _this2.getDotsSymbol(i, x, y);
                                return dots;
                            });
                        })
                    ),
                    React.createElement(
                        "g",
                        { className: css.declare },
                        this.state.y.map(function (d, i) {
                            var x = 91;
                            var y = 15 + (40 - _this2.state.y.length * _this2.state.yUnitLength) / 2 + i * _this2.state.yUnitLength;
                            var color = d.color;
                            return React.createElement(
                                "g",
                                { key: i },
                                React.createElement("path", { stroke: color, d: "M" + x + " " + y + " h3" }),
                                _this2.getDotsSymbol(i, 92.5, y),
                                React.createElement(
                                    "text",
                                    { x: "94.5", y: y + 1 },
                                    d.name
                                )
                            );
                        })
                    )
                )
            );
        }

        //get max y num

    }, {
        key: "getYDataMax",
        value: function getYDataMax(y, data) {
            var yDataMax = 0;
            y.forEach(function (d) {
                data.filter(function (d1) {
                    return d1.hasOwnProperty(d.id);
                }).forEach(function (d1) {
                    var d2 = d1[d.id];
                    yDataMax = Math.max(d2, yDataMax);
                });
            });
            return yDataMax;
        }
    }, {
        key: "getYAxisNumArr",
        value: function getYAxisNumArr(yDataMax) {
            var p = 0;
            if (yDataMax > 1) {
                //from 10 to bigger
                p++;
                while (yDataMax / 10 > 1) {
                    yDataMax = yDataMax / 10;
                    p++;
                }
            } else {
                //from 0 to lower
                while (yDataMax * 10 <= 1) {
                    yDataMax = yDataMax * 10;
                    p--;
                }
            }

            var yAxisMax = Math.pow(10, p);
            var yAxisNumArr = [];
            for (var i = 1; i <= 10; i++) {
                var y = i * yAxisMax * 0.1;
                if (p <= 0) {
                    y = y.toFixed(-p + 1);
                }
                y = Number.parseFloat(y);
                yAxisNumArr.push(y);
            }
            return yAxisNumArr;
        }

        //transform vector x,y coordinates to svg coordinates

    }, {
        key: "vectorTransform",
        value: function vectorTransform(vector) {
            var x = vector.x;
            var y = vector.y;

            var w = this.state.xUnitLength;
            x = x * w + 10 + w / 2;
            var yMax = this.state.yAxisNumArr[0] * 10;
            y = (1 - y / yMax) * 10 * 4 + 5;
            y = y + 10;
            return { x: x, y: y };
        }

        //get bezier curve point x1,y1 and x2,y2

    }, {
        key: "getBezierCurvesVector",
        value: function getBezierCurvesVector(lastX, lastY, x, y) {
            var angleNum = this.state.angleNum;
            angleNum = angleNum / 180 * Math.PI;
            var endPointLineLength = this.state.endPointLineLength;
            var x1 = void 0,
                y1 = void 0,
                x2 = void 0,
                y2 = void 0;
            var pathLength = Math.sqrt(Math.pow(Math.abs(y - lastY), 2) + Math.pow(x - lastX, 2));
            var length = pathLength * endPointLineLength;
            var atanAngle = Math.atan(Math.abs(y - lastY) / (x - lastX));
            var anglePoint1 = Math.PI - angleNum - atanAngle;
            var anglePoint2 = Math.PI - angleNum - (Math.PI / 2 - atanAngle);
            var anglePoint1X = Math.cos(anglePoint1) * length;
            var anglePoint1Y = Math.sin(anglePoint1) * length;
            var anglePoint2X = Math.sin(anglePoint2) * length;
            var anglePoint2Y = Math.cos(anglePoint2) * length;
            x1 = Number.parseInt(lastX - anglePoint1X);
            x2 = Number.parseInt(x - anglePoint2X);
            if (y > lastY) {
                //line goes lower
                y1 = Number.parseInt(lastY + anglePoint1Y);
                y2 = Number.parseInt(y + anglePoint2Y);
            } else {
                //line goes higher
                y1 = Number.parseInt(lastY - anglePoint1Y);
                y2 = Number.parseInt(y - anglePoint2Y);
            }

            var vector = {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            };
            return vector;
        }

        //get dots symbol

    }, {
        key: "getDotsSymbol",
        value: function getDotsSymbol(index, x, y) {
            var dots = void 0,
                r = void 0;
            var color = this.state.y[index].color;
            switch (index % 5) {
                //circle
                case 0:
                    r = 0.3;
                    dots = React.createElement("circle", { stroke: color, fill: color, cx: x, cy: y, r: r });
                    break;
                //square
                case 1:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color,
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z" });
                    break;
                //square rotate -45 angle
                case 2:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color,
                        transform: "rotate(-45," + x + "," + y + ")",
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z" });
                    break;
                //triangle
                case 3:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color,
                        d: "M" + (x - r / 2) + " " + (y + r / 2) + " h" + r + " L" + x + " " + (y - r / 2) + " z" });
                    break;
                //inverted triangle
                case 4:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color,
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " L" + x + " " + (y + r / 2) + " z" });
                    break;

            }
            return dots;
        }

        //set active when mouse hover

    }, {
        key: "setActive",
        value: function setActive(e) {}
    }]);

    return chart;
}(React.Component);

module.exports = chart;

//# sourceMappingURL=index.js.map