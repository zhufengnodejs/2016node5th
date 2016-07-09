var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/201605th');
//定义一个Schema
//只是定义集合的存储结构，并不能直接操作数据库
// 定义的集合的字段数量 字段名称和字段类型
//定义了之后就只能保存这三个字段了，如果多传入字段会进行忽略
var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    birth: {type: Date}
});

//创建模型 可以操作数据库
//model 有两个参数 第一个参数是模型的名称(也就是保存到数据库中的集合的名称)
//PersonSchema
//两个参数表示定义一个模型
// Person是模型的名称，也对应于集合的集合。集合的名称=模型名称转成复数
var PersonModel = mongoose.model('Person', PersonSchema);
//传一个参数表示获取一个模型
var PersonModel2 = mongoose.model('Person');
console.log(PersonModel === PersonModel2);
//根据model可以创建一个实体
var personEntity = new PersonModel({
    name: 'zfpx',
    age: 8,
    birth: new Date(Date.now() - 8 * 365 * 24 * 60 * 60*1000)
});
//把当前的对象保存到数据中
personEntity.save(function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});


