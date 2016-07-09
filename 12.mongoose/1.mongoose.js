var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/201605th');
//定义一个Schema
//只是定义集合的存储结构，并不能直接操作数据库
// 定义的集合的字段数量 字段名称和字段类型
//定义了之后就只能保存这三个字段了，如果多传入字段会进行忽略
var PersonSchema = new mongoose.Schema({
    name: {type: String,required:true},  //必须提供
    age: {type: Number,min:0,max:180},  //最大值和最小值
    birth: {type: Date,default:Date.now()},//指定默认值
    home:{type:String,enum:['北京','广州']}//指定枚举值
});


//创建模型 可以操作数据库
//model 有两个参数 第一个参数是模型的名称(也就是保存到数据库中的集合的名称)
//PersonSchema
//两个参数表示定义一个模型
// Person是模型的名称，也对应于集合的集合。
// 集合的名称=模型名称转成复数
// this 指的就是当前的实例
PersonSchema.methods.findSameAge = function(cb){
    return this.model('Person').find({age:this.age},cb);
}
//为MODE定义类方法，通过model来调用
PersonSchema.statics.findByName = function(name,cb){
    //this == model
    this.find({name:new RegExp(name)},cb);
}
//中间件，在save方法保存之前执行的函数
//next表示继续向下执行
PersonSchema.pre('save',function(next){
    // this 指的就是entity
   this.age = this.age * 2;
   next();
});
var PersonModel = mongoose.model('Person', PersonSchema);
//传一个参数表示获取一个模型
var PersonModel2 = mongoose.model('Person');
//为实例创建新的方法
PersonModel.findByName('zfpx',function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log('findByName ',docs.length);
    }
});

console.log(PersonModel === PersonModel2);
//根据model可以创建一个实体
var personEntity = new PersonModel({
    name:'zfpx',
    age: 12,
    home:'北京'
    //birth: new Date(Date.now() - 8 * 365 * 24 * 60 * 60*1000)
});
//调用我们为实例上定义的新方法
personEntity.findSameAge(function(err,docs){
    if(err){
        console.error(err);
    }else
        console.log(docs.length);
})
//把当前的对象保存到数据中
personEntity.save(function (err, result) {
    // result就是保存之后的实例对象，它也是一个Entity
    if (err) {
        console.error(err);
    } else {
        console.log(result);
        result.findSameAge(function(err,docs){
            if(err){
                console.error(err);
            }else
                console.log(docs.length);
        })
    }
});


