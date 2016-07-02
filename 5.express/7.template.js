/**
 * 模板的特点 动静结合
 *
 */

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var username = 'zfpx';
// set 可以设置一些变量的值
//设置模板引擎
app.set('view engine','ejs');
//设置模板的存放目录
//app.set('views','views');
app.set('views',path.join(__dirname,'views'));
/**
 * 1. 读取模板内容 views+ 模板的相对路径
 * 2. 渲染 模板+数据
 */
/*app.use(function(req,res,next){
    res.render = function(tmpl,data,callback){
        //得到模板存放的绝对路径
        var tmplName = path.join(app.get('views'),tmpl);
       //如果说路径没有.ejs后缀的话则添加.ejs后缀
        tmplName = tmplName+(tmplName.endsWith('.ejs')?'':'.ejs');
        //读取模板文件的内容
        fs.readFile(tmplName,'utf8',function(err,content){
            content = content.replace(/<%=(\w+)%>/g,function(all,attr){//attr 表示第一个分组
                //用对象的属性把对应的字符串替换掉
                return data[attr];
            });
            if(callback){//
                callback(err,content);
            }else{
                res.send(content);
            }
        })

    }
    next();
});*/
app.get('/',function(req,res){
    //渲染模板 1. 模板路径 2  模板数据对象
    res.render('user',{username:'zfpx',age:8},function(err,data){
        //如果没有指定回调函数则自动化渲染后的内容发送给客户端
       // 如果指定了回调函数，则把渲染后的内容传递给回调函数，要求回调函数自行发送响应
        data = data.replace('zfpx','ZFPX');
       res.end(data);
    });
});
//如果你需要给所有的模板都赋一个变量的话，
app.use(function(req,res,next){
    res.locals.username = 'zfpx222';
    next();
});

/**
 * 其实真正渲染模板的数据对象是 res.locals
 */
app.get('/home',function(req,res){
    res.render('home',{msg:'home'});
});
app.get('/contact',function(req,res){
    res.render('contact',{msg:'contact'});
});
app.listen(9090);
