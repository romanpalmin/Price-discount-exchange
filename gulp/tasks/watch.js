'use strict';

var gulp   = require('gulp');
var config = require('../config');
gulp.task('watch', function () {
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.index.src, ['copyindex']);
    gulp.watch(config.js.src, ['js']);
    gulp.watch(config.less.src, ['less']);
    gulp.watch(config.images.src, ['images']);
});