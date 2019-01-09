<template>
<!--开始推广-->
  <div class="container">
    <div class="head flex-center">
      <div class="img-box">
        <img v-if="url" :src="url+'img/qr-code.jpg'" >
      </div>
      <p class="share fz30 fc-666">分享二维码开发推广</p>
    </div>
    
    <div class="wrap-btn main-padding-lr">
      <p class="btn main-bg fz30 fc-fff flex-center">保存到本地</p>
      <button class="btn btn-reset main-bg fz30 fc-fff flex-center" open-type="share">分享给朋友</button>
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
    flex-direction: column;
    .img-box{
      margin-top: 100rpx;
      margin-bottom: 30rpx;
      img{
        width: 308rpx;
        height: 308rpx;
      }
    }
  }
  .wrap-btn{
    margin-top: 80rpx;
    .btn{
      $h:86rpx;
      height: $h;
      border-radius: $h;
      margin-bottom: 50rpx;
    }
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





