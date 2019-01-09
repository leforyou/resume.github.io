<template>
<!--下拉刷新提示-动画效果是三个圆的变大变小-->
<div class="wrap-bounce">
  <div class="box">
    <i class="circle circle1"></i>
    <i class="circle circle2"></i>
    <i class="circle circle3"></i>
  </div>
</div>
</template>

<script>
export default {
    props: ['bounce'],
    data(){
      return{
        //url:this.$url
      }
    }
}
</script>

<style lang='scss'>
/**这个动画来源--阿里图标官方的加载动画**/
$mainColor: #7fb414;
.wrap-bounce{
  background-color: #fff;
  .box{
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle{
      display: flex;
      width: 26rpx;
      height: 26rpx;
      margin: 0 2rpx;
      background-color: $mainColor;
      border-radius: 100%;
      -webkit-animation:bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode:both;
      animation-fill-mode:both;
    }
    .circle1{
      -webkit-animation-delay: -.32s;
      animation-delay: -.32s;
    }
    .circle2{
      -webkit-animation-delay: -.16s;
      animation-delay: -.16s;
    }
    .circle3{
      
    }
  }
}

@keyframes bouncedelay {
  0%,100%,80% {
    transform: scale(0);
    -webkit-transform: scale(0)
  }

  40% {
    transform: scale(1);
    -webkit-transform: scale(1)
  }
}
</style>
