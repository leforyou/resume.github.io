<template>
<!--沏茶视频-->
<div class="video-tea">
  <div class="video-box" >
    <video id="myVideo" v-if="url" :src="url+'media/make-tea.mp4'" objectFit="contain" :poster="url+'img/video-bg.jpg'"></video>
  </div>
</div>
</template>

<script>
export default {
  props: ['video'],
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
.video-tea{
  @at-root .video-box{
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 420rpx;
    @at-root video{
      height: 420rpx;
      width: 100%;
    }
  }
}
</style>
