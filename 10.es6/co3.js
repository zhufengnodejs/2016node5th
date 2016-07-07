var fs = require('fs');
var co = require('co');
function read(filename) {
    return function(cb){
        fs.readFile(filename,'utf8',cb);
    }
}
// 要求每次产出的是一个函数，可以接收一个函数参数，并且会在
//函数里在调用传入的函数参数，并提供结果
co(function *(){
    var file1 = yield read('1.txt'); /// 2.txt
    var file2 = yield read(file1);
    console.log(file2);
});