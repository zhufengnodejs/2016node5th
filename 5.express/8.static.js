var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
function static(static_name,options){
    return function(req,res,next){
       var filename = path.join(__dirname,static_name,req.path);
       var dotStart = filename.startsWith('.');
       if(dotStart){//如果以点开头的话
            if(options.dotfiles=='deny'){
                res.statusCode = 403;
                res.send('不允许访问');
            }else if(options.dotfiles=='allow'){
                sendFile(filename);
            }else{
                next();
            }
       }

    }
    function sendFile(filename){
        fs.exists(filename,function(exists){
            if(exists){
                if(options.etag){
                    fs.readFile(filename,function(err,data){
                        res.setHeader('Etag',require('crypto').createHash('md5').update(data).digest('hex'));// If-None-Match
                        if(options.lastModified){
                            fs.stat(filename,function(err,stat){
                                res.setHeader('Last-Modified',stat.ctime.toGMTString()); // If-Modified-Since
                                fs.createReadStream(filename).pipe(res);
                            })
                        }else{
                            res.setHeader('Cache-Control',"Max-Age="+options.maxAge);
                            if(options.setHeaders){
                                options.setHeaders(res);
                            }
                            fs.createReadStream(filename).pipe(res);
                        }

                    })
                }else{
                    fs.createReadStream(filename).pipe(res);
                }

            }else{
                next();
            }
        })
    }
}

app.use(static('public',{
    dotfiles:'allow', //是否允许使用.开头的文件
    etag:true,
    extensions:['js','css'],
    index:'index.html',
    maxAge:10,
    setHeaders:function(res){
        res.setHeader('name','zfpx');
    }

}));
app.get('*',function(req,res){
    res.end('404');
});
app.listen(9090);