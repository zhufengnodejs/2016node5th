var Promise = require('bluebird');
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
})