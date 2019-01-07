<template>
<!--收货地址-->
  <div class="container">
    <div class="box bg-fff main-padding-lr margin-top margin-btm">
      <ul>
        <li class="border-btm flex-between">
          <i class="iconfont icon-gou fz24 active"></i>
          <div class="info fz28">
            <p class="name-phone">刘小姐 &nbsp;&nbsp; 13800138000</p>
            <p class="fc-999">广东省广州市天河区龙口西天信大厦1603</p>
          </div>
          <i class="sigh-change flex-center fz30" @click="changeInfo()">i</i>
        </li>
        <li class="border-btm flex-between">
          <i class="iconfont icon-gou fz24"></i>
          <div class="info fz28">
            <p class="name-phone">陈小姐 &nbsp;&nbsp; 13800138000</p>
            <p class="fc-999">广东省广州市天河区龙口西天信大厦1603广东省广州市天河区龙口西天信大厦1603</p>
          </div>
          <i class="sigh-change flex-center fz30" @click="changeInfo()">i</i>
        </li>
      </ul>
      <a class="add flex-between" href="../addressAdd/main" hover-class="none">
        <i class="iconfont icon-jiahao1 fz24 flex-center"></i>
        <p class="fz28">新增地址</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
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
    changeInfo(){
      wx.navigateTo({
        url: '../addressChange/main?key=value&key2=value2'
      });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
$color:#0670eb;
.container{
  $left:56rpx;
  .box{
    overflow: hidden;
    ul{
      li{
        position: relative;
        padding-left: $left;
        .iconfont{
          color: $color;
          position: absolute;
          left: 0;
        }
        .icon-gou{
          display: none;
          &.active{
            display: block;
          }
        }
        .info{
          width: 100%;
          padding: 30rpx 0;
          .name-phone{
            margin-bottom: 6rpx;
          }
        }
        .sigh-change{
          margin-left: 20rpx;
          min-width: 40rpx;;
          width: 40rpx;
          height: 40rpx;
          border-radius: 100%;
          border: 1rpx solid $color;
          color: $color;
        }
      }
    }
  }
  .add{
    position: relative;
    height: 88rpx;
    padding-left: $left;
    .icon-jiahao1{
      position: absolute;
      left: 0;
      color: $color;
      border: 1rpx solid $color;
      border-radius: 100%;
      width: 35rpx;
      height: 35rpx;
      font-weight: bold;
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





