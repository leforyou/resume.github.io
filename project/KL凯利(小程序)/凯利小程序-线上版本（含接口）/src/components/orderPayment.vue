<template>
<!--待付款-->
  <div v-if="item">
    <li class="list bg-fff margin-top">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：{{item.OrderCode}}</p>
        <p class="main-color">等待买家付款</p>
      </div>
      <a class="content main-padding-lr" :href="'../orderDetailPayment/main?orderid='+item.ID" hover-class="none">
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
        <p class="fz24 main-color">{{item.Total0}}<!--￥318.00--></p>
      </div>
      <div class="foot main-padding-lr">
        <div class="foot-box border-top">
          <p class="fz22 btn black-btn" @click="cancelOrder(item)">取消订单</p>
          <p class="fz22 btn green-btn" @click="getWeixinPayValue(item)">确认付款</p>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import NP from 'number-precision'
export default {
  props: ['item'],
  data(){
    return{
      url:this.$url
    }
  },
  components: {
    
  },
  onReachBottom(){
    
  },
  onShow(){
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      
    });
  },
  methods:{
    async cancelOrder(item){
      //取消订单
      let flag = await this.$modal('你确认要取消该订单吗？');
      if(!flag)return;
      var urlData = {
        'ActionName':'updateorderByquxiao',
        'orderid':item.ID
      };
      this.$http.get('post/postMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);//数据获取失败
        }else if(res.data.msg == 1){
          this.$alert(res.data.msgbox);
          this.$emit('orderAllFn');//解发父组件事件函数
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
        }
      });
    },
    getWeixinPayValue(item){
      //获取微信支付的5个参数
      var urlData = {
        'ActionName':'weixinPay',
        'orderno':item.OrderCode, //订单号
        'total_fee':item.Total
      };
      this.$http.get('post/wxPay.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
         this.$alert('下单提交失败');
        }else if(res.data.msg == 1){
         this.pay(res.data);
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    pay(obj){
      //微信支付
      wx.requestPayment({
        'timeStamp': obj.timeStamp,
        'nonceStr': obj.nonceStr,
        'package': obj.package,
        'signType': obj.signType,
        'paySign': obj.paySign,
        'success':(res)=>{
          wx.navigateTo({
            url: '../paymentSuccess/main'
          });
        },
        'fail':async (res)=>{
          let flag = await this.$modal('你还没完成支付!');
          if(flag==true){
            
          }else{
            //wx.navigateBack();
          }
        }
      });
    }
  }
}
</script>

<style lang='scss' scoped>
/** 该组件在样式在【orderAlls.vue】的页面中 **/

</style>
