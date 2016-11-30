var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');

var src = 'sprites/src/';
var dest = 'sprites/dest/';
var folders =
    [
        'spinners/green/',
        'spinners/red/'
    ];

function getName(path) {
    var arr = path.split('/');
    var name = '';
    arr.forEach(function (elem) {
        name += isNaN(elem) ? elem[0] + '-' : elem + '-';
    });
    return name.substring(0, name.length-1);
}

gulp.task('sprites', function () {
    var tasks = folders.map(function (path) {
        return gulp.src(src + path + '**/*.png')
         .pipe(spritesmith({
         imgName: path + getName(path) + '20.png',
         cssName: path + getName(path) + '20.css'
         }))
         .pipe(buffer())
         .pipe(imagemin())
         .pipe(gulp.dest(dest));
    });
    return merge(tasks);
});
