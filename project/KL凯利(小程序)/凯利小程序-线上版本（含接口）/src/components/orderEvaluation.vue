<template>
<!--待评价-->
  <div v-if="item">
    <li class="list bg-fff margin-top" v-if="item.IsJFBuy == false">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：{{item.OrderCode}}</p>
        <p class="main-color">等待买家评价</p>
      </div>
      <a class="content main-padding-lr" :href="'../orderDetailComplete/main?orderid='+item.ID" hover-class="none">
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
          <a v-if="returnedState" :href="'../returnedReason/main?ProductName='+item.itemrows[0].ProductName+'&Total0='+item.Total0+'&OrderCode='+item.OrderCode+'&ID='+item.ID+'&TimeFd4='+item.TimeFd4" class="fz22 btn black-btn" hover-class="none">申请退换货</a>
          <a :href="'../sendEvaluation/main?PID='+PIDS+'&ordercode='+item.OrderCode" class="fz22 btn green-btn" hover-class="none">去评价</a>
        </div>
      </div>
    </li>

    <li class="list bg-fff margin-top" v-if="item.IsJFBuy == true">
      <div class="head main-padding-lr fz24">
        <p class="fc-999">订单编号：{{item.OrderCode}}</p>
        <p class="main-color">等待买家评价</p>
      </div>
      <a class="content main-padding-lr" :href="'../orderDetailComplete/main?orderid='+item.ID" hover-class="none">
        <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
          <div class="left">
            <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
          </div>
          <div class="right">
            <p class="title fz28 ellipsis2">{{list.ProductName}}<!--瀛橘天香 橘红普洱--></p>
            <p class="price fz28">{{list.Price}}<!--￥318.00--></p>
            <p class="num fz28 fc-999">x{{list.Num}}<!--x1--></p>
          </div>
        </div>
      </a>
      <div class="total-price main-padding-lr">
        <p class="fz24">积分：</p>
        <p class="fz24 main-color">{{item.Total0}}<!--￥318.00--></p>
      </div>
      <div class="foot main-padding-lr">
        <div class="foot-box border-top">
          <a v-if="returnedState" :href="'../returnedReason/main?ProductName='+item.itemrows[0].ProductName+'&Total0='+item.Total0+'&OrderCode='+item.OrderCode+'&ID='+item.ID+'&TimeFd4='+item.TimeFd4" class="fz22 btn black-btn" hover-class="none">申请退换货</a>
          <a :href="'../sendEvaluation/main?PID='+PIDS+'&ordercode='+item.OrderCode" class="fz22 btn green-btn" hover-class="none">去评价</a>
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
      url:this.$url,
      PIDS:[],
      returnedState:false
    }
  },
  components: {
    
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    
  },
  onShow(){
    
  },
  onLoad(){

  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      //console.log('评价组件',this.item);
      if(this.item==null)return;
      let arr = [];
      let timeReceive = this.item.TimeFd3;//收货时间["2018/7/27 16:17:31"]
      timeReceive = new Date(timeReceive);//日期转时间戳（毫秒）
      let timeNow = (new Date()).getTime();//获取当前时间戳（毫秒）
      //console.log('timeNow:  ',timeNow,'timeReceive:  ',timeReceive,timeNow - timeReceive,timeNow - timeReceive < 259200000)
      if(timeNow - timeReceive < 259200000){ //三天的毫秒数 3*24*60*60*1000 = 259200000
        this.returnedState = true;
      }else{
        this.returnedState = false;
      }
      this.item.itemrows.forEach(element => {
        arr.push(element.ProductID);
      });
      this.PIDS = arr.join(',');
    });
  },
  methods:{
    
  }
}
</script>

<style lang='scss' scoped>
/** 该组件在样式在【orderAlls.vue】的页面中 **/

</style>