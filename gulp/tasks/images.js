/**
 * Оптимизирует и копирует изображения
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    flatten = require('gulp-flatten'),
    config = require('../config');

gulp.task('images', function () {
    return gulp.src(config.images.src)
        //.pipe(imagemin())
        //.pipe(flatten())
        .pipe(gulp.dest(config.paths.deploy.images))
        .pipe(gulp.dest(config.paths.dist));
});