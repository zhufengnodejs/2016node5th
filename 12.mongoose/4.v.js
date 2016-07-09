var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zfpx');
//增加用户
//定义模型的骨架
var UserSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    age:{type:Number},
    hobby:[String]
});
var UserModel = mongoose.model('User',UserSchema);
/*UserModel.create({
    username:'zfpx3',
    password:'zfpx3',
    age:8,
    hobby:[]
},function(err,doc){
    /!*console.log(doc);
    doc.hobby.push('hair');
    doc.save(function(err,result){
        console.log(result);
    });*!/
});*/
//版本锁 版本号


UserModel.findOne({username:'zfpx3'},function(err,doc){
    setTimeout(function(){
        doc.hobby.push('drink');// 1
        doc.save(function(err,result){
            console.log(err);
            console.log(result);
        });
    },1000)
});

UserModel.findOne({username:'zfpx3'},function(err,doc){
    setTimeout(function(){
        doc.hobby.push('eat');
        doc.save(function(err,result){
            console.log('err2',err);
            console.log('result2',result);
        });
    },10000)
});
