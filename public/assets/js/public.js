//获取随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        //  console.log(response);

        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `
        var html = template.render(randomTpl, { data: response });
        $('#randomBox').html(html)

    }
});
//获取最新评论信息
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        // console.log(response);
        var comments = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
                <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
            </div>
        </a>
    </li>
    {{/each}}
        `;
        var html = template.render(comments, { data: response })
        $('#lastedComments').html(html);

    }
});
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        var navigation = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
     {{/each}}
        `;
        var html = template.render(navigation, { data: response })
        $('#navigationBox').html(html);
        $('#topNav').html(html)

    }
});
//获取搜索框中的关键字
$('.search form').on('submit', function() {
    var keys = $(this).find('.keys').val();
    //跳转到搜索结果页面，并将用户搜索的关键字传递到搜索结果中
    location.href = '/search.html?key=' + keys;
    return false;
})