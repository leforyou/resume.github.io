<template>
<!--退货中-->
    <li class="list bg-fff margin-top" v-if="item">
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
        <p class="fz24 main-color">{{item.Total0}}<!--￥318.00--></p>
      </div>
      <div class="foot main-padding-lr">
        <div class="foot-box border-top">
          <p class="fz22 btn green-btn" @click="cancelReturn()">取消退换货</p>
        </div>
      </div>
    </li>
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
    //小程序函数----页面上拉触底事件的处理函数
    
  },
  onShow(){
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      
    });
  },
  methods:{
    async cancelReturn(){
      //取消退换货
      let flag = await this.$modal('你确认要取消退换货吗？');
      if(flag == false)return;
      var urlData = {
        'ActionName':'updateorderByquxiaotuihuo',
        'orderid':this.item.ID
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
    }
  }
}
</script>

<style lang='scss' scoped>
/** 该组件在样式在【orderAlls.vue】的页面中 **/

</style>