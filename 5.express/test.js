/*
var str = '<%=username%>';
var data = {username:'zfpx'};
str = str.replace(/<%=(\w+)%>/g,function(all,attr){
    return data[attr];
});
console.log(str);*/

var res = {
    locals:{username:'zfpx'}
}
Object.assign(res.locals,{age:6},{home:'beijing'});
console.log(res.locals);
