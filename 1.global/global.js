/*
  相同点是 把相关的逻辑放在同步代码之后执行
  不同点在于
 */
setImmediate(function(){
    console.log('setImmediate');
});

process.nextTick(function(){
    console.log('nextTick');
});

console.log('hello');