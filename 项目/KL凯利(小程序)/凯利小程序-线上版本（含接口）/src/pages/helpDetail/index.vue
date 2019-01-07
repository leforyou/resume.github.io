<template>
<!--帮助中心-详情-->
  <div class="container">
    <div class="head main-padding-lr">
      <p class="title fz38">{{title}}</p>
    </div>
    <div class="content main-padding-lr margin-btm"> 
      <wxParses :articleHTML="articleHTML"><!--富文本解析组件--></wxParses>
      <!--<p class="fz30 fc-666" style="line-height:2.2;">亲，如果您注册不了会员账户，可能是以下几种原因造成：</p>
      <p class="fz30 fc-666" style="line-height:2.2;">1、一个手机或者邮箱只验证一个账号：如果您的手机或者是邮箱被验证过了需要您更换一个进行验证 </p>
      <p class="fz30 fc-666" style="line-height:2.2;">2、填写会员资料不正确：填写好相关内容后页面上会出现是否正确的提示，如果正确，会在该项内容后打勾；如果错误，右边会出现相关的错误提示，您可以根据提示内容修改 </p>-->
    </div>
  </div>
</template>

<script>
import wxParses from '@/components/wxParses'
export default {
  data () {
    return {
      url:this.$url,
      title:'',
      articleHTML:''
    }
  },
  computed:{
    
  },
  components: {
    wxParses
  },
  onLoad: function(options) {
    //console.log('页面传参：',options)
    if(options.aid){
      this.aid = options.aid;
      this.getCenterDetail();
    }
  },
  methods: {
    getCenterDetail(){
      var urlData = {
        'ActionName':'getHelpDetailByID',
        'aid':this.aid
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          this.title = res.data.rows[0].NvrFd1;
          this.articleHTML = res.data.rows[0].TextFd3;
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  .head{
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }
  .content{
    
  }
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #fff;
}
</style>





