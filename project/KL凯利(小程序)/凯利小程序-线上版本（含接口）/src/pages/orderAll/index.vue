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
          <!--<p class="list fz28 fc-666 hide" :class="{'active':activeNum==5}" @click="activeNum=5">退货中</p>-->
        </div>
      </scroll-view>
    </div>
    
      <div class="order-sort" :class="{'active':activeNum==0}">
        <orderAll :oderType="activeNum"><!--全部订单--></orderAll>
      </div>

      <div class="order-sort" :class="{'active':activeNum==1}">
        <div class="wrap-orders">
          <ul class="order">
            <orderPayment @orderAllFn="childToParent" :item="item" v-for="(item,index) in orderArrPayment" :key="index"><!--待付款--></orderPayment>
          </ul>
        </div>
        <DropDownRefresh  ref="refreshPayment"><!--下拉刷新动画--></DropDownRefresh>
      </div>
      
      <div class="order-sort" :class="{'active':activeNum==2}">
        <div class="wrap-orders">
          <ul class="order">
            <orderSend @orderAllFn="childToParent" :item="item" v-for="(item,index) in orderArrSend" :key="index"><!--待发货--></orderSend>
          </ul>
        </div>
        <DropDownRefresh  ref="refreshSend"><!--下拉刷新动画--></DropDownRefresh>
      </div>

      <div class="order-sort" :class="{'active':activeNum==3}">
        <div class="wrap-orders">
          <ul class="order">
            <orderReceive @orderAllFn="childToParent" :item="item" v-for="(item,index) in orderArrReceive" :key="index"><!--待收货--></orderReceive>
          </ul>
        </div>
        <DropDownRefresh  ref="refreshReceive"><!--下拉刷新动画--></DropDownRefresh>
      </div>

      <div class="order-sort" :class="{'active':activeNum==4}">
        <div class="wrap-orders">
          <ul class="order">
            <orderEvaluation @orderAllFn="childToParent" :item="item" v-for="(item,index) in orderArrEvaluation" :key="index"><!--待评价--></orderEvaluation>
          </ul>
        </div>
        <DropDownRefresh  ref="refreshEvaluation"><!--下拉刷新动画--></DropDownRefresh>
      </div>

      <div class="order-sort" :class="{'active':activeNum==5}">
        <div class="wrap-orders">
          <ul class="order">
            <orderReturn @orderAllFn="childToParent" :item="item" v-for="(item,index) in orderArrReturn" :key="index"><!--退货中--></orderReturn>
          </ul>
        </div>
        <DropDownRefresh  ref="refreshReturn"><!--下拉刷新动画--></DropDownRefresh>
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
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision'
export default {
  name:'oderAllName',
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      activeNum:0,
      curpagePayment:1,
      pagesizePayment:10,
      orderArrPayment:[],
      curpageSend:1,
      pagesizeSend:10,
      orderArrSend:[],
      curpageReceive:1,
      pagesizeReceive:10,
      orderArrReceive:[],
      curpageEvaluation:1,
      pagesizeEvaluation:10,
      orderArrEvaluation:[],
      curpageReturn:1,
      pagesizeReturn:10,
      orderArrReturn:[]
    }
  },
  onLoad:function(options){
    //console.log(options)
    //小程序周期函数，获取url传递的参数
    if(options.activeNum){
      this.activeNum = options.activeNum;
    }
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.activeNum==1){
      //待付款
      this.curpagePayment += 1;
      this.getOrderPayment();
    }else if(this.activeNum==2){
      //待发货
      this.curpageSend += 1;
      this.getOrderSend();
    }else if(this.activeNum==2){
      //待收货
      this.curpageReceive += 1;
      this.getOrderReceive();
    }else if(this.activeNum==2){
      //待评价
      this.curpageEvaluation += 1;
      this.getOrderEvaluation();
    }else if(this.activeNum==2){
      //退货中
      this.curpageReturn += 1;
      this.getOrderReturn();
    }
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
      //this.init();//进入页面不会刷新数据，与onShow同时使用会导致数据重复
      //console.log('mounted',this.orderArrPayment,this.orderArrSend,this.orderArrReceive);
    });
  },
  onShow(){
    //每次进入页面都会刷新数据，判断条件是处理第一次进入该页面没加载组件报错的问题
    /*let setIval = setInterval(()=>{
      if(Object.keys(this.$refs).length != 0){
        this.init();
        clearInterval(setIval);
      }
    },30);*/
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  computed:{
    
  },
  components: {
    orderAll,orderPayment,orderSend,orderReceive,orderEvaluation,orderReturn,DropDownRefresh
  },
  methods: {
    childToParent(){
      console.log('子组件触发oderAll父页面的方法：childToParent')
      this.init();
    },
    async init(){
      //确认付款、取消订单、确认收货、评价、申请退换货、取消退换货-等都会刷新页面这些函数
      this.curpagePayment = 1;
      this.pagesizePayment = 10;
      this.orderArrPayment = [];
      this.curpageSend = 1;
      this.pagesizeSend = 10;
      this.orderArrSend = [];
      this.curpageReceive = 1;
      this.pagesizeReceive = 10;
      this.orderArrReceive = [];
      this.curpageEvaluation = 1;
      this.pagesizeEvaluation = 10;
      this.orderArrEvaluation = [];
      this.curpageReturn = 1;
      this.pagesizeReturn = 10;
      this.orderArrReturn = [];
      await this.getOrderPayment();
      await this.getOrderSend();
      await this.getOrderReceive();
      await this.getOrderEvaluation();
      await this.getOrderReturn();
    },
    getOrderPayment(){
      //待付款
      return new Promise((resolve,reject)=>{
        this.$refs.refreshPayment.show();
        var urlData = {
          'ActionName':'myOrderList',
          'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
          'orderStata':1, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
          'pagesize':this.pagesizePayment,
          'curpage':this.curpagePayment,
          'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
        };
        this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
          if(res.data.msg == 0){
            this.$refs.refreshPayment.hide();
            this.$refs.refreshPayment.notMore();
            resolve(true);
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
            this.orderArrPayment = this.orderArrPayment.concat(data);
            this.$refs.refreshPayment.hide();
            resolve(true);
          }else if(res.data.msg == 2){
            this.$refs.refreshPayment.hide();
            this.$alert(res.data.msgbox);//数据获取失败
            resolve(true);
          }
        });
      });
    },
    getOrderSend(){
      //待发货
      return new Promise((resolve,reject)=>{
        this.$refs.refreshSend.show();
        var urlData = {
          'ActionName':'myOrderList',
          'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
          'orderStata':2, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
          'pagesize':this.pagesizeSend,
          'curpage':this.curpageSend,
          'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
        };
        this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
          if(res.data.msg == 0){
            this.$refs.refreshSend.hide();
            this.$refs.refreshSend.notMore();
            resolve(true);
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
            this.orderArrSend = this.orderArrSend.concat(data);
            this.$refs.refreshSend.hide();
            resolve(true);
          }else if(res.data.msg == 2){
            this.$refs.refreshSend.hide();
            this.$alert(res.data.msgbox);//数据获取失败
            resolve(true);
          }
        });
      });
    },
    getOrderReceive(){
      //待收货
      return new Promise((resolve,reject)=>{
      this.$refs.refreshReceive.show();
        var urlData = {
          'ActionName':'myOrderList',
          'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
          'orderStata':3, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
          'pagesize':this.pagesizeReceive,
          'curpage':this.curpageReceive,
          'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
        };
        this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
          if(res.data.msg == 0){
            this.$refs.refreshReceive.hide();
            this.$refs.refreshReceive.notMore();
            resolve(true);
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
            this.orderArrReceive = this.orderArrReceive.concat(data);
            this.$refs.refreshReceive.hide();
            resolve(true);
          }else if(res.data.msg == 2){
            this.$refs.refreshReceive.hide();
            this.$alert(res.data.msgbox);//数据获取失败
            resolve(true);
          }
        });
      });
    },
    getOrderEvaluation(){
      //待评价
      return new Promise((resolve,reject)=>{
        this.$refs.refreshEvaluation.show();
        var urlData = {
          'ActionName':'myOrderList',
          'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
          'orderStata':4, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
          'pagesize':this.pagesizeEvaluation,
          'curpage':this.curpageEvaluation,
          'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
        };
        this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
          if(res.data.msg == 0){
            this.$refs.refreshEvaluation.hide();
            this.$refs.refreshEvaluation.notMore();
            resolve(true);
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
            this.orderArrEvaluation = this.orderArrEvaluation.concat(data);
            this.$refs.refreshEvaluation.hide();
            resolve(true);
          }else if(res.data.msg == 2){
            this.$refs.refreshEvaluation.hide();
            this.$alert(res.data.msgbox);//数据获取失败
            resolve(true);
          }
        });
      });
    },
    getOrderReturn(){
      //退货中
      return new Promise((resolve,reject)=>{
        this.$refs.refreshReturn.show();
        var urlData = {
          'ActionName':'myOrderList',
          'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
          'orderStata':5, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
          'pagesize':this.pagesizeReturn,
          'curpage':this.curpageReturn,
          'refundStatus': 0 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
        };
        this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
          if(res.data.msg == 0){
            this.$refs.refreshReturn.hide();
            this.$refs.refreshReturn.notMore();
            resolve(true);
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
            this.orderArrReturn = this.orderArrReturn.concat(data);
            this.$refs.refreshReturn.hide();
            resolve(true);
          }else if(res.data.msg == 2){
            this.$refs.refreshReturn.hide();
            this.$alert(res.data.msgbox);//数据获取失败
            resolve(true);
          }
        });
      });
    }
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
      width: 100%;
      @at-root .box{
        white-space: nowrap;
        display: inline-block;
        display: flex;
        justify-content: space-between;
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





