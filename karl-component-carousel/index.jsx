let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");

class carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            itemWidth: 200,
            index: 0
        };
        let bindArr = [];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        this.setState({
            content: this.props.children
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className={css.base + " react-carousel"}>
                <div style={{
                    width: 100 * this.state.content.length + "%",
                    marginLeft: -this.state.index * 100 + "%"
                }} className={css.container}>
                    {
                        this.state.content.map((d, i)=> {
                            return <div style={{width: 100 / this.state.content.length + "%"}} key={i}
                                        className={css.item}>
                                <div className={css.inner}>{d}</div>
                            </div>
                        })
                    }
                </div>
                <div className={css.dots}>
                    {
                        this.state.content.map((d, i)=> {
                            return <div key={i}
                                        className={(this.state.index == i) ? (css.dot + " " + css.active) : css.dot}
                                        onClick={()=> {
                                            this.setState({index: i});
                                        }}></div>
                        })
                    }
                </div>
            </div>
        );
    }

}

module.exports = carousel;