'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var browserify = require('gulp-browserify');
var autoprefixer = require('autoprefixer');

gulp.task('build', function () {
    var postcss = require('gulp-postcss');
    // var sourcemaps   = require('gulp-sourcemaps');

    return gulp.src('karl-component-radio/index.css')
    // .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('karl-component-radio/bundle.css'));
});

//# sourceMappingURL=gulp.js.map