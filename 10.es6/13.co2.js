var fs = require('fs');
function read(filename) {
    return function(cb){
        fs.readFile(filename,'utf8',cb);
    }
}
/*var file1 = fs.readFileSync('1.txt');
var file2 = fs.readFileSync(file1);*/
co(function *(){
    var file1 = yield read('1.txt'); /// 2.txt
    var file2 = yield read(file1);
    console.log(file2);
})();

function co(fn) {
    return function() {
        var iterator = fn();//得到迭代器
        var it = null;//当前的结果
        function _next(err,data) {
            it = iterator.next(data); // it.value =fn
            if(!it.done){//如果没有迭代完成则继续执行
                it.value(_next);
            }
        }
        _next();
    }
}