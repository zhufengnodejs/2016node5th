var document ={};

Object.defineProperty(document,'cookies',{
    value:[],
    writable:true
})
console.log(document.cookies);

Object.defineProperty(document,'cookie',{
    set:function(cookie){
        var exists = false;
        if(document.cookies.length>0){
            for(var i=0;i<document.cookies.length;i++){
                var item = document.cookies[i];
                if(item.split('=')[0] == cookie.split('=')[0]) {
                    exists= true;
                    document.cookies[i] = cookie;
                    break;
                }
            }
        }

            /*document.cookies = document.cookies.map(function(item){
                if(item.split('=')[0] == cookie.split('=')[0]){
                    exists = true;
                    return cookie;
                }else{
                    return item;
                }
            });*/

        if(!exists)
            document.cookies.push(cookie);
        console.log(document.cookies);
    },
    get:function(){
       return document.cookies.join('; ');
    }
});
document.cookie = 'name=zfpx';
document.cookie = 'name=zfpx2';
document.cookie = 'age=9';
console.log(document.cookie)
