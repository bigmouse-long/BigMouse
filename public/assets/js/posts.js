//页面加载查询文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        // console.log(response);
        var html = template('articleList', { data: response });
        $('#tbody').html(html);
        var page = template('pageTpl', { data: response });
        $('#pageBox').html(page);

    }
});
//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
            var html = template('articleList', { data: response });
            $('#tbody').html(html);
            var page = template('pageTpl', { data: response });
            $('#pageBox').html(page);

        }
    });
};
//发送ajax请求，获得分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);

    }
});
//筛选文章
// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    console.log(formData);

    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
            type: 'get',
            url: '/posts',
            data: formData,
            success: function(response) {
                console.log(response);

            }
        })
        // 阻止表单默认提交行为
    return false;
});
//删除操作
$('#tbody').on('click', '#delete', function() {
    var id = $(this).attr('data-id');
    // console.log(id);

    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function(response) {
            location.reload();

        }
    })
});
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}