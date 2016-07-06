var express = require('express');
var path = require('path');
var app = express();
//如何 解析multi-part/formdata
var multer = require('multer');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,'uploads')));
var upload = multer({ dest: 'uploads/' });//指定存放文件的目录

app.post('/upload',upload.single('avatar'),function(req,res){
    console.log(req.file);
    res.send(req.file.filename);
});

app.listen(9090);