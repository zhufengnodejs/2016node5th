list();
//读取后台接口得到所有的用户列表并加到表格当中
function list() {
    $.get('/users').success(function (result) {
        //先得到用户数组
        var users = result.data;
        //对数组中的元素进行迭代
        var html = '';
        $.each(users, function (index, item) {
            html += `<tr><td>${item.id}</td>
                         <td>${item.name}</td>
                         <td>
                         <button class="btn btn-danger">删除</button>
                         </td>
                      </tr>`;
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
            $('#userList').append(`<tr><td>${user.id}</td>
                         <td>${user.name}</td>
                         <td>
                         <button class="btn btn-danger">删除</button>
                         </td>
                      </tr>`);
            $('#name').val('');
            $('#alert').html('操作成功');
            $('#userModal').modal('hide');//隐藏
        }else{
            $('#alert').html('操作失败');
        }

    });
}

