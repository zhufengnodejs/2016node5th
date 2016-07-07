var l = console.log;
function output(cb){
    setTimeout(function(){
        cb(Math.random());
    },1000);
}
function* gen(){
    l('start');
    var v1 = yield output;
    l(v1);
    var v2 = yield output;
    l(v2);
}
var iterator  = gen();
var it = iterator.next();// {done:false,value:output}
it.value(function(val){
    var it2 = iterator.next(val);
    it2.value(function(val){
        iterator.next(val);
    });
});

