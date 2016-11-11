/**
 * линтуем JS
 */

'use strict';


var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../config').js;
var stylish = require('jshint-stylish');
var hintOptions = {
    esnext: true,
    curly: true,
    eqeqeq: true,
    forin: true,
    freeze: true,
    maxparams: 3
}

gulp.task('jshinter', function () {
    return gulp.src(config.src)
        .pipe(jshint(hintOptions))
        .pipe(jshint.reporter(stylish));
});