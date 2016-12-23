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
    let config = require('./webpack.config.js');
    gulp.src('test/main.jsx')
        .pipe(webpack(config))
        .on('error', function (err) {
            gutil.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('test/'));
});

gulp.task('buildG02', function () {
    let config = require('./webpack.config.js');
    gulp.src('test/main.jsx')
        .pipe(webpack(config))
        .on('error', function (err) {
            gutil.log('Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('dist/G02DataAnalysis/client/login'));
});
