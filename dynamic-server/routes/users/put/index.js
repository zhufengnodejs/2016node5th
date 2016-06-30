var fs = require('fs');
var querystring = require('querystring');
module.exports = function(query,request,response){
    var user = '';
    request.on('data',function(data){
        user += data;
    })
    request.on('end',function(){
        user = querystring.parse(user);
        fs.readFile(DB_NAME,'utf8',function(err,data){
            var users = JSON.parse(data);
            users = users.map(function(item){
                if(item.id == user.id){//给此item要用新传过来的user替换掉
                    return user;
                }else{
                    return item;
                }
            });
            fs.writeFile(DB_NAME,JSON.stringify(users),function(err){
                if(err){
                    response.statusCode = 500;
                    response.end(JSON.stringify({
                        code:'error',
                        data:err
                    }));
                }else{
                    response.writeHead(200, {
                        'Content-Type': 'application/json;charset=utf-8'
                    });
                    response.end(JSON.stringify({
                        code:'success',
                        data:user
                    }));
                }
            })
        })
    });
}