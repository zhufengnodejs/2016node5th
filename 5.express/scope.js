function step1(name){
    step2();
}
//作用域与运行时无关，于定义时确定
function step2(){
    console.log(name);
}
step1('hello');