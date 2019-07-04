$('#userForm').on('submit',function(){
  //收集表单的数据
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:$('#userForm').serialize(),
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();//后面知道
    },
    error:function(err){
      alert('添加失败')
    }
  })
  return false;
})

//回调函数不能用es6箭头函数 this会出问题
//头像上传
$('#avatar').on('change',function(){
  //ajax在上传图片的时候必须要使用formData 文件上传 进度
  var formData = new FormData();
  formData.append('avatar',this.files[0]);

  //jq中$.ajax默认的contentType值是 'application/x-www-form-urlencoded'
  //jq中$.ajax默认会把数据变成key=value&key=value的形式，我们现在是不需要，因为数据是二进制的数据
  //图片预览
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      // console.log(result)
      $('#preview').attr('src', result[0].avatar)
      $('#hiddenImg').val(result[0].avatar)
    }
  })


    // // //之前只讲过原生的写法
  // //
  // var xhr = new XMLHttpRequest();
  // xhr.open('post','/upload');
  // // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.send(formData);//二进制的数据 key=value&key=value

  // xhr.onload = function(){
  //   console.log(xhr.responseText);
  // }
})