<template>
  <div class="container">
    <!--消息中心-->
    <div class="message-center">
      <ul>
        <li class="list main-padding-lr bg-fff">
          <div class="head">
            <p class="fz30 name fc-999">公告</p>
            <p class="fz24 time fc-999">2018-05-08</p>
          </div>
          <div class="content fz30">最新橘红普洱，橘红普洱是一种由橘子皮与普洱茶组成的饮品，用于暖胃、减肥、润肠通便、降脂降压。快了解吧！</div>
        </li>
        <li class="list main-padding-lr bg-fff">
          <div class="head">
            <p class="fz30 name fc-999">公告</p>
            <p class="fz24 time fc-999">2018-05-08</p>
          </div>
          <div class="content fz30">最新橘红普洱，橘红普洱是一种由橘子皮与普洱茶组成的饮品，用于暖胃、减肥、润肠通便、降脂降压。快了解吧！</div>
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
.container{
  margin-bottom: 20rpx;
  @at-root .message-center{
    ul{
      @at-root .list{
        margin-top: 20rpx;
        overflow: hidden;
        .head{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100rpx;
        }
        .content{
          line-height: 1.5;
          margin-bottom: 28rpx;
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
  background-color: #ededed;
}
</style>





