require("babel-polyfill");
let React = require("react");
let ReactDom = require("react-dom");

let Com = require("../karl-component-login/index");


ReactDom.render(
    <div>
         <Com/>
    </div>
    , document.getElementById("login"));

//autoprefixer babel-cli babel-core babel-loader babel-plugin-transform-async-to-generator babel-plugin-transform-es3-member-expression-literals babel-plugin-transform-es3-property-literals babel-polyfill babel-preset-es2015 babel-preset-react css-loader del file-loader font-awesome-webpack gulp gulp-clean-css gulp-concat-css gulp-css-url-rebase gulp-htmlmin gulp-postcss gulp-rename gulp-replace gulp-uglify gulp-util jquery karl-component-nav karl-component-radio karl-component-select karl-date karl-extend karl-http less node-sass postcss postcss-loader react react-addons-css-transition-group react-addons-transition-group react-dom sass-loader style-loader url-loader webpack webpack-stream xml2js
//        <Com tableId="create_data" sectionStyle={{padding: "50px"}}/>
