var obj = {
    name:'zfpx',
    age:8
}
// 模板字符串
// 1. 以反引号作为开始的结束标志
// 2. 变量名用${} 包裹
var str = `${obj.name} is ${obj.age} years old`;
var str = obj.name+' is '+obj.age+' years old';
console.log(str);