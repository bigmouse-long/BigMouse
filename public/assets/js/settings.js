//管理员选择图片时
$('#logo').on('change', function() {
        var formData = new FormData();
        formData.append('logo', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // console.log(response);
                $('#hiddenLogo').val(response[0].logo)
                $('#boxImg').attr('src', response[0].logo);
            }
        })
        return false;
    })
    //管理员提交表单
$('#settingsForm').on('submit', function() {
    var formData = $(this).serialize(); //获取表单中的内容
    //向服务端发送请求，实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
});
//获取网站的配置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        // console.log(response);
        //将网站logo展现在页面中
        $('#boxImg').attr('src', response.logo);
        //网站名称
        $('#site_name').val(response.title);
        //网站描述
        $('#site_description').val(response.description);
        //网站关键词
        $('#site_keywords').val(response.keywords);
        //是否开启评论功能
        $('#comment_status').prop('checked', response.comment);
        //评论是否需要经过人工审核
        $('#comment_reviewed').prop('checked', response.review);
    }
})