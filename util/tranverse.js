var fs = require('fs');
var path = require('path');
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);
        callback(pathname);
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        }
    })
}

travel('./a',function(p){
    console.log(p)
});