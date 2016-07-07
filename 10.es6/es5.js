'use strict';

/*let arr = ['zfpx','8',['game','walk']];
/!*var name,age;
name = arr[0];
age = arr[1];*!/

let [name,age,hobby] = arr;
console.log(name,age,hobby);*/
//赋值是按照属性来匹配的
/*let obj = {age:8,name:'zfpx'};
//let {name,age} = obj;
//当你变量名和属性名称不一样的时候
let {name:name1,age:age1} = obj;
console.log(name1,age1);*/

// 解析赋值的默认参数
function ajax(_ref) {
    var _ref$method = _ref.method;
    var method = _ref$method === undefined ? 'get' : _ref$method;
    var url = _ref.url;

    console.log(method, url);
}

ajax({
    url: 'http://localhost:9090'
});

var name = 'zfpx';
var age = 6;
var obj2 = {
    name: name,
    age: age,
    say: function say() {
        console.log('hello');
    }
};
obj2.say();
console.log(obj2);
