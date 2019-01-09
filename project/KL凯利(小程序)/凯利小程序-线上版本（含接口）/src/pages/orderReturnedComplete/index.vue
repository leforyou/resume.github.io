<template>
  <div class="container bg-fff">
    <!--订单详情  退换货-交易完成-->
    <div class="orddet-head">
      <div class="state main-padding-lr">
        <div class="iconfont-box">
          <i class="iconfont icon-gou fz18"></i>
          <i class="iconfont icon-gou fz18"></i>
          <i class="iconfont icon-gou fz18"></i>
        </div>
        <div class="three-way border-btm">
          <p class="fz20">申请中</p>
          <p class="fz20">退换中</p>
          <p class="fz20">已退款</p>
        </div>
      </div>
      <div class="address main-padding-lr">
        <a class="box border-btm hide" href="" hover-class="none">
          <i class="iconfont icon-kuaidi fz38 fc-666"></i>
          <p class="fz26 name main-color">邮政快递&nbsp;&nbsp; 运单编号：6548712456487</p>
          <p class="fz24 fc-666">货地址：广东省广州市天河区龙口西天信大夏1603</p>
        </a>
        <a class="box" href="" hover-class="none">
          <i class="iconfont icon-dizhi-copy fz38 fc-666"></i>
          <p class="fz26 name">收货人：{{order.Receiver}} &nbsp;&nbsp; {{order.Mobile}}</p>
          <p class="fz24 fc-666">收货地址：{{order.Address}}</p>
        </a>
      </div>
    </div>

    <orderDetail :order='order' v-if="order.IsJFBuy == false"></orderDetail>
    <orderDetailIntegral :order='order' v-if="order.IsJFBuy == true"></orderDetailIntegral>

    <div class="info-time">
      <ul class="main-padding-lr bg-fff fz28">
        <li class="fc-999">订单编号：{{order.OrderCode}}</li>
        <li class="fc-999">创建时间：{{order.TimeFd1}}</li>
        <li class="fc-999">付款时间：{{order.TimeFd2}}</li>
        <li class="fc-999">发货时间：{{order.TimeFd5}}</li>
        <li class="fc-999">成交时间：{{order.TimeFd3}}</li>
      </ul>
    </div>


  </div>
</template>

<script>
import orderDetail from '@/components/orderDetail'
import orderDetailIntegral from '@/components/orderDetailIntegral'

export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      orderid:0,
      order:{}
    }
  },
  computed:{
    
  },
  components: {
    orderDetail,orderDetailIntegral
  },
  onLoad:function(options){
    //console.log(options)
    //小程序周期函数，获取url传递的参数
    if(options.orderid){
      this.orderid = options.orderid;
      this.getOrderList();
    }
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      
    });
  },
  methods: {
    getOrderList(){
      var urlData = {
        'ActionName':'myOrderList',
        'IsGroup':'0',//0: 全部订单 1：O普通订单  2：G团购订单 3 I积分订单
        'orderStata':5, //0:没有此种条件查询   1:未付款   2:待发货   3:待收货    4:待评价    5:退货中
        'pagesize':100,
        'curpage':1,
        'orderid':this.orderid
      };
      this.$http.get('get/getMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);//数据获取失败
        }else if(res.data.msg == 1){
          let obj = res.data.rows[0];
          obj.TimeFd1 = obj.TimeFd1.replace(/\//g,"-");//创建时间
          obj.TimeFd2 = obj.TimeFd2.replace(/\//g,"-");//付款时间
          obj.TimeFd3 = obj.TimeFd3.replace(/\//g,"-");//收货时间
          obj.TimeFd4 = obj.TimeFd4.replace(/\//g,"-");//付款截止时间
          obj.TimeFd5 = obj.TimeFd5.replace(/\//g,"-");//发货时间
          obj.TimeFd6 = obj.TimeFd6.replace(/\//g,"-");//退款时间
          obj.TimeFd7 = obj.TimeFd7.replace(/\//g,"-");//备货时间
          obj.IsJFBuy = obj.OrderCode.split("")[0] == "I" ? true : false;
          this.order = obj;
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
/**部分css样式在【orderDetail】组件中**/
.container{
  margin-bottom: 20rpx;
}
</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





