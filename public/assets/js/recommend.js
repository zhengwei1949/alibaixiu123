//首页和详情页共享
$.ajax({
  type:'get',//get或post
  url:'/posts/recommend',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    // console.log(result)
    var tpl = 
    `
      {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
    `;
    var html = template.render(tpl,{data:result});
    $('.hots ul').html(html);
  }
})