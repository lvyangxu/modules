let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");
// var ReactTransitionGroup = require('react-addons-transition-group')

let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// class TransitionItem extends React.Component{
//     constructor(props) {
//         super(props);
//     }
//
//     componentWillAppear(done) {
//         console.log('componentWillAppear', arguments);
//         done();
//     }
//
//     componentDidAppear() {
//         console.log('componentDidAppear', arguments);
//     }
//
//     componentDidEnter() {
//         console.log('componentDidEnter', arguments);
//     }
//
//     componentDidLeave() {
//         console.log('componentDidLeave', arguments);
//     }
//
//     render() {
//         return (
//             <div style={this.state}>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

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

    //                    {/*marginLeft: -this.state.index * 100 + "%"*/}


    render() {
        return (
            <div className={css.base + " react-carousel"}>
                <div style={{
                    width: 100 * this.state.content.length + "%"
                }} className={css.container}>
                    <ReactCSSTransitionGroup transitionAppearTimeout={5000}
                                        transitionEnterTimeout={5000}
                                        transitionLeaveTimeout={5000}
                                        transitionName={{
                                            enter: css.enter,
                                            enterActive: css.enterActive,
                                            leave: css.leave,
                                            leaveActive: css.leaveActive,
                                        }}>
                        {
                            this.state.content.filter((d, i)=> {
                                return i == this.state.index;
                            }).map((d, i)=> {
                                return <div key={i} style={{width: 100 / this.state.content.length + "%"}}
                                            className={css.item}>
                                    <div className={css.inner}>{d}</div>
                                </div>
                            })
                        }

                    </ReactCSSTransitionGroup>
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