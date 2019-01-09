<template>
  <div class="container">
    <!--全部订单-->
    <!--订单的导航标题-->
    <div class="order-head bg-fff">
      <scroll-view scroll-x>
        <div class="box main-padding-lr">
          <p class="list fz28 fc-666" :class="{'active':activeNum==0}" @click="activeNum=0">全部</p>
          <p class="list fz28 fc-666" :class="{'active':activeNum==1}" @click="activeNum=1">待付款</p>
          <p class="list fz28 fc-666" :class="{'active':activeNum==2}" @click="activeNum=2">待发货</p>
          <p class="list fz28 fc-666" :class="{'active':activeNum==3}" @click="activeNum=3">待收货</p>
          <p class="list fz28 fc-666" :class="{'active':activeNum==4}" @click="activeNum=4">待评价</p>
          <p class="list fz28 fc-666" :class="{'active':activeNum==5}" @click="activeNum=5">退货中</p>
        </div>
      </scroll-view>
    </div>
    

      <div class="order-sort" :class="{'active':activeNum==0}">
        <orderAll><!--全部订单--></orderAll>
      </div>
      <div class="order-sort" :class="{'active':activeNum==1}">
        <orderPayment><!--待付款--></orderPayment>
      </div>
      <div class="order-sort" :class="{'active':activeNum==2}">
        <orderSend><!--待发货--></orderSend>
      </div>
      <div class="order-sort" :class="{'active':activeNum==3}">
        <orderReceive><!--待收货--></orderReceive>
      </div>
      <div class="order-sort" :class="{'active':activeNum==4}">
        <orderEvaluation><!--待评价--></orderEvaluation>
      </div>
      <div class="order-sort" :class="{'active':activeNum==5}">
        <orderReturn><!--退货中--></orderReturn>
      </div>

  </div>
</template>

<script>
import orderAll from '@/components/orderAll'
import orderPayment from '@/components/orderPayment'
import orderSend from '@/components/orderSend'
import orderReceive from '@/components/orderReceive'
import orderEvaluation from '@/components/orderEvaluation'
import orderReturn from '@/components/orderReturn'

export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      activeNum:0
    }
  },
  onLoad:function(options){
    //console.log(options)
    //小程序周期函数，获取url传递的参数
    if(options.activeNum){
      this.activeNum = options.activeNum;
    }
  },
  computed:{
    
  },
  components: {
    orderAll,orderPayment,orderSend,orderReceive,orderEvaluation,orderReturn
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
  padding-top: $height;
  .order-head{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    @at-root scroll-view{
      widows: 100%;
      @at-root .box{
        white-space: nowrap;
        display: inline-block;
        @at-root .list{
          &:nth-last-child(1){
            margin-right: 0;
          }
          &.active{
            color: $mainColor;
            border-bottom:3rpx solid $mainColor;
          }
          height: $height;
          line-height: $height;
          display: inline-block;
          margin-right: 60rpx;
          position: relative;
        }
      }
    }
  }
  .order-sort{
    &.active{
      display: block;
    }
    display: none;
  }
}
</style>


<style lang='scss'>
/**待付款/待发货/待收货/待评价/退货中 各组件的公共样式**/
$mainColor: #7fb414;
page{
  height:100%;
  background-color: #ededed;
}
.wrap-orders{
  .order{
    .head{
      height: 80rpx;
      display: flex;
      justify-content: space-between;
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
      .foot-box{
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn{
          line-height: 50rpx;
          padding: 0 26rpx;
          margin-left: 30rpx;
          border-radius: 50rpx;
        }
        .black-btn{
          border: 1rpx solid #999;
          color: #333;
        }
        .green-btn{
          border: 1rpx solid $mainColor;
          color: $mainColor;
        }
      }
    }
  }
}
</style>





