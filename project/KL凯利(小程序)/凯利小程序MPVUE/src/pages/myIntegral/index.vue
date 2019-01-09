<template>
<!--我的积分-->
  <div class="container">
    <div class="head margin-btm">
      <p class="usable fz24 fc-fff">可用积分</p>
      <p class="num fz80 fc-fff">5460</p>
      <a href="../integralMall/main" class="mall fz24 fc-fff scale-1px" hover-class="none">
        <span class="fz24 fc-fff">积分商城</span>
        <i class="iconfont icon-gengduo fc-fff fz22"></i>
      </a>
    </div>

    <div class="content margin-btm bg-fff">
      <p class="record main-padding-lr fz30 fc-666 flex-center border-btm">积分记录</p>
      <ul class="main-padding-lr">
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 微信支付</p>
            <p class="price fz30 active">+318</p>
          </div>
        </li>
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 银行支付</p>
            <p class="price fz30 active">+318</p>
          </div>
        </li>
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 余额支付</p>
            <p class="price fz30 active">+318</p>
          </div>
        </li>
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 微信支付</p>
            <p class="price fz30 active">+318</p>
          </div>
        </li>
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 银行支付</p>
            <p class="price fz30 active">+318</p>
          </div>
        </li>
        <li class="cd-list border-btm">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">购买橘红普洱</p>
            <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 余额支付</p>
            <p class="price fz30 active">+318</p>
          </div>
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
  .head{
    $color1:#ff990c;
    $color2:#fac613;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 265rpx;
    background: $color1;
    background: -webkit-linear-gradient(right bottom, $color1 , $color2); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to bottom left, $color1 , $color2); /* 标准的语法（必须放在最后） */
    .usable{

    }
    .num{
      
    }
    .mall{
      &::after{
        border-radius: 40rpx;
        border-color: #fff;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40rpx;
      padding: 0 22rpx;
      .iconfont{
        margin-left: 5rpx;
      }
    }
  }
  .content{
    .record{
      height: 110rpx;
    }
    ul{
      @at-root .cd-list{
        &:nth-last-child(1){
          border-bottom: none;
        }
        display: flex;
        align-items: center;
        height: 145rpx;
        .iconfont{
          margin-right: 28rpx;
        }
        .info{
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          position: relative;
          .title{
            padding-right: 150rpx;
            margin-bottom: 5rpx;
          }
          .price{
            &.active{
              color: #ffa31f;
            }
            position: absolute;
            top: 0;
            right: 0;
          }
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





