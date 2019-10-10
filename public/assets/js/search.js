var key = getUrl('key');
// console.log(key);

function getUrl(name) {
    var paramsAry = location.search.substr(1).split('&');
    console.log(paramsAry);


    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];

        }
    }
    return -1;
}
//文章搜索
$.ajax({
    type: "get",
    url: "/posts/search/" + key,
    success: function(response) {
        console.log(response);
        var html = template('searchTpl', { data: response })
        console.log(html);

        $('#searchBox').html(html);
        return false;
    }
});