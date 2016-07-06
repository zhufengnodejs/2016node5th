var app = function(){}
app.array = [];
app.start = function(){
    var count = 0;
    function next(){
        var fn = app.array[count++];
        fn(next);
    }
    next();
}
app.get = function(fn){
    app.array.push(fn);
}
app.get(function(next){
    console.log('a');
    next();
});
app.get(function(next){
    console.log('b');
    //next();
});
app.get(function(next){
    console.log('c');
});
app.start();