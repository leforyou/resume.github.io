<template>
  <div class="container">
    <!--退换管理-->
    <div class="head-nav bg-fff main-padding-lr">
      <div class="box">
        <p class="fz28 fc-666" :class="{'active':tabNum==0}" @click="tabNum=0">申请中</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==1}" @click="tabNum=1">退换中</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==2}" @click="tabNum=2">已完成</p>
      </div>
    </div>

    <div class="content">

      <div class="wrap-orders application" :class="{'active':tabNum==0}">
        <!--申请中-->
        <ul class="order">
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">等待商家审核</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedApplying/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
            <div class="foot main-padding-lr">
              <div class="foot-box border-top">
                <p class="fz22 btn green-btn">取消退换货</p>
              </div>
            </div>
          </li>
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">等待商家审核</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedApplying/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
            <div class="foot main-padding-lr">
              <div class="foot-box border-top">
                <p class="fz22 btn green-btn">取消退换货</p>
              </div>
            </div>
          </li>
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">等待商家审核</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedApplying/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
            <div class="foot main-padding-lr">
              <div class="foot-box border-top">
                <p class="fz22 btn green-btn">取消退换货</p>
              </div>
            </div>
          </li>
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">等待商家审核</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedApplying/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
            <div class="foot main-padding-lr">
              <div class="foot-box border-top">
                <p class="fz22 btn green-btn">取消退换货</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="wrap-orders returned" :class="{'active':tabNum==1}">
        <!--退换中-->
        <ul class="order">
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">退换中</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedIng/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="wrap-orders completed" :class="{'active':tabNum==2}">
        <!--已完成-->
        <ul class="order">
          <li class="list bg-fff margin-top">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：546468762124</p>
              <p class="main-color">交易完成</p>
            </div>
            <a class="content main-padding-lr" href="../orderReturnedComplete/main" hover-class="none">
              <div class="content-box">
                <div class="left">
                  <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱</p>
                  <p class="price fz28">￥318.00</p>
                  <p class="num fz28 fc-999">x1</p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import orderAll from '../orderAll/index' /**导入该组件【orderAll.vue】主要是使用它的css样式，我的订单(详情)与退换管理的布局基本是一致**/
export default {
  data () {
    return {
      url:this.$url,
      tabNum:0
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
$height:80rpx;
.container{
  margin-bottom: 20rpx;
  overflow: hidden;
  padding-top: $height;
  .head-nav{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $height;
      p{
        $val:50rpx;
        &.active{
          &::after{
            content: "";
            display: block;
            position: absolute;
            left: $val+10;
            right: $val+10;
            bottom: 0;
            border-bottom: 3rpx solid $mainColor;
          }
          color: $mainColor;
        }
        height: 100%;
        padding: 0 $val;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }
  .content{
    .wrap-orders{
      &.active{
        display: block;
      }
      display: none;
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





