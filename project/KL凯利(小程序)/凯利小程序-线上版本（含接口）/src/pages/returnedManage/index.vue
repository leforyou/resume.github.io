<template>
  <div class="container">
    <!--退换管理-->
    <div class="head-nav bg-fff main-padding-lr">
      <div class="box">
        <p class="fz28 fc-666" :class="{'active':tabNum==0}" @click="tabNum=0">申请中</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==1}" @click="tabNum=1">退换中</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==2}" @click="tabNum=2">已完成</p>
      </div>
    </div>

    <div class="content">

      <div class="wrap-orders application" :class="{'active':tabNum==0}">
        <!--申请中-->
        <ul class="order">
          <li class="list bg-fff margin-top" v-for="(item,index) in arr1" :key="index">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：{{item.OrderCode}}</p>
              <p class="main-color">等待商家审核</p>
            </div>
            <a class="content main-padding-lr" :href="'../orderReturnedApplying/main?orderid='+item.ID" hover-class="none">
              <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
                <div class="left">
                  <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">{{list.ProductName}}<!--瀛橘天香 橘红普洱--></p>
                  <p class="price fz28">￥{{list.Price}}<!--￥318.00--></p>
                  <p class="num fz28 fc-999">x{{list.Num}}<!--x1--></p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥{{item.Total0}}<!--￥318.00--></p>
            </div>
            <div class="foot main-padding-lr">
              <div class="foot-box border-top">
                <p class="fz22 btn green-btn" @click="cancelReturn(item)">取消退换货</p>
              </div>
            </div>
          </li>
        </ul>
        <DropDownRefresh ref="refresh1"><!--下拉刷新动画--></DropDownRefresh>
      </div>

      <div class="wrap-orders returned" :class="{'active':tabNum==1}">
        <!--退换中-->
        <ul class="order">
          <li class="list bg-fff margin-top" v-for="(item,index) in arr2" :key="index">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：{{item.OrderCode}}</p>
              <p class="main-color" v-if="item.Status == '同意退货'">商家同意退货</p>
              <!--<p class="main-color" v-if="item.Status == '退货中'">退货中</p>-->
              <p class="main-color" v-if="item.Status == '商家收货' || item.Status == '退货中'">等待商家收货</p>
            </div>
            <a class="content main-padding-lr" :href="'../orderReturnedIng/main?orderid='+item.ID" hover-class="none">
              <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
                <div class="left">
                  <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">{{list.ProductName}}<!--瀛橘天香 橘红普洱--></p>
                  <p class="price fz28">￥{{list.Price}}<!--￥318.00--></p>
                  <p class="num fz28 fc-999">x{{list.Num}}<!--x1--></p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥318.00</p>
            </div>
            <div class="foot main-padding-lr" v-if="item.Status == '同意退货'">
              <div class="foot-box border-top">
                <a :href="'../returnedInfo/main?orderid='+item.ID" class="fz22 btn green-btn">填写信息<!--填写退货信息--></a>
              </div>
            </div>
          </li>
        </ul>
        <DropDownRefresh ref="refresh2"><!--下拉刷新动画--></DropDownRefresh>
      </div>

      <div class="wrap-orders completed" :class="{'active':tabNum==2}">
        <!--已完成-->
        <ul class="order">
          <li class="list bg-fff margin-top" v-for="(item,index) in arr3" :key="index">
            <div class="head main-padding-lr fz24">
              <p class="fc-999">订单编号：{{item.OrderCode}}</p>
              <p class="main-color">交易完成</p>
            </div>
            <a class="content main-padding-lr" :href="'../orderReturnedComplete/main?orderid='+item.ID" hover-class="none">
              <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
                <div class="left">
                  <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
                </div>
                <div class="right">
                  <p class="title fz28 ellipsis2">{{list.ProductName}}<!--瀛橘天香 橘红普洱--></p>
                  <p class="price fz28">￥{{list.Price}}<!--￥318.00--></p>
                  <p class="num fz28 fc-999">x{{list.Num}}<!--x1--></p>
                </div>
              </div>
            </a>
            <div class="total-price main-padding-lr">
              <p class="fz24">合计：</p>
              <p class="fz24 main-color">￥{{item.Total0}}<!--￥318.00--></p>
            </div>
          </li>
        </ul>
        <DropDownRefresh ref="refresh3"><!--下拉刷新动画--></DropDownRefresh>
      </div>

    </div>
  </div>
