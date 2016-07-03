var express = require('express');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
/**
 * 1.当顾客第一次访问理发店的时候，发一张会员卡，余额100，
 * 顾客把会员卡带回家
 * 2. 当顾客 再次来店里的时候要把这张会员卡带上
 * 3. 理发店通过卡号查询出此卡号对应余额，每消费一次减少10元。
 *
 *
 */
var SESSION_KEY = 'session.key';
app.get('/hair',function(req,res){
   var cookies = req.cookies;
   var sessionId =  cookies[SESSION_KEY];
   if(sessionId){//如果有卡号表示是老顾客
       var sessionObj=JSON.parse(fs.readFileSync('./session.json','utf8'));
       var balance = sessionObj[sessionId];
       if(balance){
           //sessionObj[sessionId] -= 10;//把余额减少10块
           fs.writeFileSync('./session.json',JSON.stringify(sessionObj));
           res.send('欢迎再次光临，你还剩'+sessionObj[sessionId]+'元');
       }else{
           generate();
       }
   }else{
       generate();
   }
    function generate(){
        //读出原有的session对象
        var sessionObj=JSON.parse(fs.readFileSync('./session.json','utf8'));
        var sessionId = Date.now()+'';//生成一个卡号
        sessionObj[sessionId] =  100;//在服务器端记录此卡号对应的余额
        fs.writeFileSync('./session.json',JSON.stringify(sessionObj));
        res.cookie(SESSION_KEY,sessionId);//把此cookie发送给客户端
        res.send(`欢迎初次光临，送你一张100元价值理发卡`);
    }
});
app.listen(9090);