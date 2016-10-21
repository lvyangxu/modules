'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var webpack = require('webpack-stream');
var gutil = require('gulp-util');

gulp.task('build', function () {
    var config = require('./webpack.config.js');
    gulp.src('test/main.js').pipe(webpack(config)).on('error', function (err) {
        gutil.log('Error!', err.message);
        this.end();
    }).pipe(gulp.dest('test/'));
    gulp.src('test/*.js').pipe(rename({ basename: "bundle" }));
});

//# sourceMappingURL=gulp.js.map