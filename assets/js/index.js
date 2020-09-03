$(function () {
    getUserInfo()

    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html';
            // 关闭confirm询问框
            layer.close(index);
        });

    })


})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            renderAvater(res.data)
        }
    })
}

function renderAvater(user) {
    // 1. 获取 昵称 或 用户名
    var name = user.nickname || user.username
    // 2. 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需求渲染用户头像
    if (user.user_pic !== null) {
        // 3.1渲染用户头像，并显示头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide() //隐藏图片头像
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide() //隐藏图片头像
        var first = name[0].toUpperCase() //获取用户名第一个首字母
        // 显示文字头像的显示内容，并显示
        $('.text-avatar').html(first).show()
    }
}