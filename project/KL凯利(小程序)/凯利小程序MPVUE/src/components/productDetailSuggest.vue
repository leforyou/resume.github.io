<template>
<!--商品详情-猜你喜欢-->
<div class="recommended">
  <div class="head fz30 fc-999">猜你喜欢</div>
  <ul>
    <li class="list">
      <a class="box" href="http://">
        <img v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
        <div class="info">
          <p class="title fz28 ellipsis1">瀛橘天香  橘红普洱</p>
          <div class="price">
            <span class="new main-color fz36">￥318.00</span>
            <span class="old fz22 fc-999 delete-line">￥390.00</span>
          </div>
        </div>
      </a>
    </li>
    <li class="list">
      <a class="box" href="http://">
        <img v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
        <div class="info">
          <p class="title fz28 ellipsis1">瀛橘天香  橘红普洱</p>
          <div class="price">
            <span class="new main-color fz36">￥318.00</span>
            <span class="old fz22 fc-999 delete-line">￥390.00</span>
          </div>
        </div>
      </a>
    </li>
    <li class="list">
      <a class="box" href="http://">
        <img v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
        <div class="info">
          <p class="title fz28 ellipsis1">瀛橘天香  橘红普洱</p>
          <div class="price">
            <span class="new main-color fz36">￥318.00</span>
            <span class="old fz22 fc-999 delete-line">￥390.00</span>
          </div>
        </div>
      </a>
    </li>
    <li class="list">
      <a class="box" href="http://">
        <img v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
        <div class="info">
          <p class="title fz28 ellipsis1">瀛橘天香  橘红普洱</p>
          <div class="price">
            <span class="new main-color fz36">￥318.00</span>
            <span class="old fz22 fc-999 delete-line">￥390.00</span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['evaluate'],
  data(){
    return{
      url:this.$url
    }
  },
  methods:{
    
  }
}
</script>

<style lang='scss' scoped>
$val:20rpx;
.recommended{
  padding-left: $val;
  padding-right: $val;
  .head{
    &::before,&::after{
      content: '';
      display: block;
      width: 268rpx;
      border-bottom: 1px solid #b3b3b3;
      position: absolute;
      top: 50%;
    }
    &::before{
      left: 0;
    }
    &::after{
      right: 0;
    }
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    position: relative;
  }
  ul{
    margin-right: -$val;
    display: flex;
    flex-wrap: wrap;
    @at-root .list{
      width: 50%;
      padding-right: $val;
      padding-bottom: $val;
      box-sizing: border-box;
      @at-root .box{
        display: block;
        border-radius: 12rpx;
        overflow: hidden;
        background-color: #fff;
        img{
          width: 100%;
          height: 344rpx;
        }
        @at-root .info{
          padding: 20rpx;
          .price{
            margin-top: 30rpx;
            .new{
              margin-right: 16rpx;
            }
          }
        }
      }
    }
  }
}
</style>
