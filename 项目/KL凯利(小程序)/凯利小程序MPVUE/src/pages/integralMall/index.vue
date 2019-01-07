<template>
<!--积分商城-->
  <div class="container">

    <div class="head-nav bg-fff main-padding-lr margin-btm">
      <div class="box">
        <p class="flex-center" :class="{'active':tabNum==0}" @click="tabNum=0">
          <span class="flex-center fz28 fc-666">全部商品</span>
        </p>
        <p class="flex-center" :class="{'active':tabNum==1}" @click="tabNum=1">
          <span class="flex-center fz28 fc-666">可兑换商品</span>
        </p>
      </div>
    </div>
    
    <div class="product">
      <ul :class="{'active':tabNum==0}">
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香 橘红普洱瀛橘天香 橘红普洱普洱瀛橘天香橘红普洱瀛橘天香  橘红普洱普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
        </li>
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
        </li>
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
        </li>
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
        </li>
      </ul>

      <ul :class="{'active':tabNum==1}">
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
        </li>
        <li class="list main-padding-lr bg-fff margin-btm">
          <div class="left">
            <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <p class="intergral main-color fz36">31800分</p>
            <a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
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
      url:this.$url,
      tabNum:0
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
$height:80rpx;
.container{
  padding-top: $height;
  .head-nav{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .box{
      display: flex;
      align-items: center;
      height: $height;
      p{
        height: 100%;
        width: 50%;
        &.active{
          span{
            &::after{
              $val:20rpx;
              content: "";
              display: block;
              position: absolute;
              left: $val;
              right: $val;
              bottom: 0;
              border-bottom: 3rpx solid $mainColor;
            }
            color: $mainColor;
          }
        }
        span{
          position: relative;
          height: 100%;
        }
      }
    }
  }
  .product{
    @at-root ul{
      display: none;
      &.active{
        display: block;
      }
      @at-root .list{
        padding-top: 40rpx;
        padding-bottom: 40rpx;
        display: flex;
        position: relative;
        @at-root .left{
          img{
            width: 210rpx;
            height: 210rpx;
            border-radius: 10rpx;
          }
        }
        @at-root .right{
          $right:30rpx;
          $val:10rpx;
          width: 100%;
          padding-left: $right;
          padding-bottom: $val;
          padding-top: $val;
          position: relative;
          .intergral{
            position: absolute;
            bottom: $val;
            left: $right;
          }
          .buy-now{
            position: absolute;
            bottom: $val;
            right: 0;
            line-height: 46rpx;
            padding: 0 20rpx;
            border: 1rpx solid #7fb414;
            border-radius: 8rpx;
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





