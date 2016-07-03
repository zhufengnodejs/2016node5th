var express = require('express');
var app = express();
app.use(function(req,res,next){
    console.log(req.url);
    next();
});
app.get('/write',function(req,res){
    //1. 基本使用
    //res.cookie('name','zfpx');

    // 2.设置域名
   // res.cookie('name','zfpx',{domain:'a.zfpx.cn'});

    // 3. path 指定此COOKIE所属的路径
    //res.cookie('name','zfpx',{path:'/visit'});

    // 4.制定过期时间
    //res.cookie('name','zfpx',{maxAge:20*1000});
   // res.cookie('name','zfpx',{expires:new Date(Date.now()+20*1000)});
    //设置为TRUE意味着不能通过浏览器中的JS访问COOKIE
    res.cookie('balance','300.45');
    res.end();
});
app.get('/read',function(req,res){
    res.send(req.headers.cookie);
})
app.get('/visit',function(req,res){
    res.send(req.headers.cookie);
});
app.get('/visit/v5',function(req,res){
    res.send(req.headers.cookie);
});

app.listen(9090);