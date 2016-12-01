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
        /*'spinners/green/20/',
        'spinners/yellow/20/',
        'spinners/red/20/',
        'spinners/blue/50/',
        
        'falling/blue/1/',
        'falling/blue/2/',
        'falling/blue/3/',
        'falling/blue/4/',
        'falling/blue/5/',
        'falling/blue/6/',
        'falling/blue/7/',
        'falling/blue/8/',
        'falling/blue/9/',
        'falling/blue/10/',
        'falling/blue/11/',
        'falling/blue/12/',
        'falling/blue/13/',
        'falling/blue/14/',
        'falling/blue/15/',
        'falling/blue/16/',
        'falling/blue/17/',
        'falling/blue/18/',
        'falling/blue/19/',
        'falling/blue/20/',
        
        'falling/green/1/',
        'falling/green/2/',
        'falling/green/3/',
        'falling/green/4/',
        'falling/green/5/',
        'falling/green/6/',
        'falling/green/7/',
        'falling/green/8/',
        'falling/green/9/',
        'falling/green/10/',
        'falling/green/11/',
        'falling/green/12/',
        'falling/green/13/',
        'falling/green/14/',
        'falling/green/15/',
        'falling/green/16/',
        'falling/green/17/',
        'falling/green/18/',
        'falling/green/19/',
        'falling/green/20/',
        
        'falling/red/1/',
        'falling/red/2/',
        'falling/red/3/',
        'falling/red/4/',
        'falling/red/5/',
        'falling/red/6/',
        'falling/red/7/',
        'falling/red/8/',
        'falling/red/9/',
        'falling/red/10/',
        'falling/red/11/',
        'falling/red/12/',
        'falling/red/13/',
        'falling/red/14/',
        'falling/red/15/',
        'falling/red/16/',
        'falling/red/17/',
        'falling/red/18/',
        'falling/red/19/',
        'falling/red/20/',
        
        'falling/yellow/1/',
        'falling/yellow/2/',
        'falling/yellow/3/',
        'falling/yellow/4/',
        'falling/yellow/5/',
        'falling/yellow/6/',
        'falling/yellow/7/',
        'falling/yellow/8/',
        'falling/yellow/9/',
        'falling/yellow/10/',
        'falling/yellow/11/',
        'falling/yellow/12/',
        'falling/yellow/13/',
        'falling/yellow/14/',
        'falling/yellow/15/',
        'falling/yellow/16/',
        'falling/yellow/17/',
        'falling/yellow/18/',
        'falling/yellow/19/',

        'burst/red/20/',
        'burst/green/20/',
        'burst/yellow/20/',
        'burst/blue/50/'*/

        'destroy/red/20/',
        'destroy/yellow/20/',
        'destroy/green/20/',
        'destroy/blue/50/'
        
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
