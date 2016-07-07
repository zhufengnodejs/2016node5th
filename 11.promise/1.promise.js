/**
 * 刚创建promise的时候它是pending状态
 * resolve 是一个函数，如果你这个任务成功了，则调用resolve方法，把状态从pending 成功态
 * reject 是一个函数，如果这个任务失败了，调用reject, 把状态改为失败态
 */
var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        var n = Math.random();
        if(n>0.5)
            resolve('成功'+n);//表示这件事情已经做完，并且已经成功，并把成功的结果做为参数传递给resolve
        else
            reject('失败'+n);//如果事情做完，但失败了，调用reject,并把失败的原因传递给reject方法
    },3000);
});
//promise有一个then方法，接收二个参数
//第一个参数是成功的回调，第二个参数是失败的回调
promise.then(function(data){// data代表成功的结果
  console.log(data);
},function(reason){//失败的原因
   console.error(reason);
});