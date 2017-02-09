import React from "react";
import css from "./index.css";
import $ from "jquery";

/**
 * react轮播组件,组件第一级子元素为进行轮播的dom
 * dots：为false或"false"时不显示，默认显示
 * auto：为false或"false"时不自动播放，默认自动播放，间隔为5秒
 *
 * 示例：
 * <Carousel>
 *     <img src="1.png"/>
 *     <img src="2.png"/>
 *     <img src="3.png"/>
 * </Carousel>
 */
class scroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            index: 0,
            isMouseDown: false,
            isScrolling: false
        };
        let bindArr = ["delegateScroll", "delegateTouch", "animateTo", "cssTo", "startMove", "doMove", "endMove", "autoPlay"];
        bindArr.forEach(d => {
            this[d] = this[d].bind(this);
        });
    }

    componentDidMount() {
        // this.delegateTouch();
        this.delegateScroll();
        let content = this.props.children.concat();
        this.setState({
            content: content,
            dots: !(this.props.dots == false || this.props.dots == "false"),
            auto: !(this.props.auto == false || this.props.auto == "false"),
        });

        if (this.props.auto == true || this.props.auto == "true") {
            this.autoPlay();
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return <div className={css.base + " react-scroll"}>
            <div className={css.container} ref={d => {
                this.container = d;
            }}>
                {
                    this.state.content.map((d, i) => {
                        let style = Object.assign({
                            height: $(window).height()
                        }, d.props.style);
                        let json = {
                            style: style,
                            className: css.item,
                            key: i
                        };
                        let dom = React.cloneElement(d, json);
                        return dom;
                    })
                }
            </div>
            <div className={css.dots} style={this.state.dots ? {} : {display: "none"}}>
                {
                    this.state.content.map((d, i) => {
                        return <div key={i}
                                    className={this.state.index == i ? (css.dot + " " + css.active) : css.dot}
                                    onClick={() => {
                                        this.animateTo(i);
                                    }}></div>
                    })
                }
            </div>
        </div>;
    }

    autoPlay() {
        setTimeout(() => {
            if (this.state.manual) {
                return;
            }
            if (!this.state.isHover) {
                if (this.state.index == this.state.content.length - 2) {
                    this.cssTo(0);
                    this.animateTo(1);
                } else {
                    this.animateTo(this.state.index + 1);
                }
            }
            this.autoPlay();
        }, 5000)
    }

    animateTo(i) {
        // $(this.container).animate({marginLeft: -i * 100 + "%"});
        // this.setState({
        //     index: i,
        //     isMouseDown: false
        // });
    }

    cssTo(i, offset) {
        // offset = (offset == undefined) ? 0 : offset;
        // $(this.container).css({marginLeft: -i * 100 + offset + "%"});
        // this.setState({
        //     index: i
        // });
    }

    startMove(x) {
        this.setState({
            startX: x,
            isMouseDown: true,
            manual: true
        });
    }

    doMove(x) {
        if (this.state.startX && this.state.isMouseDown) {
            this.setState({
                endX: x
            });

            let deltaX = x - this.state.startX;
            if ($(this.container).is(":animated")) {
                $(this.container).stop();
            }
            let endMarginLeft;
            let deltaXPercent = deltaX * this.state.content.length / $(this.container).width();
            endMarginLeft = (-this.state.index + deltaXPercent) * 100 + "%";
            $(this.container).css({marginLeft: endMarginLeft});
        }
    }

    endMove() {
        let deltaX = this.state.endX - this.state.startX;
        this.setState({
            startX: undefined,
            endX: undefined
        });

        if (Math.abs(deltaX) < 30) {
            this.animateTo(this.state.index);
            return;
        }
        let endIndex;
        let endMin = 0;
        let endMax = (this.state.content.length - 1);

        if (deltaX >= 30) {
            //drag right
            endIndex = this.state.index - 1;
            endIndex = Math.max(endIndex, endMin);
            if (endIndex == 0) {
                endIndex = this.state.content.length - 1;
                let offset = $(this.container).css("marginLeft");
                offset = Number.parseFloat(offset) * this.state.content.length / $(this.container).width();
                offset = offset + 1;
                offset = offset * 100;
                this.cssTo(endIndex, offset);
                endIndex--;
            }

        } else if (deltaX <= -30) {
            //drag left
            endIndex = this.state.index + 1;
            endIndex = Math.min(endIndex, endMax);
            if (endIndex == this.state.content.length - 1) {
                endIndex = 0;
                let offset = $(this.container).css("marginLeft");
                offset = Number.parseFloat(offset) * this.state.content.length / $(this.container).width();
                offset = offset + this.state.content.length - 2;
                offset = offset * 100;
                this.cssTo(endIndex, offset);
                endIndex++;
            }

        }
        endIndex = (endIndex == undefined) ? this.state.index : endIndex;
        this.animateTo(endIndex);

    }

    delegateTouch() {
        this.container.addEventListener('touchstart', e => {
            e.preventDefault();
            this.startMove(e.touches[0].pageX);
        }, false);
        this.container.addEventListener('touchmove', e => {
            e.preventDefault();
            this.doMove(e.touches[0].pageX);
        }, false);
        this.container.addEventListener('touchend', e => {
            e.preventDefault();
            this.endMove();
        });
    }

    delegateMouse() {
        this.container.addEventListener('mouseover', e => {
            e.preventDefault();
            this.setState({
                isHover: true
            });
        }, false);
        this.container.addEventListener('mousedown', e => {
            e.preventDefault();
            this.startMove(e.pageX);
        }, false);
        this.container.addEventListener('mousemove', e => {
            e.preventDefault();
            this.doMove(e.pageX);
        }, false);
        this.container.addEventListener('mouseleave', e => {
            e.preventDefault();
            this.setState({
                isHover: false
            });
            this.endMove();
        }, false);
        this.container.addEventListener('mouseup', e => {
            e.preventDefault();
            this.endMove();
        }, false);
    }

    delegateScroll() {
        $(document).delegate("", "mousewheel DOMMouseScroll", event=> {
            event.preventDefault();
            if (this.state.isScrolling) {
                return;
            }
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            let index = this.state.index;
            if (delta > 0) {
                //朝上
                if (index != 0) {
                    index--;
                }
            } else {
                if (index != this.state.content.length - 1) {
                    index++;
                }
            }

            this.setState({
                isScrolling: true,
                index: index
            }, ()=> {
                $(this.container).animate({
                    "margin-top": -$(window).height() * this.state.index
                }, 800, "linear", ()=> {
                    this.setState({isScrolling: false});
                });
            });
        });

    }

}

module.exports = scroll;

