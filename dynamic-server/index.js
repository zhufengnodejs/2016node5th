list();

var getUserRow = function(user){
    return `<tr id="tr_${user.id}"><td>${user.id}</td>
                         <td>${user.name}</td>
                         <td>
                         <button onclick="del(${user.id})" class="btn btn-danger">删除</button>
                         </td>
                      </tr>`;
}

//读取后台接口得到所有的用户列表并加到表格当中
function list() {
    $.get('/users').success(function (result) {
        //先得到用户数组
        var users = result.data;
        //对数组中的元素进行迭代
        var html = '';
        $.each(users, function (index, item) {
            html += getUserRow(item);
        });
        $('#userList').html(html);
    });
}

function add(){
    $('#userModal').modal('show');//显示模态窗口
}

function save(){
    var name = $('#name').val(); //取得用户名
    var user = {name:name};      //组装要传到后台的对象
    $.post('/users',user).success(function(result){
        var code = result.code;
        if(code == 'ok'){
            var user = result.data;
            $('#userList').append(getUserRow(user));
            $('#name').val('');
            $('#alert').html('操作成功');
            $('#userModal').modal('hide');//隐藏
        }else{
            $('#alert').html('操作失败');
        }

    });
}
//删除用户
function del(id){
    $.ajax({
        url:`/users?id=${id}`,
        method:'DELETE'
    }).success(function(result){
        var user = result.user;
        var code = result.code;
        if(code == 'error'){
            $('#alert').html('操作失败');
        }else{
            $(`#tr_${id}`).remove();
        }
    })
}