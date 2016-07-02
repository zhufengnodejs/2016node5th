var http = require('http');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    var method = req.method;
    if(method == 'GET' && pathname == '/home'){
        res.end('hello');
    }else{
        res.end('ÎÞ·¨ '+req.method+' '+req.url);
    }
})