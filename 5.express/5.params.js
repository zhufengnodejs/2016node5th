var express = require('express');
var url = require('url');
var app = express();
app.use(function(req,res,next){
    var urlObj = url.parse(req.url,true);
    req.path = urlObj.pathname;
    req.query = urlObj.query;
    req.host = req.headers['host'];
    next();
});
app.get('/home',function(req,res){
    console.log(req.host);
    console.log(req.method);
    console.log(req.path);
    console.log(req.headers);
    console.log(req.query);
    res.end('home');
});
app.listen(9090);