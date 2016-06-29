var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);//得到url对象
    var pathname = urlObj.pathname;//得到路径名
    var query = urlObj.query;//得到查询字符串对象
    pathname = pathname + (pathname.endsWith('/') ? 'index.html' : '');
    if(pathname == '/users'){
        fs.readFile('./users.json','utf8',function(err,data){
            if(err){
                response.statusCode = 500;
                response.end(JSON.stringify({code:'error',data:err}));
            }else{
                response.writeHead(200,{
                    'Content-Type':'application/json;charset=utf-8'
                });
                response.end(JSON.stringify({code:'ok',data:JSON.parse(data)}));
            }
        })
    }else{
        var filename = '.' + pathname;
        fs.exists(filename, function (exists) {
            if (exists) {
                response.setHeader('Content-Type', mime.lookup(filename));
                fs.createReadStream(filename).pipe(response);
            } else {
                response.statusCode = 404;
                response.end('Not Found');
            }
        })
    }



}).listen(9090);