var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.set('view engine','html');
app.set('views',__dirname);
var system = {
    username:'zfpx',
    password:'123'
}
/**
 * 1.先访问首页，点击链接跳到登录页
 * 2. 在登录页填写用户名和密码，然后提交表单
 * 3. 在服务器验证用户名和密码是否正确，如果正确则写入cookie
 * 4. 写入之后再跳到用户主界面并显示 cookie 里的用户名
 */
//为特定的后缀模板指定渲染的方法
app.engine('html',require('ejs').__express);
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.get('/',function(req,res){
  res.render('home',{title:'home'});
});
app.get('/login',function(req,res){
    res.render('login',{title:'login'});
});
app.post('/login',function(req,res){
  var user = req.body;
  if(user.username == system.username && user.password == system.password){
      res.cookie('username',user.username);
      res.redirect('/user');
  }else{
      res.redirect('/login');//重定向 让客户端重新向另外一个地址发起请求
  }
});
app.get('/user',function(req,res){
    res.render('user',{title:'user',username:req.cookies.username});
});

app.listen(9090);