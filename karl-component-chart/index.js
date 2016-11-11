"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var css = require("./index.css");
require("karl-extend");
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
        data = _this.fillData(data, _this.props.y);
        var yAxisNumArr = _this.getYAxisNumArr(_this.props.y, data);
        var y = _this.setColor(_this.props.y);

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
            yUnitLength: 50 * 0.8 / (yAxisNumArr.length - 1),
            angleNum: _this.props.angleNum ? _this.props.angleNum : 12,
            endPointLineLength: _this.props.endPointLineLength ? _this.props.endPointLineLength : 0.1
        };
        var bindArr = ["sortData", "fillData", "vectorTransformToSvg", "xTransformToSvg", "yTransformToSvg", "yTransformToNatural", "getYAxisNumArr", "setActive", "getNearestSeries", "setColor", "setTips"];
        bindArr.forEach(function (d) {
            _this[d] = _this[d].bind(_this);
        });
        return _this;
    }

    _createClass(chart, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var lineDots = this.state.y.map(function (d) {
                var vectors = _this2.state.data.map(function (d1, j) {
                    var id = d.id;
                    var x = _this2.xTransformToSvg(j);
                    var y = _this2.yTransformToSvg(d1[id]);
                    var vector = { x: x, y: y };
                    return vector;
                });
                return { id: d.id, vectors: vectors };
            });
            var json = { lineDots: lineDots };
            var ua = window.navigator.userAgent;
            if (ua.includes("Trident/7.0") || ua.includes("MSIE ")) {
                json.isIE = true;
                json.svgWidth = $(this.svg).width();
                json.svgHeight = $(this.svg).width() * 60 / 110;
            } else {
                this.state.y.forEach(function (d) {
                    var length = _this2["curve" + d.id].getTotalLength();
                    $(_this2["curve" + d.id]).css({
                        "stroke-dasharray": length,
                        "stroke-dashoffset": length
                    });
                });
            }

            this.setState(json);
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
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (!(prevState.tipsX == this.state.tipsX && prevState.tipsY == this.state.tipsY) && this.state.tipsX && this.state.tipsY) {
                console.log(this.tipsText);
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: css.base + " react-chart" },
                this.renderSvg()
            );
        }
    }, {
        key: "renderSvg",
        value: function renderSvg() {
            var _this3 = this;

            var svgChild = React.createElement(
                "g",
                null,
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
                        var yTextDelta = 0;
                        return React.createElement(
                            "text",
                            { key: i, x: 9, y: y + yTextDelta },
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
                        var y = 55 - i * _this3.state.yUnitLength;
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
                            var y = _this3.yTransformToSvg(d1[id]);
                            var p = "";
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
                        var style = _this3.state["curve-" + d.id + "-active"] ? { strokeWidth: 0.4 } : {};
                        return React.createElement("path", { stroke: color, key: i, d: path, ref: function ref(curve) {
                                _this3["curve" + d.id] = curve;
                            }, style: style });
                    })
                ) : "",
                React.createElement(
                    "g",
                    { className: css.dots },
                    this.state.lineDots.map(function (d, i) {
                        return d.vectors.map(function (d1) {
                            var dots = _this3.getDotsSymbol(i, d1.x, d1.y, d.id);
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
                            React.createElement("path", { style: _this3.state["dot-" + d.id + "-active"] ? { strokeWidth: 0.6 } : {},
                                stroke: color, d: "M" + x + " " + y + " h3" }),
                            _this3.getDotsSymbol(i, 92.5, y, d.id),
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
                            { title: "reset color", className: css.setColor, onClick: function onClick() {
                                    _this3.setColor();
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
                ),
                this.state.tipsX && this.state.tipsY ? React.createElement(
                    "g",
                    { className: css.tips },
                    this.setTipsText(),
                    this.setTips()
                ) : ""
            );
            var svgTag = this.state.svgWidth ? React.createElement(
                "svg",
                { viewBox: "0 0 110 60", width: this.state.svgWidth, height: this.state.svgHeight,
                    onMouseMove: this.setActive,
                    ref: function ref(svg) {
                        _this3.svg = svg;
                    } },
                svgChild
            ) : React.createElement(
                "svg",
                { viewBox: "0 0 110 60", onMouseMove: this.setActive, ref: function ref(svg) {
                        _this3.svg = svg;
                    } },
                svgChild
            );
            return svgTag;
        }

        /**
         * sort data by x axis value
         * @param d
         * @returns {Array.<T>|string|Buffer|*|{options, browsertest, dist, rhino, rhinolessc}}
         */

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

        /**
         * fill 0 if y don't have value
         * @param data
         * @param y
         * @returns {*}
         */

    }, {
        key: "fillData",
        value: function fillData(data, y) {
            data = data.map(function (d) {
                y.forEach(function (d1) {
                    if (!d.hasOwnProperty(d1.id)) {
                        d[d1.id] = 0;
                    }
                });
                return d;
            });
            return data;
        }

        /**
         *
         * @param yData this.props.y
         * @param data this.props.data
         * @returns {Array}
         */

    }, {
        key: "getYAxisNumArr",
        value: function getYAxisNumArr(yData, data) {
            //get max y num and min y num
            var max = void 0,
                min = void 0;
            yData.forEach(function (d) {
                data.forEach(function (d1) {
                    var d2 = d1[d.id];
                    if (max == undefined) {
                        max = d2;
                    } else {
                        max = Math.max(d2, max);
                    }
                    if (min == undefined) {
                        min = d2;
                    } else {
                        min = Math.min(d2, min);
                    }
                });
            });

            var yStart = Math.abs(min);
            var yEnd = Math.abs(max);
            var pStart = void 0,
                pEnd = 0;
            if (yStart < 1 && yEnd < 1) {
                //from 0 to lower
                if (yStart != 0) {
                    pStart = 0;
                    while (yStart * 10 <= 1) {
                        yStart = yStart * 10;
                        pStart--;
                    }
                }
                while (yEnd * 10 <= 1) {
                    yEnd = yEnd * 10;
                    pEnd--;
                }
            } else {
                //from 10 to bigger
                pStart = 0;
                pStart++;
                pEnd++;
                while (yStart / 10 > 1) {
                    yStart = yStart / 10;
                    pStart++;
                }
                while (yEnd / 10 > 1) {
                    yEnd = yEnd / 10;
                    pEnd++;
                }
            }

            //get calibration start and end
            var p = void 0;
            if (pStart == undefined) {
                p = pEnd;
            } else {
                p = Math.max(pStart, pEnd);
            }
            var yAixsStart = void 0,
                yAixsEnd = void 0;
            var calibration = Math.pow(10, p - 1);
            if (min < 0 && max < 0) {
                yAixsStart = -Math.pow(10, p);
                yAixsEnd = 0;
            } else if (min < 0 && max >= 0) {
                yAixsStart = -Math.pow(10, p);
                yAixsEnd = Math.pow(10, p);
                calibration = calibration * 2;
            } else if (min >= 0 && max >= 0) {
                yAixsStart = 0;
                yAixsEnd = Math.pow(10, p);
            }
            var calibrationStart = void 0,
                calibrationEnd = void 0;
            for (var i = yAixsStart; i <= yAixsEnd; i = i + calibration) {
                if (p <= 0) {
                    var scale = Math.pow(10, -p + 1);
                    if (i * scale + calibration * scale >= min * scale) {
                        calibrationStart = i;
                        break;
                    }
                } else {
                    if (i + calibration >= min) {
                        calibrationStart = i;
                        break;
                    }
                }
            }
            for (var _i = yAixsStart; _i <= yAixsEnd; _i = _i + calibration) {
                if (p <= 0) {
                    var _scale = Math.pow(10, -p + 1);
                    if (_i * _scale + calibration * _scale >= max * _scale) {
                        calibrationEnd = (_i * _scale + calibration * _scale) / _scale;
                        break;
                    }
                } else {
                    if (_i + calibration >= max) {
                        calibrationEnd = _i + calibration;
                        break;
                    }
                }
            }

            var yAxisNumArr = [];
            var n = void 0;
            if (p <= 0) {
                var _scale2 = Math.pow(10, -p + 1);
                n = (calibrationEnd * _scale2 - calibrationStart * _scale2) / (calibration * _scale2);
            } else {
                n = (calibrationEnd - calibrationStart) / calibration;
            }
            var step = calibration;
            var fixedNum = -p + 1;
            switch (n) {
                case 1:
                case 2:
                    step = (calibrationEnd - calibrationStart) / 10;
                    fixedNum++;
                    break;
                case 3:
                    step = (calibrationEnd - calibrationStart) / 6;
                    fixedNum++;
                    break;
                case 4:
                    step = (calibrationEnd - calibrationStart) / 8;
                    fixedNum++;
                    break;
            }

            for (var _i2 = calibrationStart; _i2 <= calibrationEnd; _i2 = _i2 + step) {
                var d = _i2;
                if (p <= 0) {
                    d = d.toFixed(fixedNum);
                }
                yAxisNumArr.push(d);
            }
            return yAxisNumArr;
        }

        /**
         * transform vector x,y to svg coordinates
         * @param vector
         * @returns {{x: *, y: *}}
         */

    }, {
        key: "vectorTransformToSvg",
        value: function vectorTransformToSvg(vector) {
            var x = vector.x;
            var y = vector.y;

            x = this.xTransformToSvg(x);
            y = this.yTransformToSvg(y);
            return { x: x, y: y };
        }

        /**
         * transform x to svg coordinates
         * @param x
         * @returns {number|*}
         */

    }, {
        key: "xTransformToSvg",
        value: function xTransformToSvg(x) {
            var w = this.state.xUnitLength;
            x = x * w + 10 + w / 2;
            return x;
        }

        /**
         * transform y to svg coordinates
         * @param y
         * @returns {*}
         */

    }, {
        key: "yTransformToSvg",
        value: function yTransformToSvg(y) {
            var min = void 0,
                max = void 0;
            this.state.yAxisNumArr.forEach(function (d) {
                if (min == undefined) {
                    min = d;
                } else {
                    min = Math.min(min, d);
                }
                if (max == undefined) {
                    max = d;
                } else {
                    max = Math.max(max, d);
                }
            });
            var yPercent = (y - min) / (max - min);
            yPercent = 1 - yPercent;
            y = 15 + yPercent * 40;
            return y;
        }

        /**
         * transform y to natural coordinates
         * @param y
         * @returns {number|*}
         */

    }, {
        key: "yTransformToNatural",
        value: function yTransformToNatural(y) {
            var min = void 0,
                max = void 0;
            this.state.yAxisNumArr.forEach(function (d) {
                if (min == undefined) {
                    min = d;
                } else {
                    min = Math.min(min, d);
                }
                if (max == undefined) {
                    max = d;
                } else {
                    max = Math.max(max, d);
                }
            });
            var yPercent = (55 - y) / 55;
            y = (max - min) * yPercent + min;
            return y;
        }

        /**
         * get bezier curve point x1,y1 and x2,y2
         * @param lastX
         * @param lastY
         * @param x
         * @param y
         * @returns {{x1: (number|*), y1: *, x2: (number|*), y2: *}}
         */

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

        /**
         * get dots symbol
         * @param index
         * @param x
         * @param y
         * @param id
         * @returns {*}
         */

    }, {
        key: "getDotsSymbol",
        value: function getDotsSymbol(index, x, y, id) {
            var dots = void 0,
                r = void 0;
            var color = this.state.y[index].color;
            switch (index % 5) {
                //circle
                case 0:
                    r = 0.3;
                    dots = React.createElement("circle", { stroke: color, fill: color, cx: x, cy: y, r: r,
                        style: this.state["dot-" + id + "-active"] ? { strokeWidth: 0.6 } : {} });
                    break;
                //square
                case 1:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z",
                        style: this.state["dot-" + id + "-active"] ? { strokeWidth: 0.6 } : {} });
                    break;
                //square rotate -45 angle
                case 2:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color, transform: "rotate(-45," + x + "," + y + ")",
                        d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " v" + r + " h-" + r + " z",
                        style: this.state["dot-" + id + "-active"] ? { strokeWidth: 0.6 } : {} });
                    break;
                //triangle
                case 3:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y + r / 2) + " h" + r + " L" + x + " " + (y - r / 2) + " z",
                        style: this.state["dot-" + id + "-active"] ? { strokeWidth: 0.6 } : {} });
                    break;
                //inverted triangle
                case 4:
                    r = 0.4;
                    dots = React.createElement("path", { stroke: color, fill: color, d: "M" + (x - r / 2) + " " + (y - r / 2) + " h" + r + " L" + x + " " + (y + r / 2) + " z",
                        style: this.state["dot-" + id + "-active"] ? { strokeWidth: 0.6 } : {} });
                    break;

            }
            return dots;
        }

        /**
         * set active when mouse hover
         * @param e
         */

    }, {
        key: "setActive",
        value: function setActive(e) {
            var _this5 = this;

            var offset = $(this.svg).offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            x = x / $(this.svg).width() * 110;
            y = y / $(this.svg).height() * 60;

            var _getNearestSeries = this.getNearestSeries(x, y);

            var series = _getNearestSeries.series;
            var tipsX = _getNearestSeries.tipsX;
            var tipsY = _getNearestSeries.tipsY;
            var activeX = _getNearestSeries.activeX;

            if (series) {
                (function () {
                    var json = { tipsX: tipsX, tipsY: tipsY, activeSeries: series, activeX: activeX };
                    json["dot-" + series + "-active"] = true;
                    json["curve-" + series + "-active"] = true;
                    _this5.state.y.filter(function (d) {
                        return d.id != series;
                    }).forEach(function (d) {
                        json["dot-" + d.id + "-active"] = false;
                        json["curve-" + d.id + "-active"] = false;
                    });
                    _this5.setState(json);
                })();
            } else {
                (function () {
                    var json = { tipsX: tipsX, tipsY: tipsY, activeSeries: series, activeX: activeX };
                    _this5.state.y.forEach(function (d) {
                        json["dot-" + d.id + "-active"] = false;
                        json["curve-" + d.id + "-active"] = false;
                    });
                    _this5.setState(json);
                })();
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
            var _this6 = this;

            var series = void 0;
            var tipsX = void 0,
                tipsY = void 0,
                index = void 0,
                activeX = void 0;
            if (x >= 10 && x <= 90 && y >= 15 && y <= 55) {
                var w = this.state.xUnitLength;
                //find the corresponding y by x and slope
                var yMap = [];
                if (x <= 10 + w / 2) {
                    tipsX = 10 + w / 2;
                    index = 0;
                    yMap = this.state.lineDots.map(function (d) {
                        var lineY = d.vectors[0].y;
                        return { id: d.id, y: lineY };
                    });
                } else if (x >= 90 - w / 2) {
                    tipsX = 10 + w / 2 + (this.state.data.length - 1) * w;
                    index = this.state.data.length - 1;
                    yMap = this.state.lineDots.map(function (d) {
                        var lineY = d.vectors[d.vectors.length - 1].y;
                        return { id: d.id, y: lineY };
                    });
                } else {
                    (function () {
                        var startIndex = void 0,
                            endIndex = void 0;
                        for (var i = 0; i < _this6.state.data.length - 1; i++) {
                            var startX = 10 + i * w + w / 2;
                            var endX = 10 + (i + 1) * w + w / 2;
                            if (x >= startX && x <= endX) {
                                startIndex = i;
                                endIndex = i + 1;
                                break;
                            }
                        }
                        var x1 = 10 + startIndex * w + w / 2;
                        var x2 = 10 + endIndex * w + w / 2;
                        if (x <= (x1 + x2) / 2) {
                            tipsX = 10 + w / 2 + startIndex * w;
                            index = startIndex;
                        } else {
                            tipsX = 10 + w / 2 + endIndex * w;
                            index = endIndex;
                        }

                        yMap = _this6.state.lineDots.map(function (d) {
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
                    for (var i = 0; i < yMap.length - 1; i++) {
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
                var vectors = this.state.lineDots.find(function (d) {
                    return d.id == series;
                }).vectors;
                var vector = vectors[index];
                tipsY = vector.y;
                activeX = this.state.data[index][this.state.x];
            }
            return { series: series, tipsX: tipsX, tipsY: tipsY, activeX: activeX };
        }

        /**
         * set color
         * @param propsY
         * @returns {*}
         */

    }, {
        key: "setColor",
        value: function setColor(propsY) {
            var y = propsY == undefined ? this.state.y : propsY;
            y = y.map(function (d) {
                var max = 230;
                var r = Math.floor(Math.random() * max);
                var g = Math.floor(Math.random() * max);
                var b = Math.floor(Math.random() * max);
                d.color = "rgba(" + r + "," + g + "," + b + ",1)";
                return d;
            });
            if (propsY != undefined) {
                return y;
            } else {
                this.setState({
                    y: y
                });
            }
        }
    }, {
        key: "setTipsText",
        value: function setTipsText() {
            var _this7 = this;

            var offsetY = 1;
            var startX = this.state.tipsX;
            var startY = this.state.tipsY - offsetY;
            var color = this.state.y.find(function (d) {
                return d.id == _this7.state.activeSeries;
            }).color;
            var xText = this.state.activeX;
            var yText = this.state.data.find(function (d) {
                return d[_this7.state.x] == xText;
            })[this.state.activeSeries];
            var text = React.createElement(
                "text",
                { color: color, x: startX, y: startY - 2, ref: function ref(d) {
                        _this7.tipsText = d;
                    } },
                React.createElement(
                    "tspan",
                    null,
                    this.state.activeSeries
                ),
                React.createElement(
                    "tspan",
                    null,
                    xText,
                    ":",
                    yText
                )
            );
            return text;
        }
    }, {
        key: "setTips",
        value: function setTips() {
            var _this8 = this;

            var offsetY = 1;
            var startX = this.state.tipsX;
            var startY = this.state.tipsY - offsetY;
            var color = this.state.y.find(function (d) {
                return d.id == _this8.state.activeSeries;
            }).color;
            var path = React.createElement("path", { stroke: color,
                d: "M" + startX + " " + startY + " l-0.2 -0.4 l" + -(this.state.xUnitLength - 0.4) + " 0 a2 2 0 0 1 0 -2 " });
            return path;
        }
    }]);

    return chart;
}(React.Component);

module.exports = chart;

//# sourceMappingURL=index.js.map