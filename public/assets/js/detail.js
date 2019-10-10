//从任务栏中获取id
var id = getUrl('id');
//是否经过人工审核
var review;
var authorId;
//获得文章详细信息
$.ajax({
    type: "get",
    url: "/posts/" + id,
    success: function(response) {
        console.log(response);
        authorId = response.author;
        console.log(authorId);

        var html = template('detailsTpl', response);


        $('#detailBox').html(html);

    }
});


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
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//点赞
$('#detailBox').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: "/posts/fabulous/" + id,
        success: function(response) {
            console.log(response);

            alert('点赞成功')
        }
    })
});
//获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        // console.log(response);
        // console.log(response);

        var review = response.review;
        //管理员开启了评论功能
        if (response.comment) {
            //渲染评论模板
            var html = template('commentTpl');

            $('#comment').html(html);
        }

    }
});
//当评论表单发生提交行为的时候
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    //评论状态
    var state;
    if (review) {
        //经过人工审核
        state = 0;
    } else {
        //不需要经过人工审核
        state = 1;
    }
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            post: id,
            content: content,
            author: authorId,
        },
        success: function(response) {
            alert(' 成功');
            location.reload();

        },
        error: function() {
            alert(' 失败');
            location.reload();
        }

    })
    return false;
})