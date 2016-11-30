var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');
var config = require('../config');

var src = 'sprites/src/';
var dest = 'sprites/dest/';
var folders =
    [
        'spinners/green/20/',
        'spinners/yellow/20/',
        'spinners/red/20/'
    ];

function getName(path) {
    var arr = path.split('/');
    var name = '';
    arr.forEach(function (elem) {
        name += isNaN(elem) ? elem[0] + '-' : elem + '-';
    });
    name = name.substring(0, name.length - 2);
    return name;
}

gulp.task('sprites', function () {
    var tasks = folders.map(function (path) {
        return gulp.src(src + path + '*.png')
            .pipe(spritesmith({
                imgName: 'images/sprites/' + getName(path) + '.png',
                cssName: getName(path) + '.css'
            }))
            .pipe(buffer())
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(dest))
            .pipe(gulp.dest(config.paths.src + '/css'));
    });
    return merge(tasks);
});
