//给修改密码按钮添加事件
$('#modifyForm').on('submit', function() {
    //获取修改表单中的值
    var formData = $(this).serialize();
    //向服务端发送请求
    $.ajax({
            type: 'put',
            url: '/users/password',
            data: formData,
            success: function(response) {
                //页面跳转到登录页面
                location.href = '/admin/login.html';
            }
        })
        //阻止表单默认提交事件
    return false;
})