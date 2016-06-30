var fs = require('fs');
var deleteAll = function (path) {
    fs.readdir(path, function (err, files) {
        files.forEach(function (file) {
            var thefile = (path + "/" + file);
            fs.stat(thefile, function (err, s) {
                if (s.isFile()) {
                    fs.unlink(thefile, function () {});
                } else if (s.isDirectory) {
                    deleteAll(path + "/" + file);
                }
            });
        });

        if (files.length == 0) {
            fs.rmdirSync(path);
        }
    });
}

deleteAll("./a");
