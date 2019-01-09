<template>
<!--首页轮播图-->
<div class="swiper">
  <div class='box'>
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" 
    :indicator-active-color="activeColor"
    :indicator-color="color"
    >
        <swiper-item v-for="item in imgUrls" :key="item.id">
            <image :src="url+item" class="slide-image"  mode="aspectFill"/>
        </swiper-item>
      </swiper>
  </div>
</div>
</template>

<script>
export default {
    props: ['imgUrls'],
    data(){
      //console.log(this.$url)
      return{
        indicatorDots:true,
        autoplay:true,
        interval:3000,
        duration:500,
        color:'#fff',
        activeColor:"#464c3a",
        url:this.$url
      }
    }
}
</script>

<style lang='scss' scoped>
/** 有弧度的矩形 **/
$leftRight:600rpx;
$ht:100%;
.swiper {
  position: relative;
  padding-top: 46.66%;
  background-color: #f4f7ed;
  overflow: hidden;
}
.box{
  position: absolute;
  top: -$ht;
  left: -$leftRight;
  right: -$leftRight;
  bottom: 0;
  border-radius: 80%;
  overflow: hidden;
  z-index: 60;
}
swiper{
  height: $ht/2;
  position: absolute;
  bottom: 0;
  left: $leftRight;
  right: $leftRight;
  z-index: 50;
}
image{
  width: 100%;
  height: 100%;
}



</style>

<style lang='css' scoped>
/**另一种布局-矩形

.swiper {
  position: relative;
  padding-top: 46.66%;
  background-color: #f4f7ed;
  overflow: hidden;
}
.box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
swiper{
  height: 100%;
}
image{
  width: 100%;
  height: 100%;
}

**/
</style>
