var fs = require('fs');
module.exports = function(query,request,response){
    var id = query.id;
    fs.readFile(DB_NAME,'utf8',function(err,data){
        var users = JSON.parse(data);
        users = users.filter(function(user){
            return user.id != id;
        });
        fs.writeFile(DB_NAME,JSON.stringify(users),function(err){
            if(err){
                response.statusCode = 500;
                response.end(JSON.stringify({
                    code:'error',
                    data:err
                }));
            }else{
                response.end(JSON.stringify({
                    code:'success',
                    data:{}
                }));
            }
        })
    })
}