/**
 * Копирует вспомогательные страницы
 */
var gulp = require('gulp'),
    config = require('../config');

gulp.task('copyutils', function () {
    return gulp.src(config.utils.src)
        .pipe(gulp.dest(config.utils.dest))
        .pipe(gulp.dest(config.paths.deploy.utils));
});