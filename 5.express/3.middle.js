var express = require('express');
var app = express();
/*app.use('/user',function(req,res,next){
    console.log('登录之后才可以访问');
    next();
});*/
app.use(check);
var check = function(req,res,next){
    if(req.url != '/user'){
        console.log('登录之后才可以访问');
        next();
    }else {
        next();
    }
};
app.get('/home',function(req,res){
    res.end('home');
});
app.get('/user',check,function(req,res){
    res.end('user');
});
app.listen(9090);