var iconv = require('iconv-lite');
var fs = require('fs');
fs.readFile('hello.txt',function(err,content){
    var s = iconv.decode(content, 'gbk');
    console.log(s);
})

