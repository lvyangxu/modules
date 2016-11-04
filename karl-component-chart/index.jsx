let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

/**
 * chart component,props means:
 */
class chart extends React.Component {
    constructor(props) {
        super(props);

        let yDataMax = this.getYDataMax(this.props.y, this.props.data);
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
            data: this.props.data,
            yAxisNumArr: yAxisNumArr,
            xUnitLength: 100 * 0.8 / this.props.data.length,
            yUnitLength: 50 * 0.8 / 10,
            yDataMax: yDataMax,
            angleNum: this.props.angleNum ? this.props.angleNum : 12,
            endPointLineLength: this.props.endPointLineLength ? this.props.endPointLineLength : 0.1
        };
        let bindArr = ["vectorTransform", "getYAxisNumArr"];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <div className={css.base + " react-chart"}>
                <svg viewBox="0 0 110 60"  onMouseMove={this.setActive}>
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
                                        let path = this.state.data.filter(d1=> {
                                            return d1.hasOwnProperty(d.id);
                                        }).map(d1=> {
                                            let id = d.id;
                                            //find the index of x axis
                                            let j = this.state.data.findIndex(d2=> {
                                                return d1[this.state.x] == d2[this.state.x];
                                            });
                                            let {x, y} = this.vectorTransform({x: j, y: d1[id]});
                                            let firstIndex = this.state.data.findIndex(d2=> {
                                                return d2.hasOwnProperty(id);
                                            });
                                            let p = "";
                                            if (j == firstIndex) {
                                                p = `M ${x} ${y}`;
                                            } else {
                                                let {x1, y1, x2, y2} = this.getBezierCurvesVector(lastX, lastY, x, y);
                                                p = `C ${x1} ${y1},${x2} ${y2},${x} ${y}`;
                                            }
                                            lastX = x;
                                            lastY = y;
                                            return p;
                                        }).join(" ");
                                        let color = this.state.y[i].color;
                                        return <path stroke={color} key={i} d={path}/>
                                    })
                                }
                            </g>
                            : ""
                    }

                    <g className={css.dots}>
                        {
                            this.state.y.map((d, i)=> {
                                return this.state.data.filter(d1=> {
                                    return d1.hasOwnProperty(d.id);
                                }).map(d1=> {
                                    let j = this.state.data.findIndex(d2=> {
                                        return d1[this.state.x] == d2[this.state.x];
                                    });
                                    let {x, y} = this.vectorTransform({x: j, y: d1[d.id]});
                                    let dots = this.getDotsSymbol(i, x, y);
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
                    </g>


                </svg>
            </div>
        );
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
    vectorTransform(vector) {
        let {x, y} = vector;
        let w = this.state.xUnitLength;
        x = x * w + 10 + w / 2;
        let yMax = this.state.yAxisNumArr[0] * 10;
        y = (1 - y / yMax) * 10 * 4 + 5;
        y = y + 10;
        return {x: x, y: y};
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
    getDotsSymbol(index, x, y) {
        let dots, r;
        let color = this.state.y[index].color;
        switch (index % 5) {
            //circle
            case 0:
                r = 0.3;
                dots =
                    <circle stroke={color} fill={color} cx={x} cy={y} r={r}/>;
                break;
            //square
            case 1:
                r = 0.4;
                dots = <path stroke={color} fill={color}
                             d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}/>;
                break;
            //square rotate -45 angle
            case 2:
                r = 0.4;
                dots = <path stroke={color} fill={color}
                             transform={`rotate(-45,${x},${y})`}
                             d={`M${x - r / 2} ${y - r / 2} h${r} v${r} h-${r} z`}/>;
                break;
            //triangle
            case 3:
                r = 0.4;
                dots = <path stroke={color} fill={color}
                             d={`M${x - r / 2} ${y + r / 2} h${r} L${x} ${y - r / 2} z`}/>;
                break;
            //inverted triangle
            case 4:
                r = 0.4;
                dots = <path stroke={color} fill={color}
                             d={`M${x - r / 2} ${y - r / 2} h${r} L${x} ${y + r / 2} z`}/>;
                break;

        }
        return dots;
    }

    //set active when mouse hover
    setActive(e) {

    }

}

module.exports = chart;