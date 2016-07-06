var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('jshint',function(){
    gulp.src('./src/js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter())
});
// gulp项目实战
// babel + es6 +promise + webpack+ react基础