</template>

<script>
//import orderAll from '../orderAll/index' /**导入该组件【orderAll.vue】主要是使用它的css样式，我的订单(详情)与退换管理的布局基本是一致**/
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision' 
export default {
  data () {
    return {
      url:this.$url,
      tabNum:0,
      curpage1:1,
      pagesize1:10,
      arr1:[],
      curpage2:1,
      pagesize2:10,
      arr2:[],
      curpage3:1,
      pagesize3:10,
      arr3:[]
    }
  },
  computed:{
    
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.tabNum == 0){
      this.curpage1 += 1;
      this.getData1();
    }else if(this.tabNum == 1){
      this.curpage2 += 1;
      this.getData2();
    }else if(this.tabNum == 2){
      this.curpage3 += 1;
      this.getData3();
    }
  },
  mounted(){
    this.$nextTick(function () {
      
    });
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
    /*let setIval = setInterval(()=>{
      if(this.$refs.refresh1 != undefined){
        this.init();
        clearInterval(setIval);
      }
    },30);*/
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  components: {
    DropDownRefresh
  },
  methods: {
    init(){
      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.curpage1 = 1;
      this.curpage2 = 1;
      this.curpage3 = 1;
      this.getData1();
      this.getData2();
      this.getData3();
    },
    getData1(){
      //申请中
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
        'orderStata':5, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
        'pagesize':this.pagesize1,
        'curpage':this.curpage1,
        'refundStatus': 1 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.Total0 = NP.plus(element.Total0,0).toFixed(2);
            element.itemrows.forEach(item => {
              item.Price = NP.plus(item.Price,0).toFixed(2);
            });
          });
          this.arr1 = this.arr1.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getData2(){
      //退换中
      this.$refs.refresh2.show();
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
        'orderStata':5, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
        'pagesize':this.pagesize2,
        'curpage':this.curpage2,
        'refundStatus': 2 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh2.hide();
          this.$refs.refresh2.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.Total0 = NP.plus(element.Total0,0).toFixed(2);
            element.itemrows.forEach(item => {
              item.Price = NP.plus(item.Price,0).toFixed(2);
            });
          });
          this.arr2 = this.arr2.concat(data);
          this.$refs.refresh2.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh2.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getData3(){
      //已完成
      this.$refs.refresh3.show();
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
        'orderStata':5, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
        'pagesize':this.pagesize3,
        'curpage':this.curpage3,
        'refundStatus': 3 //用于退货管理： 0:默认没有条件 1：申请退货 2 退货中 3：完成退货
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh3.hide();
          this.$refs.refresh3.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.Total0 = NP.plus(element.Total0,0).toFixed(2);
            element.itemrows.forEach(item => {
              item.Price = NP.plus(item.Price,0).toFixed(2);
            });
          });
          this.arr3 = this.arr3.concat(data);
          this.$refs.refresh3.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh3.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    async cancelReturn(item){
      //取消退换货
      let flag = await this.$modal('你确认要取消退换货吗？');
      if(!flag)return;
      var urlData = {
        'ActionName':'updateorderByquxiaotuihuo',
        'orderid':item.ID
      };
      this.$http.get('post/postMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);//数据获取失败
        }else if(res.data.msg == 1){
          this.$alert(res.data.msgbox);
          this.init();
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
        }
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
  overflow: hidden;
  padding-top: $height;
  .head-nav{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $height;
      p{
        $val:50rpx;
        &.active{
          &::after{
            content: "";
            display: block;
            position: absolute;
            left: $val+10;
            right: $val+10;
            bottom: 0;
            border-bottom: 3rpx solid $mainColor;
          }
          color: $mainColor;
        }
        height: 100%;
        padding: 0 $val;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }
  .content{
    .wrap-orders{
      &.active{
        display: block;
      }
      display: none;
    }
  }
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



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





