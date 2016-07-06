var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('less',function(){
  gulp.src('./src/less/*.less')
    .pipe($.less())//先编译CSS文件
    .pipe(gulp.dest('./build/css'))//保存到硬盘一份
    .pipe($.minifyCss())//压缩 css文件
    .pipe($.rename(function(path){//重命名
        //如果不重命名的话，那么就会覆盖原来的文件
        path.basename += '.min';
    }))
     .pipe(gulp.dest('./build/css'))//再保存一次

});