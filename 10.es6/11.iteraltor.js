var l = console.log;

/**
 * 生成器
 * 每次调用一次next,会从当前位置继续向下执行，遇到yield停止执行
 **/
function* generator(arr){
    l('one');
    yield arr[0];
    l('two');
    yield arr[1];
    l('three');
    yield arr[2];
    l('four');
}
var iterator = generator(['1','2','3']);
do{
  var it = iterator.next();
  console.log(it.value);
}while(!it.done);

