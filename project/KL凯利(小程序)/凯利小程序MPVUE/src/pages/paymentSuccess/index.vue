<template>
<!--付款成功-->
  <div class="container">
    <div class="title fz38 main-color">付款成功</div>
    <div class="check-order fz26 fc-999 margin-btm">请到我的订单查看订单进度~</div>
    <div class="continue-see fz26 fc-999">继续逛逛吧~</div>
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
  text-align: center;
  .title{
    margin: 100rpx 0 30rpx;
    overflow: hidden;
  }
  .check-order{
    
  }
  .continue-see{

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





