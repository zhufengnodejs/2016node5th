var http = require('http');
http.createServer(function(req,res){
  var urlObj = require('url').parse(req.url,true);
  var pathname = urlObj.pathname;
  if(pathname == '/write'){
      res.setHeader('Set-Cookie',"age=6; Domain=localhost");
      res.end();
  }else if(pathname == '/read'){
      res.end(req.headers['cookie']);
  }
}).listen(9090);