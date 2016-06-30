init();

var getUserRow = function(user){
    return `<tr id="tr_${user.id}"><td>${user.id}</td>
                         <td>${user.name}</td>
                         <td>
                         <button onclick="del(${user.id})" class="btn btn-danger">删除</button>
                         <button onclick="update(${user.id})" class="btn btn-warning">修改</button>
                         </td>
                      </tr>`;
}

function goto(pageNum){
    $('#pageNum').val(pageNum);
    init();
}

//读取后台接口得到所有的用户列表并加到表格当中
function init() {
    var keyword = $('#keyword').val();// 取得过滤条件
    var orderBy = $('#orderBy').val();//排序的字段
    var order = $('#order').val();//升序还是降序
    var pageNum = $('#pageNum').val()||1;//获得当前的页码
    var pageSize = $('#pageSize').val()||2;//每页的条数
    $.get(`/users?keyword=${keyword}&orderBy=${orderBy}&order=${order}&pageNum=${pageNum}&pageSize=${pageSize}`).success(function (result) {
        //先得到用户数组
        var data = result.data;
        var users = data.users;
        //对数组中的元素进行迭代
        var html = '';
        $.each(users, function (index, item) {
            html += getUserRow(item);
        });
        $('#userList').html(html);

        //拼出来分页组件
        // 服务器端返回的 一共多少页 当前页
        // 传递给服务器的 当前页 每页条数
        var pageNum = data.pageNum;//当前的页数
        $('#pageNum').val(pageNum);
        var totalPage = data.totalPage;//总页数
        var pages = '';//拼接分页的li字符串
        if(pageNum>1){
            pages += `<li><a onclick="goto(${pageNum -1})" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
        }
        for(var i=1;i<=totalPage;i++){ //循环每个页码
            pages+=` <li class="${i == pageNum ?'active':''}"><a onclick="goto(${i})" href="#">${i}</a></li>`;//每个页码对应一个li
        }
        if(pageNum<totalPage){
            pages+=`<li><a onclick="goto(${pageNum + 1})" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span></a></li>
`;
        }
        $('#pager').html(pages); //把分页的dom设置到容器中
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