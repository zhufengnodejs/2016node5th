var Promise = require('bluebird');
var fs = require('fs');
//为所有的异步方法添加一个同步方法
Promise.promisifyAll(fs);
var content = fs.readFileAsync('1.txt');
content.then(function(data){
    console.log(data.toString());
});

