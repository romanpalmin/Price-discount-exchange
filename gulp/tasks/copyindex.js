/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    config = require('../config');

gulp.task('copyindex', function () {
    return gulp.src(config.paths.src + '/*.*')
        .pipe(gulp.dest(config.paths.dist))
        .pipe(gulp.dest(config.paths.deploy.index));
});