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