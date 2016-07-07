var gulp = require('gulp');

gulp.task('uglify',function(){
  console.log('压缩JS文件!');
});

gulp.task('concat',function(){
  console.log('把多个JS文件拼成一个文件!');
});

gulp.task('default',function(){
  gulp.watch(
      './src/js/*.js',
      ['concat','uglify']
  );
});
gulp.task('watch',function(){
  gulp.watch(
      './src/js/*.js',
      function(event){//当监控的文件发生变化之后调用的回调函数，并接收事件对象
        var type = event.type;//变化的类型
        var path = event.path;//变化的路径
        console.log(type,path);
      }
  );
});