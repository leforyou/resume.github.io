<template>
<!--推广订单-->
  <div class="container">
    <div class="wrap-orders margin-btm">
      <ul class="order">
        <li class="list bg-fff margin-top">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
            <p class="fc-999">刘小姐</p>
            <p class="main-color">等待买家付款</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailPayment/main" hover-class="none">
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
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥318.00</div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥30.00</p>
          </div>
        </li>

        <li class="list bg-fff margin-top">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
            <p class="fc-999">陈先生</p>
            <p class="main-color">等待商家发货</p>
          </div>
          <a class="content main-padding-lr" href="../orderDetailSend/main" hover-class="none">
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
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥318.00</div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥30.00</p>
          </div>
        </li>

        <li class="list bg-fff margin-top">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
            <p class="fc-999">曾先生</p>
            <p>交易完成</p>
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
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥318.00</div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥30.00</p>
          </div>
        </li>
      </ul>
    </div>

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
  .wrap-orders{
    .order{
      .head{
        height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 118rpx;
        position: relative;
        .person-pic{
          position: absolute;
          left: 28rpx;
          width: 70rpx;
          height: 70rpx;
        }
      }
      .content{
        background-color: #fafafa;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        .content-box{
          $val:160rpx;
          display: flex;
          .left{
            min-width: $val;
            width: $val;
            img{
              width: $val;
              height: $val;
              border-radius: 12rpx;
              overflow: hidden;
              vertical-align: middle;
            }
          }
          .right{
            $val:10rpx;
            position: relative;
            padding-left: 20rpx;
            padding-right: 150rpx;
            padding-top: $val;
            width:100%;
            .price,.num{
              position: absolute;
              right: 0;
            }
            .price{
              top: $val;
            }
            .num{
              top: 70rpx;
            }
          }
        }
      }
      .total-price{
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .foot{
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
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





