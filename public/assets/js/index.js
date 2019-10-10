//获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(response) {
        // console.log(response);
        var html = template('articleCount', response);
        $('#box').html(html);

    }
});
//获取文章分类数量
$.ajax({
        type: 'get',
        url: '/categories/count',
        success: function(response) {
            // console.log(response);
            $('#category').html('<strong>' + response.categoryCount + '</strong>个分类');

        }
    })
    //查询评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(response) {
        // console.log(response);

        $('#comments').html('<strong>' + response.commentCount + '</strong>条评论');

    }
})