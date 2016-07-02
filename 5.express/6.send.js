var express = require('express');
var http = require('http');
var app = express();
/**
 * 1. 参数是 string    text/html
 * 2. 参数是 object   application/json
 * 3. 参数是数字的话 会把数字当成状态码
 */
app.use(function(req,res,next){
    //为res添加一个公共方法
    res.send = function(data){
        if(typeof data == 'string'){// 如果是字符串
            res.setHeader('Content-Type','text/html;charset=utf-8');
            res.end(data);
        }else if(typeof data == 'number'){//如果是数字
            res.statusCode = data;
            res.end('');
        }else if(typeof data == 'object'){//如果是对象
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data));
        }
    }
    next();
});
app.get('/string',function(req,res){
    res.send('string');
});
app.get('/number',function(req,res){
    //res.send(500);
    res.sendStatus(500);
});
app.get('/obj',function(req,res){
    res.send({name:'zfpx'});
});

app.listen(9090);