list();

var getUserRow = function(user){
    return `<tr id="tr_${user.id}"><td>${user.id}</td>
                         <td>${user.name}</td>
                         <td>
                         <button onclick="del(${user.id})" class="btn btn-danger">删除</button>
                         <button onclick="update(${user.id})" class="btn btn-warning">修改</button>
                         </td>
                      </tr>`;
}

//读取后台接口得到所有的用户列表并加到表格当中
function list() {
    var keyword = $('#keyword').val();// 取得过滤条件

    $.get(`/users?keyword=${keyword}`).success(function (result) {
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
    $('#userId').val('');
    $('#name').val('');
    $('#userModal').modal('show');//显示模态窗口
}

function save(){
    var id = $('#userId').val(); //得到ID
    var name = $('#name').val(); //取得用户名
    var user = {name:name};      //组装要传到后台的对象
    if(id){//表示修改
        user.id = id;
        $.ajax({
            url:'/users',
            method:'PUT',
            data:user
        }).success(function(result){//如果更新服务器端应该返回更新后的user对象
            var user = result.data;
            //把原来tr替换成新的tr
            $(`#tr_${id}`).replaceWith(getUserRow(user));
            $('#alert').html('操作成功');
            $('#userModal').modal('hide');
        }).error(function(err){
            console.error(err);
            $('#alert').html('操作失败');
        });

    }else{//新增
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

}
//删除用户
function del(id){
    $.ajax({
        url:`/users?id=${id}`,
        method:'DELETE'
    }).success(function(result){
        $(`#tr_${id}`).remove();
        $('#alert').html('操作成功');
    }).error(function(result){
        $('#alert').html('操作失败');
    });
}

function update(id){
  $.get(`/users?id=${id}`).success(function(result){
        var user = result.data;
        $('#name').val(user.name);
        $('#userId').val(user.id);
        $('#userModal').modal('show');//显示
  });
}