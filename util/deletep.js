var fs = require('fs');
var path = require('path');


var rmdirp = function (dir) {

    var arr = [dir];
    var layer = [dir];
    var temp = [];

    function read(dirs) {
        dirs.forEach(function (dir) {
            var files = fs.readdirSync(dir);
            files.forEach(function (file) {
                var filename = path.join(dir, file);
                var stat = fs.statSync(filename);
                if (stat.isDirectory()) {
                    temp.push(filename);
                }
                arr.push(filename);
            })
        });
        if (temp.length > 0) {
            layer = temp;
            temp = [];
            read(layer);
        }
    }

    read(layer);
    return arr;
}

var arr = rmdirp('p1');

function rm() {
    var ele = arr.pop();
    if (ele) {
        fs.stat(ele, function (err, stat) {
            if (stat.isDirectory()) {
                fs.rmdir(ele, function (err) {
                    rm();
                })
            } else {
                fs.unlink(ele, function (err) {
                    rm();
                })
            }
        })
    }
}
rm();