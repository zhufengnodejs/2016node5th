var http = require('http');
var fs = require('fs');
var client = require('./1.client');
http.createServer(function(req,res){
  fs.readFile('./index.html','utf8',function(err,data){
      client(function(categories){
          data = data.replace('{{content}}',categories);
          res.setHeader('Content-Type','text/html;charset=utf-8');
          res.end(data);
      });
  })
}).listen(9090);