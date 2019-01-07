<template>
<!--拼团-->
<div class="collage main-padding-lr">
  <ul>
    <li>
      <div class="head">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/slider1.jpg'" mode="aspectFill">
          <img class="ico" v-if="url" :src="url+'img/ico-collage.png'">
        </div>
        <div class="right">
          <h1 class="title fz28 ellipsis1">橘红普洱</h1>
          <div class="bar">
            <p class="fz22 fc-999">还差3人成团</p>
            <div class="line">
              <i class="acitve main-bg" style="width:33.33%"></i>
            </div>
          </div>
          <p class="old-price delete-line fz28 fc-999">￥390.00</p>
          <p class="new-price fz36 main-color">￥390.00</p>
          <a href="../productDetailOurBuy/main" class="join main-bg fz26 fc-fff" hover-class="none">立即参团</a>
        </div>
      </div>
      <div class="time">
        <span class="fc-666 fz24">距离活动截止时间：</span>                     
        <span class="square fc-fff fz26 sub-bg">1</span>
        <span class="fc-666 fz24">天</span>
        <span class="square fc-fff fz26 sub-bg">12</span>
        <span class="fc-666 fz24">小时</span>
        <span class="square fc-fff fz26 sub-bg">23</span>
        <span class="fc-666 fz24">分钟</span>
      </div>
    </li>
    <li>
      <div class="head">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/slider1.jpg'" mode="aspectFill">
          <img class="ico" v-if="url" :src="url+'img/ico-collage.png'">
        </div>
        <div class="right">
          <h1 class="title fz28 ellipsis1">橘红普洱</h1>
          <div class="bar">
            <p class="fz22 fc-999">还差3人成团</p>
            <div class="line">
              <i class="acitve main-bg" style="width:33.33%"></i>
            </div>
          </div>
          <p class="old-price delete-line fz28 fc-999">￥390.00</p>
          <p class="new-price fz36 main-color">￥390.00</p>
          <a href="../productDetailOurBuy/main" class="join main-bg fz26 fc-fff" hover-class="none">立即参团</a>
        </div>
      </div>
      <div class="time">
        <span class="fc-666 fz24">距离活动截止时间：</span>                     
        <span class="square fc-fff fz26 sub-bg">1</span>
        <span class="fc-666 fz24">天</span>
        <span class="square fc-fff fz26 sub-bg">12</span>
        <span class="fc-666 fz24">小时</span>
        <span class="square fc-fff fz26 sub-bg">23</span>
        <span class="fc-666 fz24">分钟</span>
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
.collage{
  padding-bottom: 20rpx;
  @at-root ul{
    @at-root li{
      margin-top: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0rpx 0rpx 6rpx rgba(0,0,0, 0.2);
      @at-root .head{
        padding: 30rpx;
        border-bottom: 1px solid #ededed;
        display: flex;
        @at-root .left{
          width: 260rpx;
          position: relative;
          .img{
            width: 260rpx;
            height: 260rpx;
          }
          .ico{
            width: 54rpx;
            height: 56rpx;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        @at-root .right{
          padding-left: 30rpx;
          padding-top: 10rpx;
          padding-bottom: 10rpx;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          @at-root .bar{
            width: 100%;
            @at-root .line{
              width: 100%;
              height: 10rpx;
              border-radius: 10rpx;
              overflow: hidden;
              background-color: #e6e6e6;
              margin-top: 15rpx;
              .acitve{
                height: 100%;
                border-radius: 10rpx;
                display:block;
                position: relative;
                &::after{
                  content: '';
                  display: block;
                  background-color: #fff;
                  width: 6rpx;
                  height: 6rpx;
                  border-radius: 100%;
                  position: absolute;
                  top: 50%;
                  right: 4rpx;
                  transform: translateY(-50%)
                }
              }
            }
          }
          @at-root .join{
            position: absolute;
            right: 0;
            bottom: 10rpx;
            line-height: 66rpx;
            padding: 0 40rpx;
            border-radius: 66rpx;
            white-space: nowrap;
          }
        }
      }
      @at-root .time{
        display: flex;
        align-items: center;
        padding: 22rpx 30rpx;
        .square{
          width: 40rpx;
          height: 40rpx;
          margin: 0 8rpx;
          border-radius: 6rpx;
          display: flex;
          justify-content:center;
          align-items: center;
        }
      }
    }
  }
}
</style>
