//给form表单添加事件
$('#categorty').on('submit', function() {
    var formData = $(this).serialize();
    // console.log(formData);  
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function(response) {
            // console.log(response);
            location.reload();
        }
    });
    return false;
});
//向服务端发送请求，获得分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template('categortyTpl', { data: response });
        $('#tbody').html(html);
    }
});
//编辑按钮事件
$('#tbody').on('click', '#edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('editTpl', { data: response });
            $('#box').html(html);

        }
    })
    return false;
});
//修改表单操作
$('#box').on('submit', '#modifyCategorty', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(response) {
            location.reload();

        }
    });
    return false;

});
//删除操作按钮
$('#tbody').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    var isValid = confirm('确认删除');
    if (isValid) {
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function(response) {
                location.reload();

            }
        });
    }
    return false;
})