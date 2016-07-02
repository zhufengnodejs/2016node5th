var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
function static(static_name){
    return function(req,res,next){
       var filename = path.join(__dirname,static_name,req.path);
       fs.exists(filename,function(exists){
           if(exists){
               fs.createReadStream(filename).pipe(res);
           }else{
               next();
           }
       })
    }
}

app.use(static('public'));
app.get('*',function(req,res){
    res.end('404');
});
app.listen(9090);