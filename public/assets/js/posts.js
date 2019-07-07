function dateFormat(str){
  var date =  new Date(str);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  return year + '-' + month + '-' + day;
}

//如果我们没有传入page，默认会显示第一页
var page = 1;//如果没有切换，默认就显示第一页

render();
function changePage(currentPage){
  page = currentPage;
  render();
}

function render(){
  $.ajax({
    type: 'get',//get或post
    url: '/posts',//请求的地址
    data: {
      page: page,
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function(result) {//成功的回调函数
      console.log(result)
      var html = template('postsTpl', result);
      $('#postsBox').html(html);
      //分页的效果
      var pageHtml = template('pageTpl', result);
      $('#pageBox').html(pageHtml);
    }
  })
}


//渲染筛选的分类的数据
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result)
    var html = template('categoryTpl',{data:result});
    $('#categoryBox').html(html);
  }
})

$('#filterForm').on('submit',function(){
  //收集表单数据
  console.log($(this).serialize());
  $.ajax({
    type:'get',//get或post
    url:'/posts',//请求的地址
    data: $(this).serialize(),
    success:function(result){//成功的回调函数
      console.log(result)
      var html = template('postsTpl', result);
      $('#postsBox').html(html);
      //分页的效果
      var pageHtml = template('pageTpl', result);
      $('#pageBox').html(pageHtml);
    }
  })
  return false;
})


//删除功能
$('#postsBox').on('click','.delete',function(){
  if(confirm('确定要删除吗?')){
    //获取id值
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',//get或post
      url: '/posts/' + id,//请求的地址
      success: function(result) {//成功的回调函数
        location.reload();
      }
    })
  }
})


$.ajax({
  type:'get',//get或post
  url:'/comments',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result)
  }
})