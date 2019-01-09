<template>
<!--全部订单-->
<div class="container">
  <div class="wrap-orders" v-for="(item,index) in orderArrAll" :key="index">
    <ul class="order">
      <orderPayment @orderAllFn="init" :item="item.Status == '未处理' ? item:null">{{item.Status}}<!--待付款--></orderPayment>
      <orderSend @orderAllFn="init" :item="item.Status == '处理中' ? item:null"><!--待发货--></orderSend>
      <orderReceive @orderAllFn="init" :item="item.Status == '备货中' || item.Status == '已发货' ? item:null"><!--待收货--></orderReceive>
      <orderEvaluation @orderAllFn="init" :item="item.Status == '待评价' ? item:null"><!--待评价--></orderEvaluation>
      <orderReturn @orderAllFn="init" :item="item.Status == '申请退货' ? item:null"><!--退货中--></orderReturn>
      <orderComplete @orderAllFn="init" :item="item.Status == '已完成' ? item:null"><!--已完成--></orderComplete>
      <orderVoid @orderAllFn="init" :item="item.Status == '已作废' ? item:null"><!--已作废--></orderVoid>
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
import orderComplete from '@/components/orderComplete'
import orderVoid from '@/components/orderVoid'
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision'
export default {
  props: ['oderType'],
  data(){
    return{
      url:this.$url,
      curpageAll:1,
      pagesizeAll:10,
      orderArrAll:[]
    }
  },
  components: {
    orderPayment,orderSend,orderReceive,orderEvaluation,orderReturn,orderComplete,orderVoid,DropDownRefresh
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.oderType==0){
      this.curpageAll += 1;
      this.getOrderAll();
    }
  },
  onShow(){
    
  },
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.init();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.init();
    });
  },
  methods:{
    init(){
      this.orderArrAll = [];
      this.curpageAll = 1;
      this.getOrderAll();
      console.log('公共组件components-orderAll:子组件触发父组件的方法--取消订单');
    },
    getOrderAll(){
      this.$refs.refreshAll.show();
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
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
            element.IsJFBuy = element.OrderCode.split("")[0] == "I" ? true : false;
            if(element.IsJFBuy)return;
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
$mainColor: #7fb414;

</style>
<style lang='scss'>

</style>