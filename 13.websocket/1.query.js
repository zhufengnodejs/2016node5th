var express = require('express');
var path = require('path');
var app = express();
app.get('/query',function(req,res){
    //发送文件的话，它的参数是一个绝对路径
    res.sendFile(path.resolve('./1.query.html'));
});
app.get('/long',function(req,res){
    //发送文件的话，它的参数是一个绝对路径
    res.sendFile(path.resolve('./2.long.html'));
});
//当客户端访问根目录的时候返回当前时间
app.get('/clock',function(req,res){
    setTimeout(function(){
        res.send(new Date());// end方法
    },1000);
});
app.listen(9090);