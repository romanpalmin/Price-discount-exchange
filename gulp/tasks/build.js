'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
    return runSequence('clean', 'css', 'fonts', 'js', 'vendor', 'images', 'copyindex', 'copydata', 'copyutils', 'less', 'gc', 'jshinter', cb);
});