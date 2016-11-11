/**
 * �������� ���������� ���� ������ �� �������
 */

'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (cb) {
    return runSequence('clean', 'css', /*'css-images',*/ 'js', 'vendor', 'images', 'copyindex', 'copydata', 'less', 'gc', 'jshinter', cb);
});