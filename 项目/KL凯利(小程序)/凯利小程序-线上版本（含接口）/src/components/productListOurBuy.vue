<template>
<!--产品列表-->
<div class="product">
  <ul>
    <li class="list main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
      </div>
      <div class="right">
        <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香 橘红普洱瀛橘天香 橘红普洱普洱瀛橘天香橘红普洱瀛橘天香  橘红普洱普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</h1>
        <p class="num fz26 fc-999">280g个/盒</p>
        <div class="price">
          <span class="new main-color fz36">￥318.00</span>
          <span class="old fz22 fc-999 delete-line">￥390.00</span>
        </div>
        <a href="../productDetailOurBuy/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即购买</a>
      </div>
    </li>
    <li class="list main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
      </div>
      <div class="right">
        <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
        <p class="num fz26 fc-999">280g个/盒</p>
        <div class="price">
          <span class="new main-color fz36">￥318.00</span>
          <span class="old fz22 fc-999 delete-line">￥390.00</span>
        </div>
        <a href="../productDetailOurBuy/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即购买</a>
      </div>
    </li>
    <li class="list main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
      </div>
      <div class="right">
        <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
        <p class="num fz26 fc-999">280g个/盒</p>
        <div class="price">
          <span class="new main-color fz36">￥318.00</span>
          <span class="old fz22 fc-999 delete-line">￥390.00</span>
        </div>
        <a href="../productDetailOurBuy/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即购买</a>
      </div>
    </li>
    <li class="list main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
      </div>
      <div class="right">
        <h1 class="title fz28 ellipsis2">瀛橘天香  橘红普洱</h1>
        <p class="num fz26 fc-999">280g个/盒</p>
        <div class="price">
          <span class="new main-color fz36">￥318.00</span>
          <span class="old fz22 fc-999 delete-line">￥390.00</span>
        </div>
        <a href="../productDetailOurBuy/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即购买</a>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    props: ['products'],
    data(){
      return{
        url:this.$url
      }
    }
}
</script>

<style lang='scss' scoped>
.product{
  @at-root ul{
    @at-root .list{
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      display: flex;
      background-color: #fff;
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
        .title{

        }
        .num{

        }
        .price{
          position: absolute;
          bottom: $val;
          left: $right;
          .new{
            margin-right: 16rpx;
          }
          .old{

          }
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

</style>
