/**
 * собирает JS
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config').js,
    deploy = require('../config').paths.deploy,
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

gulp.task('js', function () {
    return gulp.src(config.src)
    // подключим далее минификацию, конкатенацию и т.д. по мере необходимости
    .pipe(gulp.dest(config.dest))
        //.pipe(uglify())
        /*.pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .on('error', gutil.log)
            .pipe(sourcemaps.write('./'))*/
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dest))
        //.pipe(concat('bundle.js'))
        .pipe(gulp.dest(deploy.js));
});