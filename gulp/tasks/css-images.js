/**
 * Оптимизирует и копирует изображения
 */
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    flatten = require('gulp-flatten'),
    config = require('../config'),
    deploy = require('../config').paths.deploy;

gulp.task('css-images', function () {
    return gulp.src(config.css.images.src)
    //.pipe(imagemin())
    //.pipe(flatten())
        .pipe(gulp.dest(config.css.dest))
        .pipe(gulp.dest(deploy.css));
});
