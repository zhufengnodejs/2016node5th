let name = 'zfpx';
let age = 8;
//带标签的模板字符串 标签就是一个函数的名字
//如果有了标签，那拼接字符的工作由此标签对应的函数来进行
//此函数的返回值会作为模板字符串的值
function desc(strings,...values){
    var str  = '';
    for(var i=0;i<values.length;i++){
        str += (strings[i].toUpperCase()+(values[i]+'').toUpperCase())
    }
    str += strings[i].toUpperCase();
    return str;
}
//按照变量把模板字符串拆成数组
let word = `${name} is ${age} years old!`;
console.log(word);

