let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");
let $ = require("jquery");

/**
 * chart component,props means:
 */
class chart extends React.Component {
    constructor(props) {
        super(props);

        let data = this.sortData(this.props.data);
        let yDataMax = this.getYDataMax(this.props.y, data);
        let yAxisNumArr = this.getYAxisNumArr(yDataMax);
        let y = this.props.y.map(d=> {
            let max = 230;
            let r = Math.floor(Math.random() * max);
            let g = Math.floor(Math.random() * max);
            let b = Math.floor(Math.random() * max);
            d.color = `rgba(${r},${g},${b},1)`;
            return d;
        });

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
            yUnitLength: 50 * 0.8 / 10,
            yDataMax: yDataMax,
            angleNum: this.props.angleNum ? this.props.angleNum : 12,
            endPointLineLength: this.props.endPointLineLength ? this.props.endPointLineLength : 0.1
        };
        let bindArr = ["sortData", "vectorTransformToSvg", "xTransformToSvg", "yTransformToSvg", "yTransformToNatural",
            "getYAxisNumArr", "setActive", "getNearestSeries", "resetColor"];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        this.state.y.forEach(d=> {
            let length = this["curve" + d.id].getTotalLength();
            $(this["curve" + d.id]).css({
                "stroke-dasharray": length,
                "stroke-dashoffset": length
            });
        });

        let lineDots = this.state.y.map(d=> {
            let vectors = this.state.data.map((d1, j)=> {
                let id = d.id;
                let x = this.xTransformToSvg(j);
                let y;
                if (d1.hasOwnProperty(id)) {
                    y = this.yTransformToSvg(d1[id]);
                } else {
                    y = this.yTransformToSvg(0);
                }
                let vector = {x: x, y: y};
                return vector;
            });
            return {id: d.id, vectors: vectors};
        });
        this.setState({
            lineDots: lineDots
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            nextProps.data = this.sortData(nextProps.data);
        }
        this.setState(nextProps);
    }

