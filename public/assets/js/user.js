//提交用户注册信息
$('#userForm').on('submit', function() {
        var formData = $(this).serialize();
        $.ajax({
                type: 'post',
                url: '/users',
                data: formData,
                success: function() {
                    location.reload();
                },
                error: function() {
                    alert('用户添加失败');
                }
            })
            //防止用户默认提交
        return false;
    })
    //当用户选择文件的时候
    //用户选择到的文件
    // $('#avatar').on('change', function() {
    //         var formData = new FormData();
    //         formData.append('avatar', this.files[0]);
    //         //向服务端发送请求
    //         $.ajax({
    //             type: "post",
    //             url: "/upload",
    //             data: formData,
    //             //告诉ajax方法不要解析请求参数
    //             processData: false,
    //             //告诉ajax不要设置请求参数的类型
    //             contentType: false,
    //             success: function(response) {
    //                 // console.log(response);
    //                 //实现头像预览
    //                 $('#preview').attr('src', response[0].avatar);
    //                 //将图片路径保存下来
    //                 $('#hiddenAvatar').val(response[0].avatar);
    //             }
    //         });
    //     })
    //也是利用事件委托，将头像的改变委托到最大的盒子上面
$('#editUser').on('change', '#avatar', function() {
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        //向服务端发送请求
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            //告诉ajax方法不要解析请求参数
            processData: false,
            //告诉ajax不要设置请求参数的类型
            contentType: false,
            success: function(response) {
                // console.log(response);
                //实现头像预览
                $('#preview').attr('src', response[0].avatar);
                //将图片路径保存下来
                $('#hiddenAvatar').val(response[0].avatar);

            }
        });

    })
    //用户展示
$.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
        //将服务端返回的数据与模板进行拼接
        var html = template('userTpl', {
            data: response
        });
        //将拼接好的模板展示到页面中
        $('#tbody').html(html);
    }
});
//利用时间委托点击编辑按钮查找用户
$('#tbody').on('click', '.edit', function() {
    //获取用户id
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyTpl', response);
            $('#editUser').html(html);

        }
    })

});
//为修改用户表单添加事件
$('#editUser').on('submit', '#modifyForm', function() {
    //获取用户修改的表单信息
    var formData = $(this).serialize();
    console.log(formData);

    //修改用户id
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            // console.log(response);
            //修改完成后，重新加载页面
            location.reload();

        }
    });
    return false;
});
// 删除用户操作
$('#tbody').on('click', '.delete', function() {
        if (confirm('您确认要删除这个用户吗')) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function() {
                    location.reload();
                }
            })
        }
    })
    //给全选按钮添加点击事件
$('#selectedAll').on('change', function() {
    var status = $(this).prop('checked');
    //全选按钮被选中就显示批量删除按钮
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
    $('#tbody').find('input').prop('checked', status);
});
//给每个用户前面的按钮添加事件
$('#tbody').on('change', '#userBox', function() {
    var inputs = $('#tbody').find('input');
    //判断所有用户和被选中用户的数量是否一致
    if (inputs.length == inputs.filter(':checked').length) {
        $('#selectedAll').prop('checked', true);
    } else {
        $('#selectedAll').prop('checked', false);
    }
    //如果被选中的大于0，就显示批量删除按钮
    if (inputs.filter(':checked').length > 0) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
//为批量删除按钮添加事件
$('#deleteMany').on('click', function() {
    var ids = [];
    //筛选出被选中的用户
    // var checkedUser = $('#tbody').find('input').filter(':checked');
    //查找出input中带有checked属性的input
    var checkedUser = $('#tbody').find('input:checked');

    //循环被选中的用户，将被选中的用户id添加到数组中
    checkedUser.each(function(index, ele) {
        ids.push($(ele).attr('data-id'));
    })
    console.log(ids);
    var flag = confirm('您确认要进行批量删除吗')
        //发送ajax请求
    if (flag) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function(response) {
                location.reload();
            }
        });
    }

});