var express = require('express');
//配置express主要指针对app来配置的
var app = express();
//当客户端以GET方式向/home路径发起请求的时候
app.get('/home',function(req,res){
    res.end('hello');
});

app.post('/user',function(req,res){
    res.end('post user');
});

app.get('/user',function(req,res){
    res.end('user');
});

// all 匹配所有的方法
// * 匹配所有的路径
// 404 的错误
app.all('*',function(req,res){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.end('无法 '+req.method+' '+req.url);
})

app.listen(8080);
