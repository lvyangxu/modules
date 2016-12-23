import React from "react";
import css from "./index.css";
import "karl-extend";
import $ from "jquery";

/**
 * react图表组件
 * title：顶部的文字
 * yAxisText: Y轴左边的文字
 * type: 图表类型curve或bar，默认为curve
 * x: 代表x轴的id
 * y: 代表y轴的json，例如{id:id,name:name}
 * data: 包含x轴id和y轴所有或部分id的json(未被包含的id值默认为0)，例如{"x":1,"y1":4,"y2":5}
 *
 * 示例：
 * <Chart title="chart" yAxisText="kg" x="date" y={[
 *               {id: "apple", name: "apple"},
 *               {id: "banana", name: "banana"},
 *               {id: "pear", name: "pear"}
 *           ]} data={[
 *               {date: "2016-9-11", apple: 1, banana: 2, pear: 3},
 *               {date: "2016-9-13", apple: 0.03, banana: 3, pear: 2},
 *               {date: "2016-9-12", apple: 5, banana: 47},
 *               {date: "2016-9-14", apple: 0.05, banana: 7, pear: 4},
 *               {date: "2016-9-15", apple: 0.08, banana: 6}
 *           ]}/>
 *
 */
class chart extends React.Component {
    constructor(props) {
        super(props);

        let data = this.sortData(this.props.data);
        data = this.fillData(data, this.props.y);
        let yAxisNumArr = this.getYAxisNumArr(this.props.y, data);
        let y = this.setColor(this.props.y);

        this.state = {
            x: this.props.x,
            y: y,
            title: this.props.title,
            yAxisText: this.props.yAxisText,
            type: this.props.type ? this.props.type : "curve",
            data: data,
            lineDots: [],
            yAxisNumArr: yAxisNumArr,
            xUnitLength: 100 * 0.8 / data.length,
            yUnitLength: 50 * 0.8 / (yAxisNumArr.length - 1),
            angleNum: this.props.angleNum ? this.props.angleNum : 12,
            endPointLineLength: this.props.endPointLineLength ? this.props.endPointLineLength : 0.1,
            tipsRaisedX: 0.2,
            tipsRaisedY: 0.2,
            tipsMarginBottom: 1,
            tipsPaddingTop: 1,
            tipsPaddingBottom: 1,
            tipsPaddingLeft: 1,
            tipsPaddingRight: 1
        };
        let bindArr = ["sortData", "fillData", "vectorTransformToSvg", "xTransformToSvg", "yTransformToSvg", "yTransformToNatural",
            "getYAxisNumArr", "setActive", "getNearestSeries", "setColor", "setTips"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        let lineDots = this.state.y.map(d => {
            let vectors = this.state.data.map((d1, j) => {
                let id = d.id;
                let x = this.xTransformToSvg(j);
                let y = this.yTransformToSvg(d1[id]);
                let vector = {x: x, y: y};
                return vector;
            });
            return {id: d.id, vectors: vectors};
        });
        let json = {lineDots: lineDots};
        let ua = window.navigator.userAgent;
        if (ua.includes("Trident/7.0") || ua.includes("MSIE ")) {
            json.isIE = true;
            json.svgWidth = $(this.svg).width();
            json.svgHeight = $(this.svg).width() * 60 / 110;
        } else {
            switch (this.state.type) {
                case "curve":
                    this.state.y.forEach(d => {
                        let length = this["curve" + d.id].getTotalLength();
                        $(this["curve" + d.id]).css({
                            "stroke-dasharray": length,
                            "stroke-dashoffset": length
                        });
                    });
                    break;
                case "bar":
                    this.state.y.forEach(d => {
                        this.state.data.forEach((d1, i) => {
                            let length = this["bar" + d.id + i].getTotalLength();
                            $(this["bar" + d.id + i]).css({
                                "stroke-dasharray": length,
                                "stroke-dashoffset": length
                            });
                        });
                    });
                    break;
            }
        }

        this.setState(json);


    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps, prevState) {
        if (!((prevState.tipsX == this.state.tipsX) && (prevState.tipsY == this.state.tipsY)) && this.state.tipsX && this.state.tipsY) {
            let w = $(this.tipsText).width() / $(this.svg).width() * 110;
            w = w.toFixed(2);
            w = Number.parseFloat(w);
            let h = $(this.tipsText).height() / $(this.svg).height() * 60;
            h = h.toFixed(2);
            h = Number.parseFloat(h);
            this.setState({
                tipsWidth: w,
                tipsHeight: h
            });
        }
    }

    render() {
        let svgChild =
            <g>
                {
                    this.state.title ? <g className={css.title}>
                            <text x="50" y="3">{this.state.title}</text>
                        </g> : ""
                }
                <g className={css.xAxis}>
                    <path d="M10 55 h 80"/>
                    {
                        this.state.data.map((d, i) => {
                            let w = this.state.xUnitLength;
                            let x = i * w + 10;
                            return <g key={i}>
                                <path d={`M${x} 55 v1`}/>
                                <text x={x + w / 2} y={60}>{d[this.state.x]}</text>
                            </g>
                        })
                    }
                </g>
                <g className={css.yAxis}>
                    {
                        this.state.yAxisNumArr.map((d, i) => {
                            let y = 55 - i * this.state.yUnitLength;
                            let yTextDelta = 0;
                            return <text key={i} x={9} y={y + yTextDelta}>{d}</text>
                        })
                    }
                </g>
                {
                    this.state.yAxisText ? <g className={css.yAxisText}>
                            <text x="3" y="35" transform="rotate(-90,3,35)">{this.state.yAxisText}</text>
                        </g> : ""
                }

                <g className={css.xGrid}>
                    {
                        this.state.yAxisNumArr.map((d, i) => {
                            let y = 55 - i * this.state.yUnitLength;
                            return <path key={i} d={`M10 ${y} h 80`}/>
                        })
                    }
                    <path d={`M90 55 v1`}/>
                </g>
                {
                    this.renderData()
                }

                <g className={css.dots}>
                    {
                        this.state.type == "curve" ?
                            this.state.lineDots.map((d, i) => {
                                return d.vectors.map(d1 => {
                                    let dots = this.getDotsSymbol(i, d1.x, d1.y, d.id);
                                    return dots;
                                })
                            }) : ""
                    }
                </g>
                <g className={css.declare}>
                    {
                        this.state.y.map((d, i) => {
                            let x = 91;
                            let y = 15 + (40 - this.state.y.length * this.state.yUnitLength) / 2 + i * this.state.yUnitLength;
                            let color = d.color;
                            let symbol;
                            switch (this.state.type) {
                                case "curve":
                                    symbol = <g key={i}>
                                        <path style={this.state["dot-" + d.id + "-active"] ? {strokeWidth: 0.6} : {}}
                                              stroke={color} d={`M${x} ${y} h3`}/>
                                        {
                                            this.getDotsSymbol(i, 92.5, y, d.id)
                                        }
                                        <text x="94.5" y={y + 1}>{d.name}</text>
                                    </g>;
                                    break;
                                case "bar":
                                    let offsetX = this.state["dot-" + d.id + "-active"] ? 0.2 : 0;
                                    let offsetY = this.state["dot-" + d.id + "-active"] ? 0.2 : 0;
                                    symbol = <g key={i}>
                                        <rect fill={color} x={x - offsetX} y={y - offsetY} width={3 + offsetX * 2}
                                              height={1 + offsetY * 2}/>
                                        <text x="94.5" y={y + 1}>{d.name}</text>
                                    </g>;
                                    break;
                            }
                            return symbol;
                        })
                    }
                    <g className={css.setColor} onClick={() => {
                        this.setColor();
                    }}>
                        {
                            this.state.y.map((d, i) => {
                                let color = d.color;
                                let x = 80 + i * 1;
                                let y1 = 5;
                                let y2 = 7;
                                return <path key={i} strokeWidth={1} stroke={color}
                                             d={`M${x} ${y1} L${x} ${y2}`}/>
                            })
                        }
                        <text x={79.5 + this.state.y.length / 2} y="4" textAnchor="middle">reset color</text>
                    </g>
                    {
                        this.setTypeList()
                    }
                </g>
                {
                    (this.state.tipsX && this.state.tipsY) ?
                        <g className={css.tips}>
                            {
                                this.setTips()
                            }
                            {
                                this.setTipsText()
                            }
                        </g>
                        : ""
                }</g>;

        let svgTag = this.state.svgWidth ?
            <svg viewBox="0 0 110 60" width={this.state.svgWidth} height={this.state.svgHeight}
                 onMouseMove={this.setActive}
                 ref={(svg) => {
                     this.svg = svg;
                 }}>
                {
                    svgChild
                }
            </svg> :
            <svg viewBox="0 0 110 60" onMouseMove={this.setActive} ref={(svg) => {
                this.svg = svg;
            }}>
                {
                    svgChild
                }
            </svg>;
        return (
            <div className={css.base + " react-chart"}>
                {
                    svgTag
                }
            </div>
        );
    }

    /**
     * 设置所有类型的 icon
     * @returns {XML}
     */
    setTypeList() {
        let activeStyle = {};
        let inactiveStyle = {opacity: 0.3};
        let iconUnderlineStartX = this.state.type == "curve" ? 91 : 95;
        let list = <g className={css.typeList}>
            <path d={`M${iconUnderlineStartX} 3.5 l3 0`} stroke="black" strokeWidth={0.2}/>
            <g className={css.typeIcon} onClick={() => {
                this.setState({
                    type: "curve"
                });
            }}>
                <path className={css.iconBackground} d={`M91 1 h3 v3 h-3 z`}></path>
                <path fill="none" d={`M91 2 l0.5 0 l0.5 -1 l0.5 2 l0.5 -1 l1 0`}
                      style={(this.state.type == "curve") ? activeStyle : inactiveStyle}/>
            </g>
            <g className={css.typeIcon} onClick={() => {
                this.setState({
                    type: "bar"
                });
            }}>
                <path className={css.iconBackground} d={`M95 1 h3 v3 h-3 z`}></path>
                <path fill="none" d={`M95.1 2 h0.8 v1 h-0.8 z`}
                      style={(this.state.type == "bar") ? activeStyle : inactiveStyle}/>
                <path fill="none" d={`M96.1 1.5 h0.8 v1.5 h-0.8 z`}
                      style={(this.state.type == "bar") ? activeStyle : inactiveStyle}/>
                <path fill="none" d={`M97.1 1 h0.8 v2 h-0.8 z`}
                      style={(this.state.type == "bar") ? activeStyle : inactiveStyle}/>
            </g>
        </g>;
        return list;
    }

    /**
     * 如果x坐标类型为日期，则自动根据日期大小对x轴进行排序
     * @param d
     * @returns {Array.<T>|*|{options, browsertest, dist, rhino, rhinolessc}|string}
     */
    sortData(d) {
        let data = d.concat();
        let regex = new RegExp(/^[1-2]\d{3}-((0[1-9])|(1[0-2])|[1-9])-((0[1-9])|([1-2]\d)|(3[0-1])|[1-9])$/);
        let isDate = data.every(d1 => {
            return regex.test(d1[this.props.x]);
        });
        if (isDate) {
            data.sort((a, b) => {
                let arr1 = a[this.props.x].split("-");
                let arr2 = b[this.props.x].split("-");
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
     * 如果data中未指定该y的值，则默认设置为0
     * @param data
     * @param y
     * @returns {*}
     */
    fillData(data, y) {
        data = data.map(d => {
            y.forEach(d1 => {
                if (!d.hasOwnProperty(d1.id)) {
                    d[d1.id] = 0;
                }
            });
            return d;
        });
        return data;
    }

    /**
     * 获取y轴的值数组
     * @param yData this.props.y
     * @param data this.props.data
     * @returns {Array}
     */
    getYAxisNumArr(yData, data) {
        //get max y num and min y num
        let max, min;
        yData.forEach(d => {
            data.forEach(d1 => {
                let d2 = d1[d.id];
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
            })
        });

        let yStart = Math.abs(min);
        let yEnd = Math.abs(max);
        let pStart, pEnd = 0;
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
        let p;
        if (pStart == undefined) {
            p = pEnd;
        } else {
            p = Math.max(pStart, pEnd);
        }
        let yAixsStart, yAixsEnd;
        let calibration = Math.pow(10, p - 1);
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
        let calibrationStart, calibrationEnd;
        for (let i = yAixsStart; i <= yAixsEnd; i = i + calibration) {
            if (p <= 0) {
                let scale = Math.pow(10, -p + 1);
                if ((i * scale + calibration * scale) >= min * scale) {
                    calibrationStart = i;
                    break;
                }
            } else {
                if ((i + calibration) >= min) {
                    calibrationStart = i;
                    break;
                }
            }

        }
        for (let i = yAixsStart; i <= yAixsEnd; i = i + calibration) {
            if (p <= 0) {
                let scale = Math.pow(10, -p + 1);
                if ((i * scale + calibration * scale) >= max * scale) {
                    calibrationEnd = (i * scale + calibration * scale) / scale;
                    break;
                }
            } else {
                if ((i + calibration) >= max) {
                    calibrationEnd = i + calibration;
                    break;
                }
            }
        }

        let yAxisNumArr = [];
        let n;
        if (p <= 0) {
            let scale = Math.pow(10, -p + 1);
            n = (calibrationEnd * scale - calibrationStart * scale) / (calibration * scale);
        } else {
            n = (calibrationEnd - calibrationStart) / calibration;
        }
        let step = calibration;
        let fixedNum = -p + 1;
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

        for (let i = calibrationStart; i <= calibrationEnd; i = i + step) {
            let d = i;
            if (p <= 0) {
                d = d.toFixed(fixedNum);
            }
            yAxisNumArr.push(d);
        }
        return yAxisNumArr;
    }

    /**
     * 将自然坐标 x,y 转化为 svg 坐标系的值
     * @param vector
     * @returns {{x: *, y: *}}
     */
    vectorTransformToSvg(vector) {
        let {x, y} = vector;
        x = this.xTransformToSvg(x);
        y = this.yTransformToSvg(y);
        return {x: x, y: y};
    }

    /**
     * 将自然坐标 x 转化为 svg 坐标系的值
     * @param x
     * @returns {number|*}
     */
    xTransformToSvg(x) {
        let w = this.state.xUnitLength;
        x = x * w + 10 + w / 2;
        return x;
    }

    /**
     * 将自然坐标 y 转化为 svg 坐标系的值
     * @param y
     * @returns {*}
     */
    yTransformToSvg(y) {
        let min, max;
        this.state.yAxisNumArr.forEach(d => {
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
        let yPercent = (y - min) / (max - min);
        yPercent = 1 - yPercent;
        y = 15 + yPercent * 40;
        return y;
    }

    /**
     * 将svg坐标 y 转化为自然坐标系的值
     * @param y
     * @returns {number|*}
     */
    yTransformToNatural(y) {
        let min, max;
        this.state.yAxisNumArr.forEach(d => {
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
        let yPercent = (55 - y) / 55;
        y = (max - min) * yPercent + min;
        return y;
    }

    /**
     * 获取贝塞尔曲线两个点的左边 x1,y1 和 x2,y2
     * @param lastX
     * @param lastY
     * @param x
     * @param y
     * @returns {{x1: (number|*), y1: *, x2: (number|*), y2: *}}
     */
    getBezierCurvesVector(lastX, lastY, x, y) {
        let angleNum = this.state.angleNum;
        angleNum = angleNum / 180 * Math.PI;
        let endPointLineLength = this.state.endPointLineLength;
        let x1, y1, x2, y2;
        let pathLength = Math.sqrt(Math.pow(Math.abs(y - lastY), 2) + Math.pow(x - lastX, 2));
        let length = pathLength * endPointLineLength;
        let atanAngle = Math.atan(Math.abs(y - lastY) / (x - lastX));
        let anglePoint1 = Math.PI - angleNum - atanAngle;
        let anglePoint2 = Math.PI - angleNum - (Math.PI / 2 - atanAngle);
        let anglePoint1X = Math.cos(anglePoint1) * length;
        let anglePoint1Y = Math.sin(anglePoint1) * length;
        let anglePoint2X = Math.sin(anglePoint2) * length;
        let anglePoint2Y = Math.cos(anglePoint2) * length;
        x1 = Number.parseInt(lastX - anglePoint1X);
        x2 = Number.parseInt(x - anglePoint2X);
        if (y > lastY) {
            //曲线走势向下
            y1 = Number.parseInt(lastY + anglePoint1Y);
            y2 = Number.parseInt(y + anglePoint2Y);
        } else {
            //曲线走势向上
            y1 = Number.parseInt(lastY - anglePoint1Y);
            y2 = Number.parseInt(y - anglePoint2Y);
        }


        let vector = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };
        return vector;
    }

    /**
     * 获取符号的svg路径dom
     * @param index
     * @param x
     * @param y
     * @param id
     * @returns {*}
     */
    getDotsSymbol(index, x, y, id) {
        let dots, r;
        let color = this.state.y[index].color;
        switch (index % 5) {
            //圆
            case 0:
                r = 0.3;
                dots = <circle stroke={color} fill={color} cx={x} cy={y} r={r}
                               style={this.state["dot-" + id + "-active"] ? {strokeWidth: 0.6} : {}}/>;
                break;
            //正方形
            case 1:
                r = 0.4;
                dots = <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}
                             style={this.state["dot-" + id + "-active"] ? {strokeWidth: 0.6} : {}}/>;
                break;
            //正方形逆时针旋转45度
            case 2:
                r = 0.4;
                dots = <path stroke={color} fill={color} transform={`rotate(-45,${x},${y})`}
                             d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}
                             style={this.state["dot-" + id + "-active"] ? {strokeWidth: 0.6} : {}}/>;
                break;
            //三角形
            case 3:
                r = 0.4;
                dots = <path stroke={color} fill={color} d={`M${x - r / 2} ${y + r / 2} h${r} L${x} ${y - r / 2} z`}
                             style={this.state["dot-" + id + "-active"] ? {strokeWidth: 0.6} : {}}/>;
                break;
            //反三角形
            case 4:
                r = 0.4;
                dots = <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} L${x} ${y + r / 2} z`}
                             style={this.state["dot-" + id + "-active"] ? {strokeWidth: 0.6} : {}}/>;
                break;

        }
        return dots;
    }

    /**
     * 根据鼠标位置设置激活的系列
     * @param e
     */
    setActive(e) {
        let offset = $(this.svg).offset();
        let x = e.pageX - offset.left;
        let y = e.pageY - offset.top;
        x = x / $(this.svg).width() * 110;
        y = y / $(this.svg).height() * 60;
        let {series, tipsX, tipsY, activeX} = this.getNearestSeries(x, y);
        if (series) {
            let json = {tipsX: tipsX, tipsY: tipsY, activeSeries: series, activeX: activeX};
            json["dot-" + series + "-active"] = true;
            json["curve-" + series + "-active"] = true;
            this.state.y.filter(d => {
                return d.id != series;
            }).forEach(d => {
                json["dot-" + d.id + "-active"] = false;
                json["curve-" + d.id + "-active"] = false;
            });
            this.setState(json);
        } else {
            let json = {tipsX: tipsX, tipsY: tipsY, activeSeries: series, activeX: activeX};
            this.state.y.forEach(d => {
                json["dot-" + d.id + "-active"] = false;
                json["curve-" + d.id + "-active"] = false;
            });
            this.setState(json);
        }
    }

    /**
     * 寻找最近的系列
     * @param x svgX
     * @param y svgY
     * @returns {*} series
     */
    getNearestSeries(x, y) {
        let series;
        let tipsX, tipsY, index, activeX;
        if (x >= 10 && x <= 90 && y >= 15 && y <= 55) {
            let w = this.state.xUnitLength;

            switch (this.state.type) {
                case "curve":
                    //根据x和斜率寻找最近的y
                    let yMap = [];
                    if (x <= 10 + w / 2) {
                        tipsX = 10 + w / 2;
                        index = 0;
                        yMap = this.state.lineDots.map(d => {
                            let lineY = d.vectors[0].y;
                            return {id: d.id, y: lineY};
                        });
                    } else if (x >= 90 - w / 2) {
                        tipsX = 10 + w / 2 + (this.state.data.length - 1) * w;
                        index = this.state.data.length - 1;
                        yMap = this.state.lineDots.map(d => {
                            let lineY = d.vectors[d.vectors.length - 1].y;
                            return {id: d.id, y: lineY};
                        });
                    } else {
                        let startIndex, endIndex;
                        for (let i = 0; i < this.state.data.length - 1; i++) {
                            let startX = 10 + i * w + w / 2;
                            let endX = 10 + (i + 1) * w + w / 2;
                            if (x >= startX && x <= endX) {
                                startIndex = i;
                                endIndex = i + 1;
                                break;
                            }
                        }
                        let x1 = 10 + startIndex * w + w / 2;
                        let x2 = 10 + endIndex * w + w / 2;
                        if (x <= (x1 + x2) / 2) {
                            tipsX = 10 + w / 2 + startIndex * w;
                            index = startIndex;
                        } else {
                            tipsX = 10 + w / 2 + endIndex * w;
                            index = endIndex;
                        }

                        yMap = this.state.lineDots.map(d => {
                            let y1 = d.vectors[startIndex].y;
                            let y2 = d.vectors[endIndex].y;
                            let slope = (y2 - y1) / (x2 - x1);
                            let lineY = (x - x1) * slope + y1;
                            return {id: d.id, y: lineY};
                        });
                    }
                    yMap.sort((a, b) => {
                        return a.y - b.y;
                    });
                    if (y < yMap[0].y) {
                        series = yMap[0].id;
                    } else if (y > yMap[yMap.length - 1].y) {
                        series = yMap[yMap.length - 1].id;
                    } else {
                        for (let i = 0; i < yMap.length - 1; i++) {
                            let startY = yMap[i].y;
                            let endY = yMap[i + 1].y;
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
                    let vectors = this.state.lineDots.find(d => {
                        return d.id == series;
                    }).vectors;
                    let vector = vectors[index];
                    tipsY = vector.y;
                    activeX = this.state.data[index][this.state.x];
                    break;
                case "bar":
                    let barWidth = this.state.xUnitLength / ((this.state.y.length + 2) * 1.5);
                    for (let i = 0; i < this.state.y.length; i++) {
                        for (let j = 0; j < this.state.data.length; j++) {
                            let offsetX = (i - this.state.y.length / 2) * barWidth * 1.5 + 0.25 * barWidth;
                            let barStartX = this.xTransformToSvg(j) + offsetX;
                            let barEndX = barStartX + barWidth;
                            if (x >= barStartX && x <= barEndX) {
                                series = this.state.y[i].id;
                                tipsX = barStartX + barWidth / 2;
                                tipsY = this.yTransformToSvg(this.state.data[j][series]);
                                activeX = this.state.data[j][this.state.x];
                                break;
                            }
                        }
                    }
                    break;
            }

        }
        return {series: series, tipsX: tipsX, tipsY: tipsY, activeX: activeX};
    }

    /**
     * 根据图表类型渲染dom
     * @returns {*}
     */
    renderData() {
        let g;
        switch (this.state.type) {
            case "curve":
                g = <g className={css.curve}>
                    {
                        this.state.y.map((d, i) => {
                            let lastX, lastY;
                            let path = this.state.data.map((d1, j) => {
                                let id = d.id;
                                let x = this.xTransformToSvg(j);
                                let y = this.yTransformToSvg(d1[id]);
                                let p = "";
                                if (j == 0) {
                                    p = `M ${x} ${y}`;
                                } else {
                                    let {x1, y1, x2, y2} = this.getBezierCurvesVector(lastX, lastY, x, y);
                                    p = `C ${x1} ${y1},${x2} ${y2},${x} ${y}`;
                                }
                                lastX = x;
                                lastY = y;
                                return p;
                            }).join(" ");
                            let color = d.color;
                            let style = this.state["curve-" + d.id + "-active"] ? {strokeWidth: 0.4} : {};
                            return <path stroke={color} key={i} d={path} ref={curve => {
                                this["curve" + d.id] = curve;
                            }} style={style}/>
                        })
                    }
                </g>;
                break;
            case "bar":
                g = <g className={css.bar}>
                    {
                        this.state.y.map((d, i) => {
                            return this.state.data.map((d1, j) => {
                                let id = d.id;
                                let barWidth = this.state.xUnitLength / ((this.state.y.length + 2) * 1.5);
                                let offsetX = (i - this.state.y.length / 2) * barWidth * 1.5 + 0.25 * barWidth;
                                let x = this.xTransformToSvg(j) + offsetX + barWidth / 2;
                                let y = this.yTransformToSvg(d1[id]);
                                return <path stroke={d.color} strokeWidth={barWidth}
                                             d={`M${x} ${this.yTransformToSvg(0)} L${x} ${y}`}
                                             ref={bar => {
                                                 this["bar" + id + j] = bar;
                                             }}/>;
                            })

                        })
                    }
                </g>;
                break;
            default:
                g = "";
                break;
        }
        return g;
    }

    /**
     * 设置随机颜色
     * @param propsY
     * @returns {*}
     */
    setColor(propsY) {
        let y = (propsY == undefined) ? this.state.y : propsY;
        y = y.map(d => {
            let max = 230;
            let r = Math.floor(Math.random() * max);
            let g = Math.floor(Math.random() * max);
            let b = Math.floor(Math.random() * max);
            d.color = `rgba(${r},${g},${b},1)`;
            return d;
        });
        if (propsY != undefined) {
            return y;
        } else {
            this.setState({
                y: y
            })
        }
    }

    /**
     * 设置鼠标悬浮时提示的文字
     * @returns {XML}
     */
    setTipsText() {
        let startX = this.state.tipsX;
        let startY = this.state.tipsY - this.state.tipsMarginBottom - this.state.tipsRaisedY - this.state.tipsPaddingBottom;
        let color = this.state.y.find(d => {
            return d.id == this.state.activeSeries;
        }).color;
        let xText = this.state.activeX;
        let yText = this.state.data.find(d => {
            return d[this.state.x] == xText;
        })[this.state.activeSeries];
        let text = <text color={color} x={startX} y={startY} ref={d => {
            this.tipsText = d;
        }}>
            {this.state.activeSeries} : {yText}
        </text>;
        return text;
    }

    /**
     * 设置鼠标悬浮时提示的边框
     * @returns {*}
     */
    setTips() {
        let arcRx = 0.5, arcRy = 0.5;
        let startX = this.state.tipsX;
        let startY = this.state.tipsY - this.state.tipsMarginBottom;
        let color = this.state.y.find(d => {
            return d.id == this.state.activeSeries;
        }).color;
        let path = this.state.tipsWidth ?
            <path stroke={color}
                  d={`M${startX} ${startY} l${-this.state.tipsRaisedX} ${-this.state.tipsRaisedY}
                  l${-(this.state.tipsWidth / 2 - this.state.tipsRaisedX + this.state.tipsPaddingLeft)} 0
                  a${arcRx} ${arcRy} 0 0 1 ${-arcRx} ${-arcRy}
                  l0 ${-(this.state.tipsHeight + this.state.tipsPaddingBottom + this.state.tipsPaddingTop - arcRy)}
                  l${this.state.tipsWidth + this.state.tipsPaddingLeft + this.state.tipsPaddingRight + arcRx * 2} 0
                  l0 ${(this.state.tipsHeight + this.state.tipsPaddingBottom + this.state.tipsPaddingTop - arcRy)}
                  a${arcRx} ${arcRy} 0 0 1 ${-arcRx} ${arcRy}
                  l${-(this.state.tipsWidth / 2 - this.state.tipsRaisedX + this.state.tipsPaddingRight)} 0 z`}/>
            : "";
        return path;
    }

}

module.exports = chart;