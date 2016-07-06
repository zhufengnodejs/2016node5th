var fs = require('fs');
var src = fs.createReadStream('./src/js/all.js');
var dest = fs.createWriteStream('./build/all.js');
//每次读取64K
src.on('data',function(data){
 dest.write(data);
});
src.on('end',function(){
    dest.end();
});