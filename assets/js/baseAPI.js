

$.ajaxPrefilter(function(options){
options.url = 'http://api-breakingnews-web.itheima.net'+options.url

// 统一为有权限接口设置请求头
if(options.url.indexOf('/my/') !== -1){
    options.headers = {
    Authorization:localStorage.getItem('token')||''
    }
   };

//    统一挂载ajax的 complete 函数
   options.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
     }
   }
})
