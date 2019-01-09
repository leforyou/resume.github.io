<template>
<!--帮助中心-详情-->
  <div class="container">
    <div class="head main-padding-lr">
      <p class="title fz38">会员账户为什么注册不成功？</p>
    </div>
    <div class="content main-padding-lr margin-btm"> 
      <p class="fz30 fc-666" style="line-height:2.2;">亲，如果您注册不了会员账户，可能是以下几种原因造成：</p>
      <p class="fz30 fc-666" style="line-height:2.2;">1、一个手机或者邮箱只验证一个账号：如果您的手机或者是邮箱被验证过了需要您更换一个进行验证 </p>
      <p class="fz30 fc-666" style="line-height:2.2;">2、填写会员资料不正确：填写好相关内容后页面上会出现是否正确的提示，如果正确，会在该项内容后打勾；如果错误，右边会出现相关的错误提示，您可以根据提示内容修改 </p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
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





