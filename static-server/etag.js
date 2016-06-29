var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var crypto = require('crypto');
//创建服务器
/**
 * request 请求行 请求头 请求体
 * response 响应行 响应头 响应体
 */
http.createServer(function(request,response){
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;//得到路径名
    pathname = pathname+ (pathname.endsWith('/')?'index.html':'');
    console.log(request.url);
    var query = urlObj.query; //取得查询字符串对象
    var filename = '.'+pathname;
    fs.exists(filename,function(exists){
        if(exists){
            //先取出请求头中的上次的etag的值
            var ifNoneMatch = request.headers['if-none-match'];
            if(ifNoneMatch){
                var rs = fs.createReadStream(filename);
                var md5 = crypto.createHash('md5');
                rs.on('data',function(data){
                    md5.update(data);
                });
                rs.on('end',function(){
                    var etag = md5.digest('hex');
                    if(ifNoneMatch == etag){
                        response.statusCode = 304;
                        response.end();
                    }else{
                        sendFile(etag);
                    }
                });
            }else{// 第一次的肯定没有值
               var rs = fs.createReadStream(filename);
               var md5 = crypto.createHash('md5');
               rs.on('data',function(data){
                  md5.update(data);
               });
               rs.on('end',function(){
                  var etag = md5.digest('hex');
                  sendFile(etag);
               });

            }
        }else{
            response.statusCode = 404;
            response.end('Not Found');
        }
    })

    function sendFile(etag){
        response.statusCode = 200;
        response.setHeader('Content-Type',mime.lookup(filename));
        fs.stat(filename,function(err,stat){
            response.setHeader('Cache-Control','Max-Age=10');
            response.setHeader('Etag',etag);//返回最后修改时间
            fs.createReadStream(filename).pipe(response);
        })
    }
}).listen(9090);
// write after end 在end之后又写入了响应体