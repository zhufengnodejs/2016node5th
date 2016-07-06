var gulp = require('gulp');
//如果此任务中有异步的代码，那么需要接收一个callback的参数
gulp.task('buy',function(next){
  setTimeout(function(){
    console.log('buy');
    //只有调用了callback,那么gulp才会认为此任务完成了
    next();
  },5000);
});

gulp.task('cook',['buy'],function(){
  console.log('cook');
});
//任务依赖的其它任务,是一个数组，当前任务会在所有其它依赖的
//任务完成之后才继续执行
gulp.task('eat',['cook'],function(){
  console.log('eat');
});