<template>
  <div class="container bg-fff">
    <!--订单详情  退换货-申请中-->
    <div class="orddet-head">
      <div class="state main-padding-lr">
        <div class="iconfont-box">
          <i class="iconfont icon-gou fz18"></i>
          <i class="iconfont fz18"></i>
          <i class="iconfont fz18"></i>
        </div>
        <div class="three-way border-btm">
          <p class="fz20">申请中</p>
          <p class="fz20 fc-999">退换中</p>
          <p class="fz20 fc-999">已退款</p>
        </div>
      </div>
      <div class="address main-padding-lr">
        <a class="box border-btm" href="" hover-class="none">
          <i class="iconfont icon-kuaidi fz38 fc-666"></i>
          <p class="fz26 name main-color">邮政快递&nbsp;&nbsp; 运单编号：6548712456487</p>
          <p class="fz24 fc-666">货地址：广东省广州市天河区龙口西天信大夏1603</p>
        </a>
        <a class="box" href="" hover-class="none">
          <i class="iconfont icon-dizhi-copy fz38 fc-666"></i>
          <p class="fz26 name">收货人：刘小姐 &nbsp;&nbsp; 18012384090</p>
          <p class="fz24 fc-666">收货地址：广东省广州市天河区龙口西天信大夏1603</p>
        </a>
      </div>
    </div>

    <orderDetail></orderDetail>

    <div class="info-time">
      <ul class="main-padding-lr bg-fff fz28">
        <li class="fc-999">订单编号：54560454521354</li>
        <li class="fc-999">创建时间：2018-05-09  14:25：56</li>
        <li class="fc-999">付款时间：2018-05-09  14:25：59</li>
        <li class="fc-999">发货时间：2018-05-09  13:25:59</li>
        <li class="fc-999">成交时间：2018-05-12  19:35:00</li>
      </ul>
    </div>

    <div class="foot-order">
      <div class="box bg-fff main-padding-lr">
        <p class="btn fz28 main-color">取消退换货</p>
      </div>
    </div>


  </div>
</template>

<script>
import orderDetail from '@/components/orderDetail'

export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    orderDetail
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





