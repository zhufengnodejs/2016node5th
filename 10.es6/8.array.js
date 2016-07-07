let l = console.log;
function sum(){
    //var arr = [].slice.call(arguments);//[1,2,3]
    //把类数组转变成真正的数组
    let arr = Array.from(arguments);
    return arr.reduce((curr,next)=>curr + next,0);
}
l(sum(1,2,3));

l(Array(3));//构建一个长度为3的数组，元素全部为空
l(Array.of(3));//构建一个长度为1的数数，元素的值就是3
//用后三个元素覆盖前三个元素
l([1,2,3,4,5,6].copyWithin(0,3,6));

var arr  = [1,22,22];
var item = arr.find((item,index)=>item == 22);
l(item);
var index = arr.findIndex((item,index)=>item == 22);
l(index);

var arr2 = [,,,,,,];
l(arr2.length);
arr2.fill('a',0,3);
arr2.fill('b',3,6);
l(arr2);