var gulp = require('gulp');

gulp.task('buy',function(){
  console.log('buy');
});

gulp.task('cook',['buy'],function(){
  console.log('cook');
});
//任务依赖的其它任务， 是一个数组，当前任务会在所有其它依赖的
//任务完成之后才继续执行
gulp.task('eat',['cook'],function(){
  console.log('eat');
});