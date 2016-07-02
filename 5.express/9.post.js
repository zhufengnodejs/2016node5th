/**
 * 如果接收客户端发过来的POST请求
 */
var express = require('express');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();
//使用此中间件之后会在 req.body = 请求体转成的对象
// 下面有两个中间件，谁起作用取决于请求头中的Content-Type
// $ curl -X POST --data '{"name":"zfpx"}' -H "Content-Type:application/json" http://localhost:9090/reg
//app.use(bodyParser.json());//处理请求体类型为JSON的请求体 {"name":"zfpx"}
//$ curl -X POST --data 'name=zfpx&age=8' -H "Content-Type:application/x-www-form-urlencoded" http://localhost:9090/reg
//app.use(bodyParser.urlencoded({extended:true}));//处理请求类型为urlencoded 请求体
// name=zfpx&age=8
app.use(function(req,res,next){
    var str = '';
    req.on('data',function(data){
        str += data.toString();
    });
    req.on('end',function(){
        var contentType = req.headers['content-type'];
        if(contentType == 'application/json'){
            req.body = JSON.parse(str);
        }else if(contentType == 'application/x-www-form-urlencoded'){
            req.body = querystring.parse(str);
        }
        next();
    });
});
app.post('/reg',function(req,res){
    console.log(req.body);
    res.send(req.body);
});
app.listen(9090);
