<template>
<!--商品详情页轮播图-->
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

<style lang='css' scoped>
.swiper {
  position: relative;
  padding-top: 100%;
  background-color: #fff;
}
.box{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
swiper{
  height: 100%;
}
image{
  width: 100%;
  height: 100%;
}
</style>
