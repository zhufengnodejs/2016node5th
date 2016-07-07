let l = console.log;
/*

let name = 'zfpx';
let age = 8;
var say = ()=>{ l(this.name);}
//定义对象字面量的新的方法 可以直接写变量名
let obj = {
    name2:name,
    age,
    say
}
l(obj);
//判断两个值是否相等
console.log(Object.is(NaN,NaN));
console.log(Object.is(null,undefined));

var target = {
    name:'zfpx'
}
var source1 ={
    age:8
}
var source2 = {
    home:'changping'
}

Object.assign(target,source1,source2);
l(target)

function clone(obj){
  var cl = {};
  Object.assign(cl,obj);
  return cl;
}
var o1 = {name:'zfpx2'};
var o2 =clone(o1);
l(o2);
o2.name = 'zfpx3';
l(o1);
l(o2);

*/
/*
var obj1 = {name:'zfpx1'};
var obj2 = {name:'zfpx2'};
var obj = {};
//Object.setPrototypeOf(obj,obj1);
obj.__proto__ = obj1;
console.log(obj.name);
l(Object.getPrototypeOf(obj) === obj1)
Object.setPrototypeOf(obj,obj2);
console.log(obj.name);
//-----------------------------*/
var obj1 = {
    getName(){
        return 'obj1name';
    }
}
var obj2 = {
    __proto__:obj1,
    getName(){
        //super 调用原型上的方法
        //return super.getName()+' obj2name'
        return this.__proto__.getName()+' obj2name'
    }
}
l(obj2.getName());