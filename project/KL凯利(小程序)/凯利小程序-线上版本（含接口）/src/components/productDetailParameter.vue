<template>
<!--商品参数-->
<div class="parameter" :class="{'active':isShow}" @click="hide()" catchtouchmove="true">
  <div class="box" catchtap="show">
    <div class="head border-btm">
      <p class="title fz32">产品参数</p>
      <i class="iconfont icon-chahao fc-999 fz40" @click="hide()"></i>
    </div>
    
    <scroll-view class="content" scroll-y="true">
      <ul class="fz28">
        <li class="list main-padding-lr">
          <span class="left">品牌</span>
          <span class="right">{{prouctDetail.NvrFd7}}<!-- 瀛橘天香 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">生产工艺</span>
          <span class="right">{{prouctDetail.NvrFd8}}<!-- 控温久培 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">年份</span>
          <span class="right">{{prouctDetail.NvrFd9}}<!-- 1~2年 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">包装方式</span>
          <span class="right">{{prouctDetail.NvrFd10}}<!-- 礼盒装 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">存放方式</span>
          <span class="right">{{prouctDetail.NvrFd11}}<!-- 干燥、通风、无异味处 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">食品产地</span>
          <span class="right">{{prouctDetail.NvrFd12}}<!-- 广东 --></span>
        </li>
        <li class="list main-padding-lr">
          <span class="left">分类</span>
          <span class="right">{{prouctDetail.NvrFd13}}<!-- 果茶 --></span>
        </li>
      </ul>
    </scroll-view>
  </div>
</div>
</template>

<script>
export default {
  props: ['prouctDetail'],
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
.parameter{
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
      line-height: 112rpx;
      text-align: center;
      position: relative;
      .title{
        display: inline-block;
      }
      .iconfont{
        position: absolute;
        top: 50%;
        right: 0rpx;
        transform: translateY(-50%);
        padding: 0 28rpx;
      }
    }
    @at-root .content{
      height: 610rpx;
      ul{
        @at-root .list{
          &:nth-child(2n+2){
            background-color: #f5f5f5;
          }
          height: 86rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
