//得到websocket服务器端的构造函数
var WebServer = require('ws').Server;
//监听一个未被别的程序所占用的端口号
var server = new WebServer({port:9090});
//监听客户端的请求,当请求到来的时候会调用回调函数
//ws 代表此客户端的请求对象
server.on('connection',function(ws){
  console.log('客户端已经连接');
  //监听客户端发过来的消息
  ws.on('message',function(msg){
      console.log(msg);
      //服务器向客户端发送消息
      ws.send('不好');
  });
  //监听 客户端断开的连接事件
  ws.on('close',function(){
      console.log('客户端已经断开');
  });
});