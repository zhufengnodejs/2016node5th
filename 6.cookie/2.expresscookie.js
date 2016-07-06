var express = require('express');
var app = express();
//var cookieParser = require('cookie-parser');

/**
 *  res.cookie 写cookie
 *  req.cookies 读取请求头中的cookie
 */
function cookieParser(){
    return function(req,res,next){
        var cookies = req.headers.cookie;// name=zfpx; age=6
        //把请求中的cookie转成对象赋给req.cookies
        req.cookies = require('querystring').parse(cookies,'; ');
        res.cookie = function(key,value,options){
            var pairs = [];
            pairs.push(`${key}=${value}`);
            if(options.maxAge){
                pairs.push(`Max-Age=${Math.floor(options.maxAge/1000)}`);
            }
            if(options.domain){
                pairs.push(`Domain=${options.domain}`);
            }
            // .......
            var result =  pairs.join('; ');
            res.setHeader('Set-Cookie',result);
        }
        next();
    }
}

app.use(cookieParser());
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
//从请求头中获取cookie
app.get('/read',function(req,res){
    //当使用了cookieParser之后，会在请求对象上多一个cookies的对象属性
    res.send(req.cookies);
})
//统计一下此客户端访问服务器的次数
app.get('/visit',function(req,res){
    var count = req.cookies.count;
    if(count){
        count = Number(count)+1;
    }else{
        count  = 1;
    }
    res.cookie('count',""+count,{maxAge:30*1000});
    res.send(`这是你第${count}次访问服务器`);
});
app.get('/clear',function(req,res){
    res.clearCookie('balance');//清除客户端的cookie
    res.send(req.cookies);
});

app.listen(9090);