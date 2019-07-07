// console.log(userId)
$.ajax({
  type:'get',//get或post
  url:'/users/'+userId,//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    $('.profile .avatar').attr('src',result.avatar);
    $('.profile .name').html(result.nickName);
    $('.profile').show();
  }
})