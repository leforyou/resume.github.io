<!--我的团购-订单-->
<template>
<!--全部订单-->
<div class="container">
  <div class="wrap-orders" v-for="(item,index) in orderArrAll" :key="index">
    <ul class="order">
      <orderPayment :item="item.Status == '未处理' ? item:null">{{item.Status}}<!--待付款--></orderPayment>
      <orderSend :item="item.Status == '处理中' ? item:null"><!--待发货--></orderSend>
      <orderReceive :item="item.Status == '备货中' || item.Status == '已发货' ? item:null"><!--待收货--></orderReceive>
      <orderEvaluation :item="item.Status == '待评价' || item.Status == '已完成' ? item:null"><!--待评价--></orderEvaluation>
      <orderReturn :item="item.Status == '申请退货' ? item:null"><!--退货中--></orderReturn>
    </ul>
  </div>
  <DropDownRefresh  ref="refreshAll"><!--下拉刷新动画--></DropDownRefresh>

</div>
</template>

<script>
import orderPayment from '@/components/orderPayment'
import orderSend from '@/components/orderSend'
import orderReceive from '@/components/orderReceive'
import orderEvaluation from '@/components/orderEvaluation'
import orderReturn from '@/components/orderReturn'
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision'
export default {
  props: [''],
  data(){
    return{
      url:this.$url,
      curpageAll:1,
      pagesizeAll:10,
      orderArrAll:[]
    }
  },
  components: {
    orderPayment,orderSend,orderReceive,orderEvaluation,orderReturn,DropDownRefresh
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    //if(this.oderType==1){
      this.curpageAll += 1;
      this.getOrderAll();
    //}
  },
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.init();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
  },
  onShow(){
    //每次进入页面都会刷新数据，判断条件是处理第一次进入该页面没加载组件报错的问题
    /*let setIval = setInterval(()=>{
      if(this.$refs.refreshAll != undefined){
        this.init();
        clearInterval(setIval);
      }
    },30);*/
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      
    });
  },
  methods:{
    init(){
      this.orderArrAll = [];
      this.curpageAll = 1;
      this.getOrderAll();
    },
    getOrderAll(){
      this.$refs.refreshAll.show();
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'2',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
        'orderStata':0, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
        'pagesize':this.pagesizeAll,
        'curpage':this.curpageAll,
        'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
      };
      this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          this.$refs.refreshAll.hide();
          this.$refs.refreshAll.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.Total0 = NP.plus(element.Total0,0).toFixed(2);
            element.itemrows.forEach(item => {
              item.Price = NP.plus(item.Price,0).toFixed(2);
            });
          });
          this.orderArrAll = this.orderArrAll.concat(data);
          this.$refs.refreshAll.hide();
        }else if(res.data.msg == 2){
          this.$refs.refreshAll.hide();
          this.$alert(res.data.msgbox);//数据获取失败
        }
      });
    }
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



<style lang='scss'>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
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





