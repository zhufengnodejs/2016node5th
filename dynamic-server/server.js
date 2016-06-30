var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var querystring = require('querystring');
global.DB_NAME = './users.json';
http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);//得到url对象
    var pathname = urlObj.pathname;//得到路径名
    var query = urlObj.query;//得到查询字符串对象
    var method = request.method;//取得请求的方法
    pathname = pathname + (pathname.endsWith('/') ? 'index.html' : '');
    request.setEncoding('utf8');//设置编码类型
    if (pathname == '/users') {
        switch (method) {
            case 'GET':
                require('./routes/users/get')(query,request,
response);
                break;
            case 'POST':
                require('./routes/users/post')(query,request,response);
                break;
            case 'DELETE':
                require('./routes/users/delete')(query,request,response);
                break;
            case 'PUT':
                require('./routes/users/put')(query,request,response);
                break;
        }
    } else {
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