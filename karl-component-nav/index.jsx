let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

class nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            content: [],
            activeIndex: 0,
            height: 300
        };
        let bindArr = [];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        let hash = window.location.hash.replace(/#/g, "");
        let data = this.props.data;

        let activeIndex = 0;
        if (hash != "") {
            let index = data.findIndex(d=> {
                return d == hash;
            });
            if (index != -1) {
                activeIndex = index;
            }
        }

        this.setState({
            data: data,
            activeIndex: activeIndex,
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
                        this.state.data.map((d, i)=> {
                            return <div key={i}
                                        className={(i == this.state.activeIndex) ? css.liActive : css.li}
                                        onClick={()=> {
                                            this.setState({activeIndex: i});
                                        }}>
                                {d}
                            </div>
                        })
                    }
                </div>
                <div className={css.content}>
                    {this.state.content.filter((d, i)=> {
                        return i == this.state.activeIndex;
                    })}
                </div>
            </div>
        );
    }

}

module.exports = nav;