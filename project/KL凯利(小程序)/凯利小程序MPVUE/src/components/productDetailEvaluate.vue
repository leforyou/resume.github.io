<template>
<!--商品评价-->
<div class="evaluate">
  <ul>
    <li class="list main-padding-lr border-btm">
      <div class="head">
        <div class="person">
          <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
          <span class="name fz30">刘先生</span>
        </div>
        <div class="star fz50">
          <i v-for="(item,index) in arrStars" :key="index" class="iconfont flex-center" :class="item.star"></i>
        </div>
      </div>
      <div class="content">
        <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
      </div>
    </li>
    <li class="list main-padding-lr border-btm">
      <div class="head">
        <div class="person">
          <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
          <span class="name fz30">刘先生</span>
        </div>
        <div class="star fz40">
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-half fc-ffc939"></i>
          <i class="iconfont icon-star-none fc-aaa"></i>
        </div>
      </div>
      <div class="content">
        <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
      </div>
    </li>
    <li class="list main-padding-lr border-btm">
      <div class="head">
        <div class="person">
          <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
          <span class="name fz30">刘先生</span>
        </div>
        <div class="star fz50">
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-full fc-ffc939"></i>
          <i class="iconfont icon-star-half fc-ffc939"></i>
          <i class="iconfont icon-star-none fc-aaa"></i>
        </div>
      </div>
      <div class="content">
        <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import stars from '@/pages/sendEvaluation/stars'
export default {
  props: ['evaluate'],
  data(){
    return{
      url:this.$url,
      arrStars:[]
    }
  },
  beforeMount(){
    this.$data.arrStars = stars(1);
  },
  methods:{
    
  }
}
</script>

<style lang='scss' scoped>
.evaluate{
  margin-bottom: 20rpx;
  ul{
    @at-root .list{
      &:nth-last-child(1){
        border-bottom: none;
      }
      @at-root .head{
        height: 120rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @at-root .person{
          display: flex;
          align-items: center;
          img{
            width: 60rpx;
            height: 60rpx;
            background-color: #ddd;
            border-radius: 100%;
            overflow: hidden;
          }
          @at-root .name{
            margin-left: 20rpx;
          }
        }
        @at-root .star{
          display: flex;
          flex-wrap: nowrap;
          .iconfont{
            margin-left:6rpx;
          }
        }
      }
      @at-root .content{
        line-height: 1.5;
        padding-bottom: 40rpx;
      }
    }
  }
}
</style>
