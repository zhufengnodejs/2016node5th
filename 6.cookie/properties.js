var document = {

}
Object.defineProperty(document,'cookies',{
    value:'zfpx',
    enumerable:true//可枚举的
   /* configurable:false,//可配置的

    writable:false //不可修改值*/
})
Object.freeze(document);
//Object.seal(document);

console.log(document);
document.cookies = 'zfpx2';
delete document.cookies;
console.log(document);
