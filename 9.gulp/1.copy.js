var gulp = require('gulp');
//定义一个拷贝任务
gulp.task('copy',function(){
  gulp.src('./src/js/*.js')//得到的输入文件流
    .pipe(gulp.dest('./build/all2.js'));//指定要保存的目录
});
/**
 * 生成的路径是由dest里面指定的目录+src里面有通配符开始的那段路径
 * build/js/a.js
 * 如果指定了base路径，那么生成的路径等于
 * 原路径减去base路径
 */
gulp.task('copy2',function(){
  gulp.src('./src/js/*.js',{base:'./src'})//得到的输入文件流
      .pipe(gulp.dest('./build'));//指定要保存的目录
});
/**
 * {
 * filename文件名: all.js
 * content:文件内容: var a='hello';console.log(a);
 * }
 */
