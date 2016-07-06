var express = require('express');
var url = require('url');
var app = express();
/*app.use(function(req,res,next){
    var urlObj = url.parse(req.url,true);
    req.path = urlObj.pathname;
    req.query = urlObj.query;
    req.host = req.headers['host'];
    next();
});*/
app.get('/home',function(req,res){
    console.log(req.host);
    console.log(req.method);
    console.log(req.path);
    console.log(req.headers);
    console.log(req.query);
    res.end('home');
});
// 路径参数
// //users/\w+/
// req.params ={id:123}
// /users/123
app.get('/users/:id/:name/:age',function(req,res){
   res.end(JSON.stringify(req.params));
});
app.listen(9090);