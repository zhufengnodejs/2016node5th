var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('copy-html',function(){
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build')).
     pipe($.connect.reload())
});

gulp.task('watch',function(){
   gulp.watch('./src/index.html',['copy-html']);
});

gulp.task('serve',function(){
    $.connect.server({
        root:'./build',//指定静态文件根目录
        port:9090,
        livereload:true//启动实时刷新功能
    });
});

gulp.task('default',['serve','watch']);