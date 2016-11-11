/**
 * Компилирует css
 */
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    config = require('../config').css,
    autoprefixer = require('gulp-autoprefixer'),
    deploy = require('../config').paths.deploy;

gulp.task('css', function () {
    return gulp.src(config.src)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('style.all.min.css'))
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(gulp.dest(deploy.css));
});