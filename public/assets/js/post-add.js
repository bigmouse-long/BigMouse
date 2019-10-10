//获取分类下拉框数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);

    }
});
//当用户上传文章时选择了图片
$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax方法不要处理data属性对应的参数
        processData: false,
        //告诉ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {
            // 将添加的图片显示出来，让用户预览图片，表示图片上传成功
            $('#pic').attr('src', response[0].cover).show();
            $('#thumbnail').val(response[0].cover);

        }
    })
});
//用户上传文章信息
$('#addForm').on('submit', function() {
    //获得提交表单的信息
    var formData = $(this).serialize();
    // console.log(formData);

    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(response) {
            //请求发送成功后，跳转到文章列表页面
            // console.log(response);

            location.href = '/admin/posts.html'
        }
    })
    return false;
});
//获取地址栏中的参数
var id = getUrl('id');
// console.log(id);
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories) {
                    response.categories = categories;
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            });
            // console.log(response);


        }
    })
}

// 从浏览器的地址栏中获取查询参数
function getUrl(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
//当修改文章页面信息发生提交行为时
$('#parentBox').on('submit', '#modifyForm', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})