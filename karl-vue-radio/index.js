"use strict";

var Vue = require("vue");

Vue.component('my-component', {
    // 选项
    template: React.createElement(
        "div",
        { className: css.base + " react-radio" },
        React.createElement(
            "div",
            { className: css.display, onClick: undefined.panelToggle },
            "" + prefix + undefined.state.value + suffix,
            React.createElement("i", { className: "fa fa-caret-down" })
        ),
        React.createElement(
            "div",
            { className: css.panel,
                onClick: function onClick(e) {
                    e.stopPropagation();
                },
                style: undefined.state.panelShow ? {} : { display: "none" } },
            React.createElement(
                "div",
                { className: css.filter },
                React.createElement("input", { onChange: undefined.filterChange,
                    value: undefined.state.filterValue,
                    placeholder: "filter" })
            ),
            React.createElement(
                "div",
                { className: css.options },
                undefined.state.pageData.map(function (d, i) {
                    return React.createElement("div", { key: i, className: css.option, onClick: function onClick() {
                            undefined.select(d);
                        }, dangerouslySetInnerHTML: undefined.setOptionHtml(d) });
                }),
                React.createElement(
                    "div",
                    { className: css.page },
                    React.createElement(
                        "button",
                        { className: css.pageLeft, onClick: function onClick() {
                                undefined.pageToStart();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-left" })
                    ),
                    React.createElement(
                        "button",
                        { className: css.pageLeft, onClick: function onClick() {
                                undefined.pageLeft();
                            } },
                        React.createElement("i", { className: "fa fa-angle-left" })
                    ),
                    undefined.state.pageIndex + 1 + "/" + (Math.ceil(undefined.state.filterData.length / 10) == 0 ? 1 : Math.ceil(undefined.state.filterData.length / 10)),
                    React.createElement(
                        "button",
                        { className: css.pageRight, onClick: function onClick() {
                                undefined.pageRight();
                            } },
                        React.createElement("i", { className: "fa fa-angle-right" })
                    ),
                    React.createElement(
                        "button",
                        { className: css.pageRight, onClick: function onClick() {
                                undefined.pageToEnd();
                            } },
                        React.createElement("i", { className: "fa fa-angle-double-right" })
                    )
                )
            )
        )
    )
});
