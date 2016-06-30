



setImmediate(function(){
    console.log('setImmediate');
})

setTimeout(function(){
    console.log('setTimeout');
},300);
// 同步代码
console.log('a');

//nextTick 当前队列尾部
process.nextTick(function(){
    console.log('nextTick');
})