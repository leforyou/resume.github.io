<template>
<!--订单详情-->
<div class="oder-detail">
  <div class="order bg-fff">
    <div class="box">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：546468762124</p>
      </div>
      <div class="content main-padding-lr" hover-class="none">
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
      </div>
      <div class="delivery main-padding-lr">
        <div class="box">
          <p class="title fz28">配送方式</p>
          <p class="price fz28 fc-666">￥0.00</p>
          <p class="fz28 fc-666">快递发货</p>
        </div>
      </div>
      <div class="message main-padding-lr">
        <div class="box border-top border-btm">
          <p class="title fz28">买家留言：</p>
          <p class="fz28">无</p>
        </div>
      </div>
      <div class="total-price main-padding-lr">
        <p class="fz24">合计</p>
        <p class="fz24 main-color">￥318.00</p>
      </div>
    </div>
  </div>

  <div class="money-count main-padding-lr bg-fff">
    <ul>
      <li>
        <p class="fz28">商品金额</p>
        <p class="fz28 fc-666">￥318.00</p>
      </li>
      <li>
        <p class="fz28">运费</p>
        <p class="fz28 fc-666">￥0.00</p>
      </li>
      <li>
        <p class="fz28">优惠</p>
        <p class="fz28 fc-666">-￥30.00</p>
      </li>
      <li>
        <p class="fz28">余额</p>
        <p class="fz28 fc-666">-￥33.00</p>
      </li>
      <li class="border-top li-padding-top">
        <p class="fz28">实付金额</p>
        <p class="fz28 main-color">￥255.00</p>
      </li>
      <li>
        <p class="fz28">支付方式</p>
        <p class="fz28 fc-666">微信支付</p>
      </li>
    </ul>
  </div>
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
/** 局部样式 **/
$val:20rpx;
.oder-detail{
  padding-top: $val;
  background-color: #ededed;
  .order{
    .head{
      height: 80rpx;
      display: flex;
      align-items: center;
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
          width: 100%;
          position: relative;
          padding-left: 20rpx;
          padding-right: 150rpx;
          padding-top: $val;
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
    .delivery{
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      .box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        .title{
          position: absolute;
          top: 0;
          left: 0;
        }
        .price{
          margin-bottom: 20rpx;
        }
      }
    }
    .message{
      .box{
        display: flex;
        padding-top: 30rpx;
        padding-bottom: 30rpx;
        .title{
          white-space: nowrap;
        }
      }
    }
    .total-price{
      height: 72rpx;
      display: flex;
      align-items: center;
      justify-content: space-between
    }
  }
  .money-count{
    $top:30rpx;
    margin-top: $val;
    ul{
      padding-top: $top;
      li{
        &.li-padding-top{
          padding-top: $top;
        }
        padding-bottom: $top;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

</style>
<style lang='scss'>
/** 含有【待付款、待发货、待收货、申请退换、申请中、退换中等订单详情的】7个页面的样式 **/
$mainColor: #7fb414;
.orddet-head{
  background-color: #fff;
  background-image: url(../../static/img/address-bar.png);
  background-position:0 100%;
  background-repeat: repeat-x;
  background-size: 70rpx 3rpx;
  .state{
    padding-top: 30rpx;
    .iconfont-box{
      $val:57rpx;
      &::before,&::after{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        border: 1rpx solid #ccc;
        width: 230rpx;
      }
      &::before{
        left: $val;
      }
      &::after{
        right: $val;
      }
      margin-bottom:20rpx;
      margin-left: 22rpx;
      margin-right: 22rpx;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont{
        width: 14rpx;
        height: 14rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background-color: #ccc;
        color:#999;
        margin: 0 11rpx;
      }
      .iconfont.icon-gou{
        margin: 0;
        width: 36rpx;
        height: 36rpx;
        color: #fff;
        background-color: #7fb414;
      }
    }
    .three-way{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30rpx;
    }
  }
  .address{
    $top:30rpx;
    .box{
      position: relative;
      padding-left: 50rpx;
      padding-top: $top;
      padding-bottom: $top;
      .iconfont{
        position: absolute;
        top: $top;
        left: 0;
      }
      .name{
        margin-bottom: 10rpx;
      }
    }
  }
}
.info-time{
  $val:28rpx;
  padding-top:20rpx;
  background-color: #ededed;
  ul{
    padding-top:$val;
    li{
      padding-bottom:$val;
    }
  }
}

.foot-order{
  padding-top: 20rpx;
  background-color: #ededed;
  .box{
    height: 110rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn{
      padding: 0 30rpx;
      line-height: 50rpx;
      border-radius: 50rpx;
      border:1rpx solid $mainColor;
    }
  }
}
</style>