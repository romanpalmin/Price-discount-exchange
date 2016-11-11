/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');

gulp.task('copydata', function () {
    return gulp.src(config.data.src)
        .pipe(gulp.dest(config.paths.deploy.data))
        .pipe(gulp.dest(config.data.dest));
});