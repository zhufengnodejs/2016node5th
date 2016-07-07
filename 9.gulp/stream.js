console.log('hello');
process.stdout.write('world');//可写流
//可以监听控制台的输入 标准可读流
process.stdin.on('data',function(data){
    console.error(data);
});