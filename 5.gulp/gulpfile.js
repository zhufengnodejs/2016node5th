var gulp = require('gulp');
// 定义一个任务
// 第一个参数是hello也就是任务的名称
// 第二个参数是任务的定义 是一个匿名函数
gulp.task('default',function(){
    //函数里编写任务的执行逻辑
    console.log('hello');
});