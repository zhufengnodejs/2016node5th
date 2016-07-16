var express = require('express');
var path = require('path');
var http = require('http');
// app本质上就是一个请求监听函数
var app = express();
//当客户端访问/的时候返回index.html文件
app.get('/',function(req,res){
    res.sendFile(path.resolve('index.html'));
});

//创建一个http服务器
var server = http.createServer(app);
//引用socket.io 监听客户端的连接
var io = require('socket.io')(server);
//监听客户端发出的websocket请求
io.on('connection',function(socket){
    console.log('客户端已经连接');
    socket.on('message',function(msg){
        console.log(msg);
        socket.send('客户端');
    });
});

server.listen(9090);


