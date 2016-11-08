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
 * chart component,props means:
 */

var chart = function (_React$Component) {
    _inherits(chart, _React$Component);

    function chart(props) {
        _classCallCheck(this, chart);

        var _this = _possibleConstructorReturn(this, (chart.__proto__ || Object.getPrototypeOf(chart)).call(this, props));

        var data = _this.sortData(_this.props.data);
        var yDataMax = _this.getYDataMax(_this.props.y, data);
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
            data: data,
            lineDots: [],
            yAxisNumArr: yAxisNumArr,
            xUnitLength: 100 * 0.8 / data.length,
            yUnitLength: 50 * 0.8 / 10,
            yDataMax: yDataMax,
            angleNum: _this.props.angleNum ? _this.props.angleNum : 12,
            endPointLineLength: _this.props.endPointLineLength ? _this.props.endPointLineLength : 0.1
        };
        var bindArr = ["sortData", "vectorTransformToSvg", "xTransformToSvg", "yTransformToSvg", "yTransformToNatural", "getYAxisNumArr", "setActive", "getNearestSeries", "resetColor"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(chart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.state.y.forEach(function (d) {
                var length = _this2["curve" + d.id].getTotalLength();
                $(_this2["curve" + d.id]).css({
                    "stroke-dasharray": length,
                    "stroke-dashoffset": length
                });
            });

            var lineDots = this.state.y.map(function (d) {
                var vectors = _this2.state.data.map(function (d1, j) {
                    var id = d.id;
                    var x = _this2.xTransformToSvg(j);
                    var y = void 0;
                    if (d1.hasOwnProperty(id)) {
                        y = _this2.yTransformToSvg(d1[id]);
                    } else {
                        y = _this2.yTransformToSvg(0);
                    }
                    var vector = { x: x, y: y };
                    return vector;
                });
                return { id: d.id, vectors: vectors };
            });
            this.setState({
                lineDots: lineDots
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.data) {
                nextProps.data = this.sortData(nextProps.data);
            }
            this.setState(nextProps);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: css.base + " react-chart" },
                React.createElement(
                    "svg",
                    { viewBox: "0 0 110 60", onMouseMove: this.setActive, ref: function ref(svg) {
                            _this3.svg = svg;
                        } },
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
                            var w = _this3.state.xUnitLength;
                            var x = i * w + 10;
                            return React.createElement(
                                "g",
                                { key: i },
                                React.createElement("path", { d: "M" + x + " 55 v1" }),
                                React.createElement(
                                    "text",
                                    { x: x + w / 2, y: 60 },
                                    d[_this3.state.x]
                                )
                            );
                        })
                    ),
                    React.createElement(
                        "g",
                        { className: css.yAxis },
                        this.state.yAxisNumArr.map(function (d, i) {
                            var y = 55 - i * _this3.state.yUnitLength;
                            var yTextDelta = 1;
                            return React.createElement(
                                "text",
                                { key: i, x: 6, y: y - _this3.state.yUnitLength + yTextDelta },
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
                            var y = 55 - (i + 1) * _this3.state.yUnitLength;
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
                            var path = _this3.state.data.map(function (d1, j) {
                                var id = d.id;
                                var x = _this3.xTransformToSvg(j);
                                var y = void 0;
                                var p = "";
                                if (d1.hasOwnProperty(id)) {
                                    y = _this3.yTransformToSvg(d1[id]);
                                } else {
                                    y = _this3.yTransformToSvg(0);
                                }
                                if (j == 0) {
                                    p = "M " + x + " " + y;
                                } else {
                                    var _getBezierCurvesVecto = _this3.getBezierCurvesVector(lastX, lastY, x, y);

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
                            var color = d.color;
                            return React.createElement("path", { stroke: color, key: i, d: path, ref: function ref(curve) {
                                    _this3["curve" + d.id] = curve;
                                } });
                        })
                    ) : "",
                    React.createElement(
                        "g",
                        { className: css.dots },
                        this.state.lineDots.map(function (d, i) {
                            return d.vectors.map(function (d1, j) {
                                var dots = _this3.getDotsSymbol(i, d1.x, d1.y, "dot" + d.id + j);
                                return dots;
                            });
                        })
                    ),
                    React.createElement(
                        "g",
                        { className: css.declare },
                        this.state.y.map(function (d, i) {
                            var x = 91;
                            var y = 15 + (40 - _this3.state.y.length * _this3.state.yUnitLength) / 2 + i * _this3.state.yUnitLength;
                            var color = d.color;
                            return React.createElement(
                                "g",
                                { key: i },
                                React.createElement("path", { stroke: color, d: "M" + x + " " + y + " h3" }),
                                _this3.getDotsSymbol(i, 92.5, y),
                                React.createElement(
                                    "text",
                                    { x: "94.5", y: y + 1 },
                                    d.name
                                )
                            );
                        }),
                        React.createElement(
                            "g",
                            null,
                            React.createElement(
                                "g",
                                { title: "reset color", className: css.resetColor, onClick: function onClick() {
                                        _this3.resetColor();
                                    } },
                                this.state.y.map(function (d, i) {
                                    var color = d.color;
                                    var x = 80 + i * 1;
                                    var y1 = 5;
                                    var y2 = 7;
                                    return React.createElement("path", { key: i, strokeWidth: 1, stroke: color,
                                        d: "M" + x + " " + y1 + " L" + x + " " + y2 });
                                }),
                                React.createElement(
                                    "text",
                                    { x: 79.5 + this.state.y.length / 2, y: "4", textAnchor: "middle" },
                                    "reset color"
                                )
                            )
                        )
                    )
                )
            );
        }

        //sort data by x axis value

    }, {
        key: "sortData",
        value: function sortData(d) {
            var _this4 = this;

            var data = d.concat();
            var regex = new RegExp(/^[1-2]\d{3}-((0[1-9])|(1[0-2])|[1-9])-((0[1-9])|([1-2]\d)|(3[0-1])|[1-9])$/);
            var isDate = data.every(function (d1) {
                return regex.test(d1[_this4.props.x]);
            });
            if (isDate) {
                data.sort(function (a, b) {
                    var arr1 = a[_this4.props.x].split("-");
                    var arr2 = b[_this4.props.x].split("-");
                    if (arr1[0] != arr2[0]) {
                        return arr1[0] - arr2[0];
                    } else if (arr1[1] != arr2[1]) {
                        return arr1[1] - arr2[1];
                    } else if (arr1[2] != arr2[2]) {
                        return arr1[2] - arr2[2];
                    } else {
                        return 0;
                    }
                });
            }
            return data;
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
        key: "vectorTransformToSvg",
        value: function vectorTransformToSvg(vector) {
            var x = vector.x;
            var y = vector.y;

            var w = this.state.xUnitLength;
            x = x * w + 10 + w / 2;
            var yMax = this.state.yAxisNumArr[0] * 10;
            y = (1 - y / yMax) * 10 * 4 + 5;
            y = y + 10;
            return { x: x, y: y };
        }

        //transform x coordinates to svg coordinates

    }, {
        key: "xTransformToSvg",
        value: function xTransformToSvg(x) {
            var w = this.state.xUnitLength;
            x = x * w + 10 + w / 2;
            return x;
        }

        //transform y coordinates to svg coordinates

    }, {
        key: "yTransformToSvg",
        value: function yTransformToSvg(y) {
            var yMax = this.state.yAxisNumArr[0] * 10;
            y = (1 - y / yMax) * 10 * 4 + 5;
            y = y + 10;
            return y;
        }
    }, {
        key: "yTransformToNatural",
        value: function yTransformToNatural(y) {
            var yMax = this.state.yAxisNumArr[0] * 10;
            y = y - 10;
            y = (1 - (y - 5) / (10 * 4)) * yMax;
            return y;
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
        value: function getDotsSymbol(index, x, y, _ref) {
            var _this5 = this;

            var dots = void 0,
                r = void 0;
            var color = this.state.y[index].color;
            switch (index % 5) {
                //circle
                case 0:
                    r = 0.3;
                    dots = _ref == undefined ? React.createElement("circle", { stroke: color, fill: color, cx: x, cy: y, r: r }) : React.createElement("circle", { stroke: color, fill: color, cx: x, cy: y, r: r, ref: function ref(d) {
                            _this5[_ref] = d;
                        } });
                    break;
                //square
                case 1:
                    r = 0.4;
                    dots = _ref == undefined ? React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z" }) : React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z", ref: function ref(d) {
                            _this5[_ref] = d;
                        } });
                    break;
                //square rotate -45 angle
                case 2:
                    r = 0.4;
                    dots = _ref == undefined ? React.createElement("path", { stroke: color, fill: color, transform: "rotate(-45," + x + "," + y + ")",
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z" }) : React.createElement("path", { stroke: color, fill: color, transform: "rotate(-45," + x + "," + y + ")",
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z", ref: function ref(d) {
                            _this5[_ref] = d;
                        } });
                    break;
                //triangle
                case 3:
                    r = 0.4;
                    dots = _ref == undefined ? React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y + r / 2) + " h" + r + " L" + x + " " + (y - r / 2) + " z" }) : React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y + r / 2) + " h" + r + " L" + x + " " + (y - r / 2) + " z",
                        ref: function ref(d) {
                            _this5[_ref] = d;
                        } });
                    break;
                //inverted triangle
                case 4:
                    r = 0.4;
                    dots = _ref == undefined ? React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " L" + x + " " + (y + r / 2) + " z" }) : React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " L" + x + " " + (y + r / 2) + " z",
                        ref: function ref(d) {
                            _this5[_ref] = d;
                        } });
                    break;

            }
            return dots;
        }

        //set active when mouse hover

    }, {
        key: "setActive",
        value: function setActive(e) {
            var _this6 = this;

            var offset = $(this.svg).offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            x = x / this.svg.clientWidth * 110;
            y = y / this.svg.clientHeight * 60;
            var series = this.getNearestSeries(x, y);
            if (series) {
                $(this["curve" + series]).css({
                    "stroke-width": 0.4
                });
                this.state.y.filter(function (d) {
                    return d.id != series;
                }).forEach(function (d) {
                    $(_this6["curve" + d.id]).css({
                        "stroke-width": 0.2
                    });
                });
            } else {
                this.state.y.forEach(function (d) {
                    $(_this6["curve" + d.id]).css({
                        "stroke-width": 0.2
                    });
                });
            }
        }

        /**
         * find the nearest series
         * @param x svgX
         * @param y svgY
         * @returns {*} series
         */

    }, {
        key: "getNearestSeries",
        value: function getNearestSeries(x, y) {
            var _this7 = this;

            var series = void 0;
            if (x >= 10 && x <= 90 && y >= 15 && y <= 55) {
                (function () {
                    var w = 80 / _this7.state.data.length;
                    //find the corresponding y by x and slope
                    var yMap = [];
                    if (x < 10 + w / 2) {
                        yMap = _this7.state.lineDots.map(function (d) {
                            var lineY = d.vectors[0].y;
                            return { id: d.id, y: lineY };
                        });
                    } else if (x > 90 - w / 2) {
                        yMap = _this7.state.lineDots.map(function (d) {
                            var lineY = d.vectors[d.vectors.length - 1].y;
                            return { id: d.id, y: lineY };
                        });
                    } else {
                        (function () {
                            var startIndex = void 0,
                                endIndex = void 0;
                            for (var i = 0; i < _this7.state.data.length - 1; i++) {
                                var startX = 10 + i * w + w / 2;
                                var endX = 10 + (i + 1) * w + w / 2;
                                if (x >= startX && x <= endX) {
                                    startIndex = i;
                                    endIndex = i + 1;
                                    break;
                                }
                            }
                            yMap = _this7.state.lineDots.map(function (d) {
                                var x1 = 10 + startIndex * w + w / 2;
                                var x2 = 10 + endIndex * w + w / 2;
                                var y1 = d.vectors[startIndex].y;
                                var y2 = d.vectors[endIndex].y;
                                var slope = (y2 - y1) / (x2 - x1);
                                var lineY = (x - x1) * slope + y1;
                                return { id: d.id, y: lineY };
                            });
                        })();
                    }
                    yMap.sort(function (a, b) {
                        return a.y - b.y;
                    });
                    if (y < yMap[0].y) {
                        series = yMap[0].id;
                    } else if (y > yMap[yMap.length - 1].y) {
                        series = yMap[yMap.length - 1].id;
                    } else {
                        series = yMap[0].id;
                        for (var i = 0; i < yMap.length - 2; i++) {
                            var startY = yMap[i].y;
                            var endY = yMap[i + 1].y;
                            if (y >= startY && y <= endY) {
                                if (y < (startY + endY) / 2) {
                                    series = yMap[i].id;
                                } else {
                                    series = yMap[i + 1].id;
                                }
                                break;
                            }
                        }
                    }
                })();
            }
            return series;
        }
    }, {
        key: "resetColor",
        value: function resetColor() {
            var y = this.state.y.map(function (d) {
                var max = 230;
                var r = Math.floor(Math.random() * max);
                var g = Math.floor(Math.random() * max);
                var b = Math.floor(Math.random() * max);
                d.color = "rgba(" + r + "," + g + "," + b + ",1)";
                return d;
            });
            this.setState({
                y: y
            });
        }
    }]);

    return chart;
}(React.Component);

module.exports = chart;

//# sourceMappingURL=index.js.map