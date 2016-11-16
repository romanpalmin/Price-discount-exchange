/**
 * Компилирует css из less
 */
var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    config = require('../config'),
    deploy = require('../config').paths.deploy,
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less');

gulp.task('less', function () {
    return gulp.src(config.less.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('less.all.css'))
        /* минифифируем на проде
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))*/
        .pipe(gulp.dest(config.less.dest))
        .pipe(gulp.dest(deploy.css));
});