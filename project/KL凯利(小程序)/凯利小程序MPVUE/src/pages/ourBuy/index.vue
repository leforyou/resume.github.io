<template>
  <div class="container">
    <!--我的团购-订单-->
    <div class="wrap-orders">
      <ul class="order">
        <li class="list bg-fff margin-top">
          <!--待付款-->
          <div class="head main-padding-lr fz24">
            <p class="fc-999">订单编号：546468762124</p>
            <p class="main-color">等待买家付款</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailPayment/main" hover-class="none">
            <div class="content-box">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱 瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</p>
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
              <p class="fz22 btn black-btn">取消订单</p>
              <p class="fz22 btn green-btn">确认付款</p>
            </div>
          </div>
        </li>

        <li class="list bg-fff margin-top">
          <!--待发货-->
          <div class="head main-padding-lr fz24">
            <p class="fc-999">订单编号：546468762124</p>
            <p class="main-color">等待商家发货</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailSend/main" hover-class="none">
            <div class="content-box">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱 瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</p>
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

        <li class="list bg-fff margin-top">
          <!--待收货-->
          <div class="head main-padding-lr fz24">
            <p class="fc-999">订单编号：546468762124</p>
            <p class="main-color">等待买家收货</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailReceive/main" hover-class="none">
            <div class="content-box">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱 瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</p>
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
              <p class="fz22 btn green-btn">确认收货</p>
            </div>
          </div>
        </li>

        <li class="list bg-fff margin-top">
          <!--待评价-->
          <div class="head main-padding-lr fz24">
            <p class="fc-999">订单编号：546468762124</p>
            <p class="main-color">等待买家评价</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailComplete/main" hover-class="none">
            <div class="content-box">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">瀛橘天香  橘红普洱 瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱瀛橘天香  橘红普洱</p>
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
              <a href="../returnedReason/main" class="fz22 btn black-btn" hover-class="none">申请退换货</a>
              <a href="../sendEvaluation/main" class="fz22 btn green-btn" hover-class="none">去评价</a>
            </div>
          </div>
        </li>

        <li class="list bg-fff margin-top">
          <!--退货中-->
          <div class="head main-padding-lr fz24">
            <p class="fc-999">订单编号：546468762124</p>
            <p class="main-color">等待商家审核</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailComplete/main" hover-class="none">
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
  </div>
</template>

<script>
import orderAll from '../orderAll/index' /**导入该组件【orderAll.vue】主要是使用它的css样式，我的订单(详情)与q我的团购的布局基本是一致**/

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

.container{
  margin-bottom: 20rpx;
  overflow: hidden;
}
</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





