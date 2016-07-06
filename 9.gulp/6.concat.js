var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('concat',function(){
    gulp.src(['./src/js/b.js','./src/js/a.js'])
        .pipe($.concat('all.js'))//指定合并后的文件名
        .pipe(gulp.dest('./build/js'))
});