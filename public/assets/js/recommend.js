//向服务端发送请求，索要热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        // console.log(response);
        //因为是公共数据所以使用模板字符串进行拼接
        var recommend = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
        </a>
    </li>
    {{/each}}
        `;
        var html = template.render(recommend, { data: response });


        $('#recommend').html(html);

    }
})