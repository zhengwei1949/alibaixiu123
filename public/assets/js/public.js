//随机推荐
$.ajax({
  type:'get',//get或post
  url:'/posts/random',//请求的地址
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
      {{each data}}
        <li>
            <a href="javascript:;">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
      {{/each}}
    `;
    var html = template.render(tpl, { data: result });
    $('.random').html(html);
  }
})

//最新评论
$.ajax({
  type:'get',//get或post
  url:'/comments/lasted',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    var tpl = 
    `
    {{each data}}
      <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="uploads/avatar_1.jpg" alt="">
          </div>
          <div class="txt">
            <p>
              <span>鲜活</span>{{$value.createAt.split('T')[0]}}说:
            </p>
            <p>{{$value.content.substr(0,10)}}</p>
          </div>
        </a>
      </li>
    {{/each}}
    `;
    var html = template.render(tpl,{data:result});
    $('.discuz').html(html);
  }
})


//导航显示功能
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
      {{each data}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
      {{/each}}
    `;
    var html = template.render(tpl,{data:result});
    $('.nav').html(html);
  }
})


//搜索功能
$('.search form').on('submit',function(){
  var keys = $(this).find('.keys').val();
  console.log(keys);
  location.href = 'search.html?key='+keys;
  return false;
})