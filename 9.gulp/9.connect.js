var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('serve',function(){
    $.connect.server({
        root:'./build',//指定静态文件根目录
        port:9090
    });
});