    render() {
        return (
            <div className={css.base + " react-chart"}>
                <svg viewBox="0 0 110 60" onMouseMove={this.setActive} ref={(svg)=> {
                    this.svg = svg;
                }}>
                    {
                        this.state.title ? <g className={css.title}>
                            <text x="50" y="3">{this.state.title}</text>
                        </g> : ""
                    }
                    <g className={css.xAxis}>
                        <path d="M10 55 h 80"/>
                        {
                            this.state.data.map((d, i)=> {
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
                            this.state.yAxisNumArr.map((d, i)=> {
                                let y = 55 - i * this.state.yUnitLength;
                                let yTextDelta = 1;
                                return <text key={i} x={6} y={y - this.state.yUnitLength + yTextDelta}>{d}</text>
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
                            this.state.yAxisNumArr.map((d, i)=> {
                                let y = 55 - (i + 1) * this.state.yUnitLength;
                                return <path key={i} d={`M10 ${y} h 80`}/>
                            })
                        }
                        <path d={`M90 55 v1`}/>
                    </g>
                    {
                        this.state.type == "curve" ?
                            <g className={css.curve}>
                                {
                                    this.state.y.map((d, i)=> {
                                        let lastX, lastY;
                                        let path = this.state.data.map((d1, j)=> {
                                            let id = d.id;
                                            let x = this.xTransformToSvg(j);
                                            let y;
                                            let p = "";
                                            if (d1.hasOwnProperty(id)) {
                                                y = this.yTransformToSvg(d1[id]);
                                            } else {
                                                y = this.yTransformToSvg(0);
                                            }
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
                                        return <path stroke={color} key={i} d={path} ref={curve=> {
                                            this["curve" + d.id] = curve;
                                        }}/>
                                    })
                                }
                            </g>
                            : ""
                    }

                    <g className={css.dots}>
                        {

                            this.state.lineDots.map((d, i)=> {
                                return d.vectors.map((d1, j)=> {
                                    let dots = this.getDotsSymbol(i, d1.x, d1.y, "dot" + d.id + j);
                                    return dots;
                                })
                            })
                        }
                    </g>
                    <g className={css.declare}>
                        {
                            this.state.y.map((d, i)=> {
                                let x = 91;
                                let y = 15 + (40 - this.state.y.length * this.state.yUnitLength) / 2 + i * this.state.yUnitLength;
                                let color = d.color;
                                return <g key={i}>
                                    <path stroke={color} d={`M${x} ${y} h3`}/>
                                    {
                                        this.getDotsSymbol(i, 92.5, y)
                                    }
                                    <text x="94.5" y={y + 1}>{d.name}</text>
                                </g>
                            })
                        }
                        <g>
                            <g title="reset color" className={css.resetColor} onClick={()=> {
                                this.resetColor();
                            }}>
                                {
                                    this.state.y.map((d, i)=> {
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
                        </g>
                    </g>


                </svg>
            </div>
        );
    }

    //sort data by x axis value
    sortData(d) {
        let data = d.concat();
        let regex = new RegExp(/^[1-2]\d{3}-((0[1-9])|(1[0-2])|[1-9])-((0[1-9])|([1-2]\d)|(3[0-1])|[1-9])$/);
        let isDate = data.every(d1=> {
            return regex.test(d1[this.props.x]);
        });
        if (isDate) {
            data.sort((a, b)=> {
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

    //get max y num
    getYDataMax(y, data) {
        let yDataMax = 0;
        y.forEach(d=> {
            data.filter(d1=> {
                return d1.hasOwnProperty(d.id);
            }).forEach(d1=> {
                let d2 = d1[d.id];
                yDataMax = Math.max(d2, yDataMax);
            })
        });
        return yDataMax;
    }

    getYAxisNumArr(yDataMax) {
        let p = 0;
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

        let yAxisMax = Math.pow(10, p);
        let yAxisNumArr = [];
        for (let i = 1; i <= 10; i++) {
            let y = i * yAxisMax * 0.1;
            if (p <= 0) {
                y = y.toFixed(-p + 1);
            }
            y = Number.parseFloat(y);
            yAxisNumArr.push(y);
        }
        return yAxisNumArr;
    }

    //transform vector x,y coordinates to svg coordinates
    vectorTransformToSvg(vector) {
        let {x, y} = vector;
        let w = this.state.xUnitLength;
        x = x * w + 10 + w / 2;
        let yMax = this.state.yAxisNumArr[0] * 10;
        y = (1 - y / yMax) * 10 * 4 + 5;
        y = y + 10;
        return {x: x, y: y};
    }

    //transform x coordinates to svg coordinates
    xTransformToSvg(x) {
        let w = this.state.xUnitLength;
        x = x * w + 10 + w / 2;
        return x;
    }

    //transform y coordinates to svg coordinates
    yTransformToSvg(y) {
        let yMax = this.state.yAxisNumArr[0] * 10;
        y = (1 - y / yMax) * 10 * 4 + 5;
        y = y + 10;
        return y;
    }

    yTransformToNatural(y) {
        let yMax = this.state.yAxisNumArr[0] * 10;
        y = y - 10;
        y = (1 - (y - 5) / (10 * 4)) * yMax;
        return y;
    }

    //get bezier curve point x1,y1 and x2,y2
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
            //line goes lower
            y1 = Number.parseInt(lastY + anglePoint1Y);
            y2 = Number.parseInt(y + anglePoint2Y);
        } else {
            //line goes higher
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

    //get dots symbol
    getDotsSymbol(index, x, y, ref) {
        let dots, r;
        let color = this.state.y[index].color;
        switch (index % 5) {
            //circle
            case 0:
                r = 0.3;
                dots = (ref == undefined) ?
                    <circle stroke={color} fill={color} cx={x} cy={y} r={r}/> :
                    <circle stroke={color} fill={color} cx={x} cy={y} r={r} ref={d=> {
                        this[ref] = d;
                    }}/>;
                break;
            //square
            case 1:
                r = 0.4;
                dots = (ref == undefined) ?
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}/> :
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`} ref={d=> {
                        this[ref] = d;
                    }}/>;
                break;
            //square rotate -45 angle
            case 2:
                r = 0.4;
                dots = (ref == undefined) ?
                    <path stroke={color} fill={color} transform={`rotate(-45,${x},${y})`}
                          d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}/> :
                    <path stroke={color} fill={color} transform={`rotate(-45,${x},${y})`}
                          d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`} ref={d=> {
                        this[ref] = d;
                    }}/>;
                break;
            //triangle
            case 3:
                r = 0.4;
                dots = (ref == undefined) ?
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y + r / 2} h${r} L${x} ${y - r / 2} z`}/> :
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y + r / 2} h${r} L${x} ${y - r / 2} z`}
                          ref={d=> {
                              this[ref] = d;
                          }}/>;
                break;
            //inverted triangle
            case 4:
                r = 0.4;
                dots = (ref == undefined) ?
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} L${x} ${y + r / 2} z`}/> :
                    <path stroke={color} fill={color} d={`M${x - r / 2} ${y - r / 2} h${r} L${x} ${y + r / 2} z`}
                          ref={d=> {
                              this[ref] = d;
                          }}/>;
                break;

        }
        return dots;
    }

    //set active when mouse hover
    setActive(e) {
        let offset = $(this.svg).offset();
        let x = e.pageX - offset.left;
        let y = e.pageY - offset.top;
        x = x / this.svg.clientWidth * 110;
        y = y / this.svg.clientHeight * 60;
        let series = this.getNearestSeries(x, y);
        if (series) {
            $(this["curve" + series]).css({
                "stroke-width": 0.4
            });
            this.state.y.filter(d=> {
                return d.id != series;
            }).forEach(d=> {
                $(this["curve" + d.id]).css({
                    "stroke-width": 0.2
                });
            })
        } else {
            this.state.y.forEach(d=> {
                $(this["curve" + d.id]).css({
                    "stroke-width": 0.2
                });
            })
        }

    }

    /**
     * find the nearest series
     * @param x svgX
     * @param y svgY
     * @returns {*} series
     */
    getNearestSeries(x, y) {
        let series;
        if (x >= 10 && x <= 90 && y >= 15 && y <= 55) {
            let w = 80 / this.state.data.length;
            //find the corresponding y by x and slope
            let yMap = [];
            if (x < 10 + w / 2) {
                yMap = this.state.lineDots.map(d=> {
                    let lineY = d.vectors[0].y;
                    return {id: d.id, y: lineY};
                });
            } else if (x > 90 - w / 2) {
                yMap = this.state.lineDots.map(d=> {
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
                yMap = this.state.lineDots.map(d=> {
                    let x1 = 10 + startIndex * w + w / 2;
                    let x2 = 10 + endIndex * w + w / 2;
                    let y1 = d.vectors[startIndex].y;
                    let y2 = d.vectors[endIndex].y;
                    let slope = (y2 - y1) / (x2 - x1);
                    let lineY = (x - x1) * slope + y1;
                    return {id: d.id, y: lineY};
                });
            }
            yMap.sort((a, b)=> {
                return a.y - b.y;
            });
            if (y < yMap[0].y) {
                series = yMap[0].id;
            } else if (y > yMap[yMap.length - 1].y) {
                series = yMap[yMap.length - 1].id;
            } else {
                series = yMap[0].id;
                for (let i = 0; i < yMap.length - 2; i++) {
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

        }
        return series;
    }

    resetColor() {
        let y = this.state.y.map(d=> {
            let max = 230;
            let r = Math.floor(Math.random() * max);
            let g = Math.floor(Math.random() * max);
            let b = Math.floor(Math.random() * max);
            d.color = `rgba(${r},${g},${b},1)`;
            return d;
        });
        this.setState({
            y: y
        })
    }

}

module.exports = chart;