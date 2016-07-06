var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('image',function(){
    gulp.src('./src/img/qq.jpg')
    .pipe($.imagemin([$.imagemin.gifsicle(), $.imagemin.jpegtran(), $.imagemin.optipng(), $.imagemin.svgo()]))
    .pipe(gulp.dest('./build/img'));
});