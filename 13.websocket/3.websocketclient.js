var WebSocket = require('ws');
//连接本机的9090端口
var socket = new WebSocket('ws://localhost:9090');
//当客户端成功连接上服务器之后执行回调
socket.on('open',function(){
    console.log('连接已经建立');
    socket.send('你好服务器');
});
//客户端监听服务器端的消息
socket.on('message',function(data){
    console.log(data);
});
//监听服务器端的断开连接事件
socket.on('close', function close() {
    console.log('disconnected');
});

