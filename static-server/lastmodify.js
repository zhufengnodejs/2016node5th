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
    console.log(request.url);
    var query = urlObj.query; //取得查询字符串对象
    var filename = '.'+pathname;
    fs.exists(filename,function(exists){
        if(exists){
           //1. 取出请求头中的if-modified-since 自从上次修改过后是否有改过了呢
            var isModifiedSince = request.headers['if-modified-since'];//得到请求头中的最后修改时间
            if(isModifiedSince){
                fs.stat(filename,function(err,stat){
                    // 如果客户端传过来的此文件的上次修改时间和服务器获取的最后修改时间一致的话，意味着文件未修改过
                    if(isModifiedSince == stat.ctime.toGMTString()){
                        //如果返回304，服务器告诉 浏览器你的缓存是最新的，可以大胆的使用
                        response.statusCode = 304;
                        response.end('Not Modified');
                    }else{
                        sendFile();
                    }
                })
            }else{//如果没有此请求头则表示没有缓存过
                sendFile();
            }

        }else{
            response.statusCode = 404;
            response.end('Not Found');
        }
    })

    function sendFile(){
        response.statusCode = 200;
        response.setHeader('Content-Type',mime.lookup(filename));
        fs.stat(filename,function(err,stat){
            //设置让客户端进行缓存，并设置有效期
            response.setHeader('Cache-Control','Max-Age=10');
            response.setHeader('Last-Modified',stat.ctime.toGMTString());//返回最后修改时间
            fs.createReadStream(filename).pipe(response);
        })
    }
}).listen(9090);
// write after end 在end之后又写入了响应体