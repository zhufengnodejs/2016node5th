var a = 3;
if(true){
    var a = 'a';
}
console.log(a);

for(var i=0;i<3;i++){
    setTimeout(function(){
        console.log(i);
    },3000);
}