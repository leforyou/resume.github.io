<template>
<!--帮助中心-->
  <div class="container">
    <div class="box">
      <ul class="fz28">
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">如何注册普通会员</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">为什么注册信息填好后提交没反映？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">我的邮箱为什么验证不了？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">会员名是什么？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">会员名要如何设置会更好？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">个体户如何填写公司名？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">注册时候提示：请求已过期，请重新注册</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">会员账户为什么注册不成功？</a>
        </li>
        <li class="main-padding-lr border-btm">
          <a href="../helpDetail/main" hover-class="none">一个人能不能注册多个会员账户吗？</a>
        </li>
      </ul>
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
  .box{
    ul{
      li{
        a{
          padding: 40rpx 0;
          line-height: 1.6;
        }
      }
    }
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





