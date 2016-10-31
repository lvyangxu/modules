let React = require("react");
let css = require("./index.css");
require("font-awesome-webpack");
let $ = require("jquery");


class carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            itemWidth: 200,
            index: 1,
            isMouseDown: false
        };
        let bindArr = ["touch", "switchTo", "switchRemain"];
        bindArr.forEach(d=> {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {

        // this.touch();
        this.mouse();

        let content = this.props.children.concat();
        let firstElement = content[0];
        let lastElement = content[content.length - 1];
        content = [lastElement].concat(content, firstElement);
        this.setState({
            content: content
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className={css.base + " react-carousel"}>
                <div style={{
                    width: 100 * this.state.content.length + "%"
                }} className={css.container} ref={(d)=> {
                    this.container = d;
                }}>
                    {
                        this.state.content.map((d, i)=> {
                            return <div key={i} style={{
                                width: 100 / (this.state.content.length) + "%"
                            }}
                                        className={css.item}>
                                <div className={css.inner}>{d}</div>
                            </div>
                        })
                    }
                </div>
                <div className={css.dots}>
                    {
                        this.state.content.filter((d, i)=> {
                            if (i == 0 || i == this.state.content.length - 1) {
                                return false;
                            } else {
                                return true;
                            }
                        }).map((d, i)=> {
                            return <div key={i}
                                        className={(this.state.index - 1 == i) ? (css.dot + " " + css.active) : css.dot}
                                        onClick={()=> {
                                            this.switchTo(i + 1);
                                        }}></div>
                        })
                    }
                </div>
            </div>
        );
    }

    switchTo(i) {
        $(this.container).animate({marginLeft: -i * 100 + "%"}, ()=> {
            //left to the start
            if (i == 0) {
                i = this.state.content.length - 2;
                $(this.container).css({marginLeft: -i * 100 + "%"});
                this.setState({
                    index: i
                });
            }

            //right to the end
            if (i == this.state.content.length - 1) {
                i = 1;
                $(this.container).css({marginLeft: -i * 100 + "%"});
                this.setState({
                    index: i
                });
            }
        });
        this.setState({
            index: i,
            isMouseDown: false
        });
    }

    touch() {
        //touch
        this.container.addEventListener('touchstart', e => {
            const {pageX: x, pageY: y} = e.touches[0];
            this.onMoveStart(x, y)
        }, false);
        this.container.addEventListener('touchmove', e => {
            const {pageX: x, pageY: y} = e.touches[0];
            this.onMove(x, y)
        }, false);
        this.container.addEventListener('touchend', this.onMoveEnd);
    }

    mouse() {
        // mouse
        this.container.addEventListener('mousedown', e => {
            e.preventDefault();
            this.setState({
                startX: e.pageX,
                isMouseDown: true
            });
        }, false);
        this.container.addEventListener('mousemove', e => {
            e.preventDefault();
            if (this.state.startX && this.state.isMouseDown) {
                this.setState({
                    endX: e.pageX
                });

                let deltaX = e.pageX - this.state.startX;
                let isChangeIndex = -1;
                if ($(this.container).is(":animated")) {
                    //if right to the end,then switch like film
                    if (deltaX < 0 && this.state.index == (this.state.content.length - 2)) {
                        isChangeIndex = 1;
                    }
                    //if left to the start,then switch like film
                    if (deltaX > 0 && this.state.index == 1) {
                        isChangeIndex = this.state.content.length - 2;
                    }
                    $(this.container).stop();
                }
                let endMarginLeft;
                let deltaXPercent = deltaX * this.state.content.length / $(this.container).width();
                if (isChangeIndex != -1) {
                    endMarginLeft = (-isChangeIndex + deltaXPercent) * 100 + "%";
                } else {
                    endMarginLeft = (-this.state.index + deltaXPercent) * 100 + "%";
                }
                $(this.container).css({marginLeft: endMarginLeft});
            }
        }, false);
        this.container.addEventListener('mouseleave', e => {
            this.switchRemain(e);
        }, false);
        this.container.addEventListener('mouseup', e => {
            this.switchRemain(e);
        }, false);
    }

    switchRemain(e) {
        e.preventDefault();

        let deltaX = this.state.endX - this.state.startX;
        this.setState({
            startX: undefined,
            endX: undefined
        });

        if (Math.abs(deltaX) < 30) {
            this.switchTo(this.state.index);
            return;
        }
        let endIndex;
        let endMin = 0;
        let endMax = (this.state.content.length - 1);

        if (deltaX >= 30) {
            //drag right
            endIndex = this.state.index - 1;
            endIndex = Math.max(endIndex, endMin);
        } else if (deltaX <= -30) {
            //drag left
            endIndex = this.state.index + 1;
            endIndex = Math.min(endIndex, endMax);
        }
        endIndex = endIndex == undefined ? this.state.index : endIndex;
        this.switchTo(endIndex);

    }


}

module.exports = carousel;