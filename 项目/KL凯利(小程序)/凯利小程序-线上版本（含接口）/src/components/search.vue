<template>
  <!--搜索-->
  <div class="wrap-search sub-bg">
    <div class="search-box">
      <img v-if="url" :src="url+'img/search.png'">
      <slot>
        <!--
          传来的【分发内容】两种
          <p class="search-content">搜索</p>
          <input class="search-content" type="search" placeholder="搜索" confirm-type="search" focus="true" v-model="searchContent" @confirm="searchFn()">
        -->
      </slot>
    </div>
    <a class="a-link" :class="{active:isCanInput}" href="../search/main" hover-class="none"></a>
  </div>
</template>

<script>
export default {
  props: ['isCanInput'],
  data(){
    return{
      url:this.$url
    }
  },
  methods:{
    
  }
}
</script>

<style lang='scss'>
/** scoped **/
.wrap-search{
  padding: 0rpx 24rpx;
  z-index: 9999;
  position: relative;
  height: 130rpx;
  display: flex;
  align-items: center;
  .search-box{
    background-color: #fff;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80rpx;
    position: relative;
    z-index: 10;
    padding-left: 77rpx;
    img{
      width: 34rpx;
      min-width: 34rpx;
      min-height: 34rpx;
      height: 34rpx;
      padding-left: 25rpx;
      padding-right: 18rpx ;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }  
    .search-content,input,input::-webkit-input-placeholder{
      width:100%;
      padding: 10rpx 0rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
  .a-link{
    &.active{
      display: none;
    }
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 20;
  }
}  
</style>
