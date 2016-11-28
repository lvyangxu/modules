let http = require("karl-http");
let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

/**
 * radio component,props means:
 * data:an array,element can be string or number
 * defaultBlank:if this props exits,then default value is "",else default value is the first option
 * callback:function after value change,param is current select value
 */
class radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelShow: false,
            sourceData: [],
            value: "",
            filterData: [],
            pageData: [],
            filterValue: "",
            pageIndex: 0
        };
        let bindArr = ["panelToggle", "filterChange", "select", "setOptionHtml", "slicePageData"];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        if (this.props.url != undefined) {
            http.post(this.props.url).then(d=> {
                let pageData = this.slicePageData(d, 0);
                this.setState({
                    value: this.props.defaultBlank ? "" : d[0],
                    sourceData: d,
                    filterData: d,
                    pageData: pageData
                });
            }).catch(d=> {
                console.log("init radio failed:" + d);
            });

        } else {
            let data = this.props.data;
            let pageData = this.slicePageData(data, 0);
            this.setState({
                value: this.props.defaultBlank ? "" : data[0],
                sourceData: data,
                filterData: data,
                pageData: pageData
            });
        }

        window.addEventListener("click", ()=> {
            if (this.state.panelShow) {
                this.setState({panelShow: false});
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value != nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    render() {
        return (
            <div className={css.base + " react-radio"}>
                <div className={css.display} onClick={this.panelToggle}>
                    {this.state.value}<i className="fa fa-caret-down"></i>
                </div>
                <div className={css.panel}
                     onClick={(e)=>{
                         e.stopPropagation();
                     }}
                     style={(this.state.panelShow) ? {} : {display: "none"}}>
                    <div className={css.filter}>
                        <input onChange={this.filterChange}
                               value={this.state.filterValue}
                               placeholder="filter"/>
                    </div>
                    <div className={css.options}>
                        {
                            this.state.pageData.map((d, i)=> {
                                return <div key={i} className={css.option} onClick={()=> {
                                    this.select(d)
                                }} dangerouslySetInnerHTML={this.setOptionHtml(d)}></div>
                            })
                        }
                        <div className={css.page}>
                            <button className={css.pageLeft} onClick={()=> {
                                this.pageToStart();
                            }}>
                                <i className="fa fa-angle-double-left"></i>
                            </button>
                            <button className={css.pageLeft} onClick={()=> {
                                this.pageLeft();
                            }}>
                                <i className="fa fa-angle-left"></i>
                            </button>
                            {(this.state.pageIndex + 1) + "/" + ((Math.ceil(this.state.filterData.length / 10) == 0)
                                ? 1 : Math.ceil(this.state.filterData.length / 10))}
                            <button className={css.pageRight} onClick={()=> {
                                this.pageRight();
                            }}>
                                <i className="fa fa-angle-right"></i>
                            </button>
                            <button className={css.pageRight} onClick={()=> {
                                this.pageToEnd();
                            }}>
                                <i className="fa fa-angle-double-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    panelToggle(e) {
        e.stopPropagation();
        this.setState({
            panelShow: !this.state.panelShow
        });
    }

    filterChange(e) {
        let filterData = this.state.sourceData.filter(d=> {
            return d.toString().includes(e.target.value);
        });
        let pageData = this.slicePageData(filterData, 0);
        this.setState({
            filterValue: e.target.value,
            pageIndex: 0,
            filterData: filterData,
            pageData: pageData
        });
    }

    select(d) {
        this.setState({
            panelShow: false,
            value: d
        });

        if (this.props.callback) {
            this.props.callback(d);
        }
    }

    setOptionHtml(d) {
        d = d.toString();
        let v = this.state.filterValue;
        let regex = new RegExp(v, "g");
        if (v == "") {
            return {__html: d};
        } else {
            let result = d.toString().replace(regex, ()=> {
                return "<strong>" + v + "</strong>";
            });
            return {__html: result};
        }
    }

    slicePageData(data, i) {
        let filterData = data;
        let start = i * 10;
        let end = i * 10 + 10;
        end = end > filterData.length ? filterData.length : end;
        let columnData = filterData.slice(start, end);
        return columnData;
    }

    pageLeft() {
        let i = this.state.pageIndex;
        if (i != 0) {
            i--;
        }
        this.setState({
            pageIndex: i,
            pageData: this.slicePageData(this.state.filterData, i)
        });
    }

    pageRight() {
        let i = this.state.pageIndex;
        let end = Math.ceil(this.state.filterData.length / 10);
        if (i < end - 1) {
            i++;
        }
        this.setState({
            pageIndex: i,
            pageData: this.slicePageData(this.state.filterData, i)
        });
    }

    pageToStart(){
        let i = 0;
        this.setState({
            pageIndex: i,
            pageData: this.slicePageData(this.state.filterData, i)
        });
    }

    pageToEnd(){
        let end = Math.ceil(this.state.filterData.length / 10);
        let i = end - 1;
        this.setState({
            pageIndex: i,
            pageData: this.slicePageData(this.state.filterData, i)
        });
    }

}

module.exports = radio;