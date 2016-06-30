var fs = require('fs');
var mime = require('mime');
module.exports = function(pathname,response){
    var filename = '.' + pathname;
    fs.exists(filename, function (exists) {
        if (exists) {
            response.setHeader('Content-Type', mime.lookup(filename));
            fs.createReadStream(filename).pipe(response);
        } else {
            response.statusCode = 404;
            response.end('Not Found');
        }
    })
}