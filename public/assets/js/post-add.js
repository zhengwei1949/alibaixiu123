//实现分类显示功能
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function(result) {//成功的回调函数
    console.log(result)
    var html = template('categoryTpl', { data: result });
    $('#category').html(html);
  }
})

//图片上传和预览
$('#formBox').on('change','#feature',function(){
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  //formData 原生ajax来写 
  //1. 不需要写xhr.setRequestHeader 
  //2. 二进制的，不需要 key=value
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,
    success: function(result) {//成功的回调函数
      console.log(result)
      //图片预览效果
      $('.thumbnail').attr('src', result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})

//文章上传
$('#addForm').on('submit', function() {
  console.log($(this).serialize());
  $.ajax({
    type: 'post',//get或post
    url: '/posts',//请求的地址
    data: $(this).serialize(),
    success: function(result) {//成功的回调函数
      location.href = 'posts.html'
    }
  })
  return false;
})

function dateFormat(str) {
  var date = new Date(str);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + '-' + month + '-' + day;
}


function getUrlParams(name){
  var paramsAry = location.search.substr(1).split('&');
  //循环数据
  for(var i=0;i<paramsAry.length;i++){
    var tmp = paramsAry[i].split('=');
    if(tmp[0] == name){
      return tmp[1];
    }
  }
  return -1;
}


//获取id值，如果id值不存在的，说明是在添加，如果存在，说明是在编辑
var id = getUrlParams('id');
if(id != -1){
  //编辑
  $.ajax({
    type:'get',//get或post
    url:'/posts/'+id,//请求的地址
    success:function(result){//成功的回调函数
      console.log(result)
      //查询分类的数据
      $.ajax({
        type: 'get',//get或post
        url: '/categories',//请求的地址
        success: function(response) {//成功的回调函数

          result.categories = response;
          var html = template('modifyTpl', result);
          $('#formBox').html(html);
        }
      })
      
    }
  })
}


//通过事件委托方式给修改表单添加提交事件
$('#formBox').on('submit','#modifyForm',function(){
  var id = $(this).attr('data-id');
  //收集表单数据
  $.ajax({
    type:'put',//get或post
    url: '/posts/' + id,//请求的地址
    data:$(this).serialize(),
    success:function(result){//成功的回调函数
      location.href = 'posts.html';//跳转到列表页
    }
  })
  return false;
})