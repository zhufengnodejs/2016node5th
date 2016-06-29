//读取后台接口得到所有的用户列表并加到表格当中
function list(){
    $.get('/users').success(function(result){
        console.log(result);
    });
}
list();