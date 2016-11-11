/**
 * Подчищаем мусор.
 * (костыль)нужно сделать так, чтобы мусора не оставалось в процессе компиляции
 */

var gulp   = require('gulp');
var del    = require('del');
var config = require('../config').gc;

gulp.task('gc', function (cb) {
    return del(config.src, cb);
});