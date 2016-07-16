var express = require('express');
var path = require('path');
var http = require('http');
// app本质上就是一个请求监听函数
var app = express();
//当前目录做为静态文件的根目录
app.use(express.static(__dirname));
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
    var currentRoom;//存放当前用户目前在哪个房间内
    socket.on('message',function(msg){
        //把此消息通知给所有的人
       if(currentRoom){//如果此用户已经进入到了某个房间
           //只向房间内的人说话，也只有此房间内的人能听到
           io.in(currentRoom).emit('message',msg);
       }else{
           //给所有的人说话，所有人都能听到
           io.emit('message',msg);
       }

    });
    //监听客户端加入某个房间的事件
    socket.on('join',function(room){
        socket.join(room);
        currentRoom = room;
    });
    //监听客户端将要离开房间的事件
    socket.on('leave',function(room){
        socket.leave(room);
        currentRoom = null;
    });
});

server.listen(9090);


/**
 * 实现一个聊天室，并实现分房间的功能
 * 1. 在客户端可以向服务器发消息
 * 2. 服务器把此消息通知给所有的客户端
 *
 **/