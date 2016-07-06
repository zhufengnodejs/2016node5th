var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('less',function(){
  gulp.src('./src/less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('./build/css'));
});