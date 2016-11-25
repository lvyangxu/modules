let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

/**
 * data
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
        let activeNav = "";
        let data = this.props.data;
        if (data[0].hasOwnProperty("child")) {
            activeNav = data[0].child[0];
        } else {
            activeNav = data[0].titleText;
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
                    if (hash == d.titleText) {
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
            <div style={{height: this.state.height + "px"}} className={css.base + " react-nav"}>
                <div className={css.menu}>
                    {
                        this.state.data.map((d, i) => {
                            let li = "";
                            if (d.hasOwnProperty("child")) {
                                li = <div key={i}>
                                    {
                                        d.child.map((d1, j) => {
                                            let className = (d1 == this.state.activeNav) ? css.liActive : css.li;
                                            let secondLi = <div key={j} className={className}>
                                                {d1}
                                            </div>;
                                            return secondLi;
                                        })
                                    }
                                </div>;
                            } else {
                                li = <div key={i}
                                          className={(d.titleText == this.state.activeNav) ? css.liActive : css.li}
                                          onClick={() => {
                                              this.setState({activeNav: d.titleText});
                                          }}>
                                    {d}
                                </div>;
                            }
                            return li;
                        })
                    }
                </div>
                <div className={css.content}>
                    {
                        this.setActiveNav()
                    }
                </div>
            </div>
        );
    }

    setActiveNav(){

        let firstIndex,secondIndex;
        this.state.data.forEach((d,i) => {
            if(d.hasOwnProperty("child")){
                d.child.map((d1,j)=>{
                   if(d1 == this.state.activeNav){
                       firstIndex = i;
                       secondIndex = j;
                   }
                });
            }else{
                if(d.titleText == this.state.activeNav){
                    firstIndex = i;
                }
            }
        });
        let activeContent = "";
        if(firstIndex){
            activeContent = this.state.content[firstIndex];
            if(secondIndex){
                activeContent = activeContent.props.children[secondIndex];
            }
        }
        return activeContent;

    }

}

module.exports = nav;