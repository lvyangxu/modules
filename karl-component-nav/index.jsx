let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");
let $ = require("jquery");

/**
 * data an array,element like {text:"a",child:["a1","a2"]}
 */
class nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            content: [],
            activeNav: "",
            height: 300
        };
        let bindArr = [];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        let marginTop = $(this.base).offset().top;
        let height = $(window).height() - marginTop;
        $(this.base).css({height: height});

        let activeNav = "";
        let data = this.props.data;
        if (data[0].hasOwnProperty("child")) {
            activeNav = data[0].child[0];
        } else {
            activeNav = data[0].text;
        }

        let hash = window.location.hash.replace(/#/g, "");
        if (hash != "") {
            let isFind = false;
            data.forEach(d => {
                if (d.hasOwnProperty("child")) {
                    if (d.child.includes(hash)) {
                        isFind = true;
                    }
                } else {
                    if (hash == d.text) {
                        isFind = true;
                    }
                }
            });
            if (isFind) {
                activeNav = hash;
            }
        }

        this.setState({
            data: data,
            activeNav: activeNav,
            content: this.props.children,
            height: this.props.height ? this.props.height : 300
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.children != nextProps.children) {
            this.setState({
                content: nextProps.children
            });
        }
    }

    render() {
        return (
            <div className={css.base + " react-nav"} ref={d => {
                this.base = d;
            }}>
                <div className={css.menu}>
                    {
                        this.setMenu()
                    }
                </div>
                <div className={css.content}>
                    {
                        this.setContent()
                    }
                </div>
            </div>
        );
    }

    setMenu() {
        return this.state.data.map((d, i) => {
            let li = "";
            if (d.hasOwnProperty("child")) {
                li = <div key={i}>
                    <div className={css.li} onClick={() => {
                        let isShow = this.state["li" + i + "show"];
                        let json = {};
                        json["li" + i + "show"] = !isShow;
                        this.setState(json);
                    }}>
                        <i className={this.state["li" + i + "show"] ? "fa fa-caret-down" : "fa fa-caret-right"}></i>
                        {d.text}
                    </div>
                    <div style={this.state["li" + i + "show"] ? {} : {"display": "none"}}>
                        {
                            d.child.map((d1, j) => {
                                let active = (d1 == this.state.activeNav) ? css.active : "";
                                let li2 = <div key={j} className={css.li + " " + css.li2 + " " + active}
                                               onClick={() => {
                                                   this.setState({activeNav: d1});
                                               }}>
                                    {d1}
                                </div>;
                                return li2;
                            })
                        }
                    </div>
                </div>;
            } else {
                let active = (d.text == this.state.activeNav) ? css.active : "";
                li = <div key={i} className={css.li + " " + active} onClick={() => {
                    this.setState({activeNav: d.text});
                }}>{d.text}</div>;
            }
            return li;
        });
    }

    setContent() {
        let firstIndex = -1, secondIndex = -1;
        this.state.data.forEach((d, i) => {
            if (d.hasOwnProperty("child")) {
                d.child.map((d1, j) => {
                    if (d1 == this.state.activeNav) {
                        firstIndex = i;
                        secondIndex = j;
                    }
                });
            } else {
                if (d.text == this.state.activeNav) {
                    firstIndex = i;
                }
            }
        });
        let activeContent = "";
        if (firstIndex >= 0) {
            activeContent = this.state.content[firstIndex];
            if (secondIndex >= 0) {
                activeContent = activeContent.props.children[secondIndex];
            }
        }
        return activeContent;

    }

}

module.exports = nav;