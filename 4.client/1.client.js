var http = require('http');
//把一个GBK的字节流(buffer) 转成utf-8字符串
var iconv = require('iconv-lite');
// req是一个可写流
module.exports = function(callback){
    var req = http.request({
        hostname:'top.baidu.com',
        port:80,
        path:'/category?c=10&fr=topindex',
        method:'GET',
        header:{}
    },function(response){
        //也是一个流对象
        console.log(response.statusCode);
        console.log(response.headers);
        // GB2312 国标 GBK 国标扩展
        var bufs = [];
        response.on('data',function(data){
            bufs.push(data);
        })
        response.on('end',function(){
            var buffer = Buffer.concat(bufs);
            var result = iconv.decode(buffer,'gbk');
            var reg = /<a.+?<\/a>/g;
            var categories = result.match(reg);
            categories = categories.filter(function(category){
                return category.includes('buzz');
            });
            callback(categories);
        });
    });
    req.write('请求体');
//当调用end的时候请求才会真正发出
    req.end();
}

