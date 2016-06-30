var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var querystring = require('querystring');
var DB_NAME = './users.json';
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
                var id = query.id;
                if(id){
                    fs.readFile(DB_NAME, 'utf8', function (err, data) {
                        if (err) {
                            response.statusCode = 500;
                            response.end(JSON.stringify({code: 'error', data: err}));
                        } else {
                            response.writeHead(200, {
                                'Content-Type': 'application/json;charset=utf-8'
                            });
                            var users = JSON.parse(data);
                            var user = users.filter(function(user){
                                return user.id == id;
                            })[0]||{};
                            response.end(JSON.stringify({code: 'ok', data: user}));
                        }
                    })
                }else{
                    fs.readFile(DB_NAME, 'utf8', function (err, data) {
                        if (err) {
                            response.statusCode = 500;
                            response.end(JSON.stringify({code: 'error', data: err}));
                        } else {
                            response.writeHead(200, {
                                'Content-Type': 'application/json;charset=utf-8'
                            });
                            response.end(JSON.stringify({code: 'ok', data: JSON.parse(data)}));
                        }
                    })
                }

                break;
            case 'POST':
                // request是一个可读流，可以通过监听data和end事件获取其中的数据
                var result = '';
                request.on('data',function(data){//设置编码类型之后data会从buffer转成字符串
                    result += data;
                });
                request.on('end',function(){
                    var user = querystring.parse(result);//把字符串转成对象          //读取文件的内容
                    fs.readFile(DB_NAME,'utf8',function(err,data){
                        var users = JSON.parse(data);//转成JSON对象
                        user.id = users[users.length-1].id+1;
                        users.push(user);
                        fs.writeFile(DB_NAME,JSON.stringify(users),function(err,result){
                            response.writeHead(200, {
                                'Content-Type': 'application/json;charset=utf-8'
                            });
                            response.end(JSON.stringify({
                                code:'ok',
                                data:user
                            }));
                        })
                    })
                });
                break;
            case 'DELETE':
                var id = query.id;
                fs.readFile(DB_NAME,'utf8',function(err,data){
                    var users = JSON.parse(data);
                    users = users.filter(function(user){
                        return user.id != id;
                    });
                    fs.writeFile(DB_NAME,JSON.stringify(users),function(err){
                        if(err){
                            response.statusCode = 500;
                            response.end(JSON.stringify({
                                code:'error',
                                data:err
                            }));
                        }else{
                            response.end(JSON.stringify({
                                code:'success',
                                data:{}
                            }));
                        }
                    })
                })
                break;
            case 'PUT':
                var user = '';
                request.on('data',function(data){
                    user += data;
                })
                request.on('end',function(){
                    user = querystring.parse(user);
                    fs.readFile(DB_NAME,'utf8',function(err,data){
                        var users = JSON.parse(data);
                        users = users.map(function(item){
                            if(item.id == user.id){//给此item要用新传过来的user替换掉
                                return user;
                            }else{
                                return item;
                            }
                        });
                        fs.writeFile(DB_NAME,JSON.stringify(users),function(err){
                            if(err){
                                response.statusCode = 500;
                                response.end(JSON.stringify({
                                    code:'error',
                                    data:err
                                }));
                            }else{
                                response.writeHead(200, {
                                    'Content-Type': 'application/json;charset=utf-8'
                                });
                                response.end(JSON.stringify({
                                    code:'success',
                                    data:user
                                }));
                            }
                        })
                    })
                });
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