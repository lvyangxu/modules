let Vue = require("vue");
let css = require("./index.css");
let classnames = require("classnames");

Vue.component('my-component', {
    // 选项
    template: `<div class="${css.base}">
        <div class="${css.display}" v-on:click="togglePanel">
            {{${prefix}${value}${suffix}}}
            <i class="fa fa-caret-down"></i>
        </div>
        <div class="${classnames(css.panel, {hide: !this.isPanelShow})}" v-on:click="clickPanel">
            <div class="${css.filter}">
                <input v-model="value" placeholder="filter"/>
            </div>
        </div>
    </div>`,
    data: {
        isPanelShow: false,
    },
    methods: {
        togglePanel: e=> {
            this.isPanelShow = !this.isPanelShow;
        },
        clickPanel: e=> {
            e.stopPropagation();
        }
    }
});

// <div class="${css.options}>"
//      {
//          this.state.pageData.map((d, i) => {
//              return <div key={i} className={css.option} onClick={() => {
//                  this.select(d)
//              }} dangerouslySetInnerHTML={this.setOptionHtml(d)}></div>
//          })
//      }
// <div className={css.page}>
//     <button className={css.pageLeft} onClick={() => {
//         this.pageToStart();
//     }}>
//         <i className="fa fa-angle-double-left"></i>
//     </button>
//     <button className={css.pageLeft} onClick={() => {
//         this.pageLeft();
//     }}>
//         <i className="fa fa-angle-left"></i>
//     </button>
//     {(this.state.pageIndex + 1) + "/" + ((Math.ceil(this.state.filterData.length / 10) == 0)
//         ? 1 : Math.ceil(this.state.filterData.length / 10))}
//     <button className={css.pageRight} onClick={() => {
//         this.pageRight();
//     }}>
//         <i className="fa fa-angle-right"></i>
//     </button>
//     <button className={css.pageRight} onClick={() => {
//         this.pageToEnd();
//     }}>
//         <i className="fa fa-angle-double-right"></i>
//     </button>
// </div>
// </div>