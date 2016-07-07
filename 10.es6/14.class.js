var l = console.log;
class Person{
    //这是创建实例之后进行初始化的函数
    constructor(){
        this.name = new String('zfpx');
        this.cookies = [];
    }
    get cookie(){
        return this.cookies.join('; ');
    }
    set cookie(cookie){
        this.cookies.push(cookie);
    }
    getName(){//实例 方法，只有创建了实例，才能通过实例来调用
        console.log(this.name);
    }
    static add(a,b){//静态方法也就是所谓类方法
        return a+b;
    }
}
let person1 = new Person();
let person2 = new Person();
l(person1.name === person2.name);
l(person1.getName === person2.getName);
person1.getName();
l(Person.add(1,2));//不创建实例也可以使用
person1.cookie = 'name=zfpx';
person1.cookie = 'age=8';
l(person1.cookie);
/*
function Person(){
    this.name = new String('zfpx');
}
Person.prototype.getName = function(){

}*/

class Father{
    constructor(name){
        this.name = name;
    }
    static sum(a,b){
        return a+b;
    }
}
class Child extends Father{
    constructor(name,age){
        super(name);
        this.age = age;
    }
}
var child = new Child('zfpx',8);
l(child.name,child.age);
l(Child.sum(1,2));