//详情页不能直接在地址栏看，而是应该通过list.html列表页跳转过来
//获取url地址栏的id值
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  //循环数据
  for(var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=');
    if(tmp[0] == name) {
      return tmp[1];
    }
  }
  return -1;
}


//获取id值
var id = getUrlParams('id');

$.ajax({
  type:'get',//get或post
  url:'/posts/'+id,//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('tpl',result);
    $('.content .article').html(html)
  }
})


//点赞功能
$('body').on('click','#like',function(){
  $.ajax({
    type:'post',//get或post
    url:'/posts/fabulous/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      alert('点赞成功')
    }
  })
})

var review;

//获取网站设置的状态
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    review = result.review;
    console.log(result)
    //只有管理员设置了网站开启了评论并且当前是登录状态，才显示评论的输入框
    if(result.comment == true && isLogin == true){
      var tpl = 
      `
        <form>
          <textarea></textarea>
          <input type="submit" value="提交评论">
        </form>
      `;
      $('.comment').html(tpl);
    }
  }
})


//提交评论功能
$('.comment').on('submit','form',function(){
  var content = $(this).find('textarea').val();
  var state;
  if(review == true){
    state = 1;
  }else{
    state = 0;
  }
  $.ajax({
    type:'post',//get或post
    url:'/comments',//请求的地址
    data:{
      content,
      post:id,
      state
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  return false;
})