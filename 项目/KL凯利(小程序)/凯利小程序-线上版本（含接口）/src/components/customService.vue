<template>
<!--打开客服会话-->
<div class="custom-service" :class="{'active':isShow}">
  <button open-type="contact">
    <i class="iconfont icon-kefu fz58 fc-fff"></i>
  </button>
</div>
</template>

<script>
export default {
    props: ['video'],
    data(){
      return{
        url:this.$url,
        isShow:true,
      }
    },
    onPageScroll(e){
      //页面滚动触发事件的处理函数 https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
      this.isShow = true;
      //console.log(e);//输出是：{scrollTop: 1769}
    },
    onReachBottom(e){
      //页面上拉触底事件的处理函数
      
    },
    methods:{
      
    }
}
</script>

<style lang='scss' scoped>
.custom-service{
  position: fixed;
  bottom: 40rpx;
  right: 28rpx;
  background-color: #7f7f7f;
  border-radius: 100%;
  overflow: hidden;
  transition: all 0.2s;
  visibility: hidden;
  opacity: 0;
  z-index: 999999999;
  &.active{
    visibility: visible;
    opacity: 1;
  }
  @at-root button{
    background-color: transparent;
    border: none;
    width: 86rpx;
    height: 86rpx;
    padding: 0;
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    @at-root .iconfont{
      
    }
  }
}
</style>
