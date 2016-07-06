var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('minifyHtml',function(){
    gulp.src('./src/index.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./build'));
});