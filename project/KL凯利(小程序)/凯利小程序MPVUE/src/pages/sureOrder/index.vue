<template>
<!--确认订单-->
  <div class="container">
    <div class="address main-padding-lr border-top margin-btm">
      <a class="box" href="../addressReceive/main" hover-class="none">
        <i class="iconfont icon-dizhi-copy fz38 fc-666"></i>
        <p class="fz26 a-add" :class="{'active':hasAddress == false}">新增地址</p>
        <p class="fz26 a-name" :class="{'active':hasAddress == true}">收货人：刘小姐 &nbsp;&nbsp; 18012384090</p>
        <p class="fz24 fc-666 a-info" :class="{'active':hasAddress == true}">收货地址：广东省广州市天河区龙口西天信大夏1603</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>


    

    <div class="product bg-fff margin-btm">
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
          <textarea class="desc fz28" type="text" placeholder="点击给商家留言" maxlength="200" placeholder-class=".fc-999" auto-height="true"></textarea>
        </div>
      </div>
      <div class="total-price main-padding-lr">
        <p class="fz28">合计</p>
        <p class="fz28 main-color">￥318.00</p>
      </div>
    </div>

    <div class="coupon-balance main-padding-lr bg-fff margin-btm">
      <ul class="fz28">
        <li class="border-btm ico" @click="useCoupon()">
          <p>优惠</p>
          <p class="main-color">有一张可用</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </li>
        <li class="border-btm">
          <p>余额</p>
          <p class="main-color">可用：￥33.00</p>
        </li>
      </ul>
    </div>


    <div class="money-count main-padding-lr bg-fff margin-btm">
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
      </ul>
    </div>

    <div class="foot bg-fff">
      <p class="fz30 main-color main-padding-lr">应付金额：255.00</p>
      <p class="submit fz30 sub-bg fc-fff" @click="submitOrder()">提交订单</p>
    </div>


  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      hasAddress:false
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad:function(options){
    console.log(options)
    //小程序周期函数，获取url传递的参数
    if(options){
      //this.activeNum = options.activeNum;
    }
  },
  methods: {
    useCoupon(){
      wx.navigateTo({
        url: '../useCoupons/main'
      });
    },
    submitOrder(){
      wx.navigateTo({
        url: '../paymentSuccess/main'
      });
    }
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
  $height:110rpx;
  padding-bottom: $height;
  overflow: hidden;
  .address{
    $top:30rpx;
    background-color: #fff;
    background-image: url(../../../static/img/address-bar.png);
    background-position:0 100%;
    background-repeat: repeat-x;
    background-size: 70rpx 3rpx;
    .box{
      position: relative;
      padding-left: 50rpx;
      padding-right: 50rpx;
      padding-top: $top;
      padding-bottom: $top;
      min-height: 68rpx;
      .active{
        display: block !important;
      }
      .a-add ,.a-name ,.a-info{
        display:none;
      }
      .iconfont.icon-dizhi-copy{
        position: absolute;
        top: $top - 3rpx;
        left: 0;
      }
      .iconfont.icon-gengduo{
        position: absolute;
        top: $top;
        right: 0;
        margin-top: 5rpx;
      }
      .a-name{
        margin-bottom: 10rpx;
      }
    }
  }

  .product{
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
          }
        }
        .right{
          $val:10rpx;
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
        align-items: center;
        min-height: 70rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        .title{
          white-space: nowrap;
        }
        .desc{
          width: 100%;
          margin-left: 6rpx;
          position: relative;
          top: 2rpx;
        }
      }
    }
    .total-price{
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-between
    }
  }
  .coupon-balance{
    ul{
      li{
        &:nth-last-child(1){
          border-bottom: none;
        }
        &.ico{
          padding-right: 45rpx;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 90rpx;
        .iconfont{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .money-count{
    $top:30rpx;
    overflow: hidden;
    ul{
      margin-top: $top;
      li{
        margin-bottom: $top;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: $height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .submit{
      height: 100%;
      width: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;
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





