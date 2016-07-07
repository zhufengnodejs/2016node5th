var g = console.log;
/*
//函数的默认参数
function say(name,age=new Error('年龄必须输入')){
    console.log(name,age);
}
say('zfpx',7);

var arr= [1,2,3];
function sum(a,b,c){
    return a+b+c;
}

console.log(sum.apply(null,arr));
//...展开操作符
console.log(sum(...arr));
//其余操作符，把其它的所有的参数放在一个数组中
function rest(name,...hobby){
    //var hobby = [].slice.call(arguments,1);
    console.log(name,hobby);
}

rest('zfpx','play','eat','smoking');

var fun = function funname(){

}
var output = function out(number){
    console.log(number--);
    if(number>0)
        output(number);
}
output(5);*/

//箭头左边是输入的参数，右边是函数的返回值
/*var double = a=>a*2;
g(double(2));
var sum = (a,b)=>a+b;
g(sum(1,2));
var sum2 = (a,b)=>{
    a = a*2;
    b = b*2;
    return a+b;
}
g(sum2(1,2));*/

//解决this指针的指向问题
var person = {
    name:'zfpx',
    getName:function(){

        //箭头函数没有自己的this,会复用上级的this指针
        setTimeout(()=>{
            var age = 6;
            console.log(this.name);
        },1000);
        setTimeout(function(){
            console.log(age);
        },2000);
    }
}
person.getName();
