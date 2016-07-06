var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session');
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
app.use(session({
    name:'sessionKey',
    resave:true,//不管session是否修改过，都需要重新保存
    saveUninitialized:true,//是否保存只创建但未使用过的session
    secret:'zfpx' //秘钥 用来加密cookie
}));
app.get('/',function(req,res){
  res.render('home',{title:'home'});
});
app.get('/login',function(req,res){
    res.render('login',{title:'login'});
});
app.post('/login',function(req,res){
  var user = req.body;
  if(user.username == system.username && user.password == system.password){
      //res.cookie('username',user.username);
      req.session.username = user.username;
      res.redirect('/user');
  }else{
      res.redirect('/login');//重定向 让客户端重新向另外一个地址发起请求
  }
});
app.get('/user',function(req,res){
    res.render('user',{title:'user',username:req.session.username});
});

app.listen(9090);