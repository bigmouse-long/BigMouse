//退出实现功能
$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function(response) {
                location.href = 'login.html';

            },
            error: function() {
                alert('退出失败');
            }
        });

    }
});

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//根据索要登录用户信息,但是在这个网站中调用<script src="/login/status"></script>不返回userId
// $.ajax({
//     type: 'get',
//     url: '/users/' + userId,
//     success: function(response) {
//         console.log(response);

//         // $('.avatar').attr('src', response.avatar)
//         // $('.profile .name').html(response.nickName)
//     }
// })