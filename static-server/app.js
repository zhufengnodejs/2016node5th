var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
//创建服务器
/**
 * request 请求行 请求头 请求体
 * response 响应行 响应头 响应体
 */
http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;//得到路径名
    var query = urlObj.query; //取得查询字符串对象
    var filename = '.'+pathname;
    fs.exists(filename,function(exists){
        if(exists){
            response.statusCode = 200;//成功
            response.setHeader('Content-Type',mime.lookup(filename));
            //告诉浏览器要缓存此文件
            response.setHeader('Cache-Control','Max-Age=20');
            fs.createReadStream(filename).pipe(response);
        }else{
            response.statusCode = 404;
            response.end('Not Found');
        }
    })
}).listen(9090);
// write after end 在end之后又写入了响应体