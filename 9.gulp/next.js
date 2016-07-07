var fns = [];
fns.push(function(){
    console.log(1);
});
fns.push(function(){
    console.log(2);
});
var index = 0;
function next(){
    if(index<fns.length){
        var fn = fns[index++];
        var length = fn.length;//取得形参数的数量
        if(length>0){//意味着接收next参数
            fn(next);
        }else{
            fn();
            next();
        }
    }
}
next();
