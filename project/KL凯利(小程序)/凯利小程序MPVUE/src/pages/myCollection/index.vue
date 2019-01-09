<template>
<!--我的收藏-->
  <div class="container">
    <ul class="margin-btm">
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
      <li class="list main-padding-lr bg-fff margin-top">
        <a class="left" href="../productDetail/main" hover-class="none">
          <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
          <p class="num fz26 fc-999">280g个/盒</p>
          <span class="price main-color fz36">￥318.00</span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  @at-root .list{
    padding-top: 28rpx;
    padding-bottom: 28rpx;
    display: flex;
    @at-root .left{
      $val:210rpx;
      min-width: $val;
      height: $val;
      img{
        width: $val;
        height: $val;
        border-radius: 10rpx;
      }
    }
    @at-root .right{
      width: 100%;
      margin-left: 30rpx;
      margin-top: 10rpx;
      margin-bottom: 10rpx;
      position: relative;
      .title{
        padding-right: 50rpx;
        
      }
      .num{
        margin-top: 6rpx
      }
      @at-root .price{
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @at-root .delete{
        position: absolute;
        top: 0rpx;
        right: 0;
        padding: 5rpx;
      }
    }
  }
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





