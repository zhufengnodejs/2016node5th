var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
//使用session中间件之后，会在 req.session 就是属于此客户端那份数据
app.use(session({
    name:'sessionKey',
    resave:true,//不管session是否修改过，都需要重新保存
    saveUninitialized:true,//是否保存只创建但未使用过的session
    secret:'zfpx' //秘钥 用来加密cookie
}));
app.get('/visit',function(req,res){
    var count = req.session.count;
    if(count){
        req.session.count+=1;
    }else{
        req.session.count = 1;
    }
    res.send(`这是你的第${req.session.count}次访问`);
});
app.listen(9090);