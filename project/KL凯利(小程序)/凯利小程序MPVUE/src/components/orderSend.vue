<template>
<!--待发货-->
<div class="wrap-orders">
  <ul class="order">
    <li class="list bg-fff margin-top">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：546468762124</p>
        <p class="main-color">等待商家发货</p>
      </div>
      <a class="content main-padding-lr" href="../orderDetailSend/main" hover-class="none">
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
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['data'],
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
/** 该组件在样式在【orderAll.vue】的页面中 **/

</style>