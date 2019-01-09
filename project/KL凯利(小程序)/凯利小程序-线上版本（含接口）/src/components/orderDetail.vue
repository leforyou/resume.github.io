<template>
<!--订单详情-->
<div class="oder-detail">
  <div class="order bg-fff">
    <div class="box">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：{{order.OrderCode}}</p>
      </div>
      <div class="content main-padding-lr" hover-class="none">
        <div class="content-box" v-for="(item,index) in order.itemrows" :key="index">
          <div class="left">
            <img class="img" v-if="url" :src="url+item.ProductImg" mode="aspectFill">
          </div>
          <div class="right">
            <p class="title fz28 ellipsis2">{{item.ProductName}}<!--瀛橘天香  橘红普洱--></p>
            <p class="price fz28">￥{{item.Price}}<!--￥318.00--></p>
            <p class="num fz28 fc-999">x{{item.Num}}<!--x1--></p>
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
          <p class="fz28">{{order.Remark}}</p>
        </div>
      </div>
      <div class="total-price main-padding-lr">
        <p class="fz24">合计</p>
        <p class="fz24 main-color">{{order.Total0}}<!--￥318.00--></p>
      </div>
    </div>
  </div>

  <div class="money-count main-padding-lr bg-fff">
    <ul>
      <li>
        <p class="fz28">商品金额</p>
        <p class="fz28 fc-666">{{order.Total0}}<!--￥318.00--></p>
      </li>
      <li>
        <p class="fz28">运费</p>
        <p class="fz28 fc-666">￥0.00</p>
      </li>
      <li>
        <p class="fz28">优惠</p>
        <p class="fz28 fc-666">-{{order.DecFd4}}<!---￥30.00--></p>
      </li>
      <li>
        <p class="fz28">会员折扣</p>
        <p class="fz28 fc-666">-{{order.WDecFd1}}<!---￥33.00--></p>
      </li>
      <li>
        <p class="fz28">余额支付</p>
        <p class="fz28 fc-666">-{{order.DecFd5}}<!---￥33.00--></p>
      </li>
      <li class="border-top li-padding-top">
        <p class="fz28">实付现金</p>
        <p class="fz28 main-color">{{order.Total}}<!--￥255.00--></p>
      </li>
      <li>
        <p class="fz28">支付方式</p>
        <p class="fz28 fc-666">{{order.PayWay}}<!--微信支付--></p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import NP from 'number-precision'
export default {
  props: ['order'],
  data(){
    return{
      url:this.$url,
      obj:{}
    }
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.order.Total = NP.plus(this.order.Total, 0).toFixed(2);
      this.order.Total0 = NP.plus(this.order.Total0, 0).toFixed(2);
      this.order.WDecFd1 = NP.plus(this.order.WDecFd1, 0).toFixed(2);//会员折扣
      this.order.DecFd4 = NP.plus(this.order.DecFd4, 0).toFixed(2);
      this.order.DecFd5 = NP.plus(this.order.DecFd5, 0).toFixed(2);
      this.order.itemrows.forEach(element => {
        element.Price = NP.plus(element.Price, 0).toFixed(2);
      });
    });
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
      .content-box{
        padding-bottom: 10rpx;
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