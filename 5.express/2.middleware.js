var express = require('express');
var app = express();
var fs = require('fs');
/**
 * 1. 选择执行中间件
 * 2. 监听 end
 * 3. 作用域
 */
/**
 * 1. 会在真正的路由函数之前执行 use
 * 2. 请求和响应会向后传递
 */
/*//路由 一旦匹配就直接返回，肯定不会继续执行了
app.use(function(req,res,next){
    console.log('next');
    next();
});*/
/**
 *  特点
 *    1. 中间件一般会在路由之前执行
 *    2. 能控制请求是否可以继续向下执行  next继续执行 end 结束响应
 *  用途
 *    1. 添加一些公用的方法
 *    2. 检查权限
 */
app.use(function(req,res,next){
    res.start = Date.now();
    var end = res.end;//先缓存原来系统的end方法
    res.end = function(){// 用自己写的end方法替换了原来的end方法
        console.log('cost ',Date.now() - res.start);
        end.apply(res,Array.prototype.slice.call(arguments));
    }
    next();
});
//中间件 修改请求和响应 并且把请求和响应传递给下一个中间件或路由
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    next();
});
//岳母
app.use(function(req,res,next){
    console.log('按摩椅 吃的 ');
    //res.end('没门');
    next();
});


//真正想要的业务处理函数
app.get('/marry',function(req,res){
    res.end('娶媳妇');
});

app.get('/child',function(req,res){
    res.end('宝宝');
});
function sendfile(filename){
    fs.createReadStream(filename).pipe(res);
};
//1.请求和响应对象在中间件和路由中只有一份
app.use(function(req,res,next){
   /* res.sendfile = function(filename){
        fs.createReadStream(filename).pipe(res);
    }*/
    next();
});
app.get('/index.html',function(req,res){
    sendfile('./index.html');
});
app.get('/index.js',function(req,res){
    sendfile('./index.js');
});

//启动一个http服务器，监听8080端口
app.listen(8080);