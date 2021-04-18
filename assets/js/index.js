$(function(){

    getUserInfo()

    var layer = layui.layer;
    $('#btnLogout').on('click',function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储的token，跳转登录页
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

// 获取用户信息
function getUserInfo() {
$.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers:{
    //     Authorization: localStorage.getItem('token')||''
    // },
    success:function(res){
       if(res.status !==0){
           return layui.layer.msg('获取用户信息失败')
       }
       renderAvatar(res.data)
    }
    // complete:function(res){
    //    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //        localStorage.removeItem('token')
    //        location.href = '/login.html'
    //    }
    // }
})
}

// 渲染用户头像
function renderAvatar(user){
var name = user.nickname || user.username
$('#welcome').html('欢迎&nbsp;&nbsp;'+name)
if(user.user_pic !== null){
    // 渲染图片头像
  $('.layui-nav-img').attr('src',user.user_pic).show()
  $('.text-avatar').hide()
}else{
// 渲染文本头像
  $('.layui-nav-img').hide()
 var first = name[0].toUpperCase()
 $('.text-avatar').html(first).show()
}
}