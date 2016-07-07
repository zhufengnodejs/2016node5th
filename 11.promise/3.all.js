// promise 的级联调用
var fs = require('fs');
function readFile(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,'utf8',function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}
var p1 = readFile('1.txt');
var p2 = readFile('2.txt');
//只有当所有的promise全部成功之后才会调用成功的回调
//任何一个失败了都会调用失败的回调
/*Promise.all([p1,p2]).then(function(data){
    console.log(data);
},function(error){
    console.error(error);
})*/
//比谁跑的快，如果有任意一个promise成功了，那么就会调用成功的回调
/*
Promise.race([p1,p2]).then(function(data){
    console.log(data);
},function(error){
    console.error(error);
})
*/

//我现在要读取
Promise.all([p1,p2,Promise.resolve(3)]).then(function(data){
    console.log(data.join('+'));
},function(error){
    console.error(error);
})

