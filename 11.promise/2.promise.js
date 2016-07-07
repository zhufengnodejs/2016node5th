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
readFile('1.txt').then(function(data){
    console.log(data);// 2.txt
    return readFile(data);//读取2.txt2
}).then(function(data){
    console.log(data);
    return readFile(data);// 读取3.txt
}).then(function(data){
    console.log(data);
}).catch(function(err){
    console.error(err);
});