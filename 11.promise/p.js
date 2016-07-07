var Promise = require('./Promise');
var promise = new Promise(function(resolve,reject){
    setTimeout(function(){
        var n = Math.random();
        if(n>0.5)
            resolve('成功'+n);
        else
            reject('失败'+n);
    },3000);
});

promise.then(function(data){
    console.log(data);
},function(reason){
    console.error(reason);
});