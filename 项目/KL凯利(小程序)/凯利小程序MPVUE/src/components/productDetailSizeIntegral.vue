<template>
<!--商品规格-->
<div class="wrap-size" :class="{'active':isShow}" @click="hide()" catchtouchmove="true">
  <div class="box" catchtap="show">
    <div class="head main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
      </div>
      <div class="right">
        <p class="price main-color fz32">31800分</p>
        <p class="title ellipsis1 fz32">瀛橘天香 橘红普洱</p>
        <i class="iconfont icon-chahao fc-999 fz40" @click="hide()"></i>
      </div>
    </div>
    <div class="content main-padding-lr">
      <div class="size">
        <div class="left fz28">规格</div>
        <div class="right fz28">280g个/盒</div>
      </div>
      <div class="num">
        <div class="left fz28">数量</div>
        <div class="right fz28">
          <i class="iconfont icon-jianhao fc-999 fz28"></i>
          <span class="vol fz28">1</span>
          <i class="iconfont icon-jiahao1 fz28 main-color"></i>
        </div>
      </div>
    </div>
    <div class="foot fz30">
      <div class="buy-now sub-color">立即购买</div>
      <div class="add-cart sub-bg fc-fff">加入购物车</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['size'],
  data(){
    return{
      url:this.$url,
      isShow:false
    }
  },
  methods:{
    show(){
      this.isShow = true;
    },
    hide(){
      this.isShow = false;
    }
  }
}
</script>

<style lang='scss' scoped>
$val:130rpx;
.wrap-size{
  &.active{
    opacity: 1;
    visibility: visible;
    .box{
      transform: translateY(0%);
    }
  }
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
  z-index: 9999999;
  @at-root .box{
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: all .3s;
    transform: translateY(100%);
    @at-root .head{
      background-color: #f5f5f5;
      padding-left: $val + 28;
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      .left{
        float: left;
        margin-left: -$val;
        .img{
          width: $val;
          height: $val;
        }
      }
      .right{
        height: $val;
        position: relative;
        padding-left: 30rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .price{
          margin-bottom: 25rpx;
        }
        .iconfont{
          $val:10rpx;
          position: absolute;
          top: -$val;
          right: -$val;
          padding: $val;
        }
      }
    }
    @at-root .content{
      min-height: 390rpx;
      .size,.num{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .size{
        padding: 25rpx 0;
        .right{
          padding: 0 28rpx;
          line-height: 58rpx;
          border: 1rpx solid #414d28;
          color: #414d28;
          border-radius: 10rpx;
        }
      }
      .num{
        padding: 25rpx 0;
        .right{
          display: flex;
          align-items: center;
          .vol{
            padding: 0 22rpx;
          }
          .iconfont{
            width: 40rpx;
            height: 40rpx;
            background-color: #e6e6e6;
            border-radius: 6rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    @at-root .foot{
      border-top: 1px solid #dcdcdc;
      height: 110rpx;
      display: flex;
      .buy-now,.add-cart{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
