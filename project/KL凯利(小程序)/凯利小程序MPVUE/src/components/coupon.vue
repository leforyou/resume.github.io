<template>
<!--优惠券-->
<div class="coupon">
  <scroll-view scroll-x>
    <ul class="main-padding-lr">
      <li>
        <div class="box">
          <div class="head">
            <h1 class="fz29 fc-fff">50元优惠券</h1>
            <h2 class="fz22 fc-fff">满400.00可用</h2>
            <p class="get fz26 fc-fff">领取</p>
          </div>
          <div class="time fc-ccc fz22">
            2018.04.11~2018.05.01
          </div>
        </div>
      </li>
      <li>
        <div class="box">
          <div class="head">
            <h1 class="fz29 fc-fff">50元优惠券</h1>
            <h2 class="fz22 fc-fff">满400.00可用</h2>
            <p class="get fz26 fc-fff">领取</p>
          </div>
          <div class="time fc-ccc fz22">
            2018.04.11~2018.05.01
          </div>
        </div>
      </li>
      <li>
        <div class="box">
          <div class="head">
            <h1 class="fz29 fc-fff">50元优惠券</h1>
            <h2 class="fz22 fc-fff">满400.00可用</h2>
            <p class="get fz26 fc-fff">领取</p>
          </div>
          <div class="time fc-ccc fz22">
            2018.04.11~2018.05.01
          </div>
        </div>
      </li>
    </ul>
  </scroll-view>
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
.coupon{
  scroll-view{

  }
  @at-root ul{
    display: inline-block;
    white-space: nowrap;
    padding-top: 40rpx;
    padding-bottom: 10rpx;
    @at-root li{
      &:nth-last-child(1){
        margin-right: 0rpx;
      }
      &:nth-child(1){
        .box{
          background: linear-gradient(to right, #71ba30 , #528a01);
        }
      }
      &:nth-child(2){
        .box{
          background: linear-gradient(to right, #9fcc41 , #76ad08);
        }
      }
      &:nth-child(n+3){
        .box{
          background: linear-gradient(to right, #c3cb3f , #a8ae0b);
        }
      }
      display: inline-block;
      margin-right: 20rpx;
      width: 338rpx;
      border-radius: 8rpx;
      box-shadow: 0rpx 0rpx 10rpx rgba(0,0,0, 0.3);
      overflow: hidden;
      @at-root .box{
        background-color: #71ba30;
        @at-root .head{
          position: relative;
          padding: 30rpx 20rpx;
          background-image: url(../../static/img/coupon-bg.png);
          background-position:0 100%;
          background-repeat: repeat-x;
          background-size: 20rpx 8rpx;
          @at-root h1{
            margin-bottom: 20rpx;
          }
          @at-root h2{

          }
          @at-root .get{
            position: absolute;
            right: 20rpx;
            top: 50%;
            transform: translateY(-50%);
            line-height: 46rpx;
            padding: 0 20rpx;
            border:1rpx solid #fff;
            border-radius: 46rpx;
          }
        }
        @at-root .time{
          height: 56rpx;
          line-height: 56rpx;
          background-color: #fff;
          padding-left: 20rpx;
        }
      }
    }
  }
}
</style>
