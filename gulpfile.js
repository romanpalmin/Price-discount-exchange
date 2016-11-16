'use strict';

var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp/tasks', {recurse: true});

/*
// деплой пока не актуален
gulp.task('release', function () {
    runSequence('build', 'deploy');
});*/

gulp.task('develop', function () {
    runSequence('build', 'watch');
});

gulp.task('building', function () {
    runSequence('build');
});