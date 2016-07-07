var l = console.log;
/**
 * 生成器
 * 用来生成迭代器
 * 迭代器有一个方法next,调用它的时候会返回一个对象
 * 值 和 是否迭代完成
 * {value:'val',done:false}
 **/
function generator(arr) {
    let index = 0;
    return { //返回的是迭代器
        next(){
            var value = arr[index++];
            return {
                value,//本次迭代的值
                done:index > arr.length  //是否迭代完成
            }
        }
    }
}
var iterator = generator(['java', 'node', 'js']);
l(iterator.next());
l(iterator.next());l(iterator.next());
l(iterator.next());