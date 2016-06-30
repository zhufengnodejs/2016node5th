var arr = ['张三','李四'];
var arrN = arr.sort(function(a,b){
    return a.localeCompare(b);
});
console.log(arrN);
