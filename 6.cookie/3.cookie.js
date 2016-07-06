var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser('zfpx'));//制定加密的秘钥
app.get('/write',function(req,res){
    res.cookie('name','hello',{signed:true});//表示此cookie要进行签名认证
    res.end();
});
//从请求头中获取cookie
app.get('/read',function(req,res){
    //res.send(req.cookies);
    //name=name=s%3Ahello.uWC6ABxDv9llmQF9BdqqXLLtJVwK1cKkPS5F4Qgec2A
    // hello.uWC6ABxDv9llmQF9BdqqXLLtJVwK1cKkPS5F4Qgec2A
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})
app.listen(9090);
