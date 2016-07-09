var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zfpx');
//增加用户
//定义模型的骨架
var UserSchema = new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    age:{type:Number},
    friend:{type:mongoose.Schema.Types.ObjectId}
});
//静态方法 类方法 model上的方法
UserSchema.statics.findByAge = function(age,cb){
    // this 指的是当前的model
    this.find({age:age},cb)
}
//定义模型
// 数据库集合的名称 = 模型名转小写，再转复数  User => user => users
var UserModel = mongoose.model('User',UserSchema);
//通过模型 保存文件  =  entity.save
// create一次可以保存多条数据，
/*var users = [];
for(var i=1;i<=10;i++){
    users.push({username:'zfpx'+i,age:i});
}
UserModel.create(users,function(err,doc){
    console.log(doc);
});*/

//查询 第一个参数查询的条件
/*UserModel.find({},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
});
//修改 updsate
UserModel.update({username:'zfpx1'},{$set:{age:8}},function(err,doc){
    if(err){
        console.error(err);
    }else{
        console.log(doc);
    }
});

//删除
UserModel.remove({username: 'zfpx2'},function(err,result){
    if(err){
        console.error(err.result);
    }else{
        console.log(result.result);
    }
});*/

UserModel.findOne({age:{$gt:5}},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
});


UserModel.findById("57807d6df83a0ab0193c06cb",function(err,doc){
    if(err){
        console.error(err);
    }else{
        console.log(doc);
    }
});

UserModel.findByAge(5,function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
});

UserModel.find({age:{$in:[5,7]}},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
});

UserModel.find({friend:{$exists:false}},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
});

// 10 条记录  每页2条 返回第2页的数据
// 1 查询的条件
// 2. 返回的字段
UserModel.find({},{username:1,password:0},{
    skip:2,
    limit:2,
    sort:{age:-1}
},function(err,docs){
    console.log(docs);
});

UserModel.find({}).skip(2).limit(2).sort({age:-1}).exec(function(err,docs){
    console.log(docs);
})
