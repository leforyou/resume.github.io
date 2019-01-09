<template>
<!--提现申请-->
  <div class="container">
    <div class="head bg-fff main-padding-lr">
      <div class="box">
        <p class="fz30">金额(元)</p>
        <p class="fz24 fc-ba">金额(元)</p>
      </div>
      <input class="fz30" type="text" placeholder="请输入金额，满50可提现" placeholder-class=".fc-ba">
    </div>

    <div class="main-padding-lr">
      <p class="btn fz30 fc-fff main-bg">提交申请</p>
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
    $val:40rpx;
    padding-bottom: $val;
    .box{
      padding: $val 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .btn{
    $height:90rpx;
    height: $height;
    border-radius: $height;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80rpx;
  }
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





