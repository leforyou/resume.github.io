<template>
<!--个人中心-->
  <div class="container">
    <div class="person margin-top main-padding-lr bg-fff">
      <a class="box" href="../personalInfo/main" hover-class="none">
        <!--<img class="user-pic" v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">-->
        <open-data class="user-pic" type="userAvatarUrl"><!--用户头像--></open-data>
        <div class="info">
          <!--<p class="name fz30">账号123</p>-->
          <open-data class="name fz30" type="userNickName"><!--用户昵称--></open-data>
          <p class="member fz24">普通会员</p>
        </div>
      </a>
    </div>

    <div class="order margin-top bg-fff">
      <div class="head main-padding-lr border-btm">
        <p class="fz28">我的订单</p>
        <a href="../orderAll/main?activeNum=0&testId=9999" class="check-all fz24 fc-999" hover-class="none">查看全部订单</a>
      </div>
      <div class="sort">
        <a href="../orderAll/main?activeNum=1" hover-class="none">
          <p class="fz32 fc-999">0</p>
          <p class="fz26 fc-666">待付款</p>
        </a>
        <a href="../orderAll/main?activeNum=2" hover-class="none">
          <p class="fz32 fc-999">0</p>
          <p class="fz26 fc-666">待发货</p>
        </a>
        <a href="../orderAll/main?activeNum=3" hover-class="none">
          <p class="fz32 fc-999">0</p>
          <p class="fz26 fc-666">待收货</p>
        </a>
        <a href="../orderAll/main?activeNum=4" hover-class="none">
          <p class="fz32 fc-999">0</p>
          <p class="fz26 fc-666">待评价</p>
        </a>
        <a href="../orderAll/main?activeNum=5" hover-class="none">
          <p class="fz32 fc-999">0</p>
          <p class="fz26 fc-666">退货中</p>
        </a>
      </div>
    </div>

    <div class="wrap-a margin-top bg-fff">
      <a class="a-link main-padding-lr" href="../ourBuy/main" hover-class="none">
        <p class="fz28">我的团购</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="wrap-a margin-top bg-fff">
      <a class="a-link main-padding-lr" href="../returnedManage/main" hover-class="none">
        <p class="fz28">退换管理</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="wrap-a margin-top bg-fff">
      <a class="a-link main-padding-lr border-btm" href="../myMoney/main" hover-class="none">
        <p class="fz28">我的钱包</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <a class="a-link main-padding-lr border-btm" href="../myCoupons/main" hover-class="none">
        <p class="fz28">我的优惠券</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <a class="a-link main-padding-lr border-btm" href="../myIntegral/main" hover-class="none">
        <p class="fz28">我的积分</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="wrap-a margin-top bg-fff">
      <a class="a-link main-padding-lr" href="../myDistribution/main" hover-class="none">
        <p class="fz28">分销中心</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="wrap-a margin-top bg-fff">
      <a class="a-link main-padding-lr border-btm" href="../myEvaluate/main" hover-class="none">
        <p class="fz28">我的评论</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <a class="a-link main-padding-lr border-btm" href="../myCollection/main" hover-class="none">
        <p class="fz28">我的收藏</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="wrap-a margin-top margin-btm bg-fff">
      <a class="a-link main-padding-lr border-btm" href="../messageCenter/main" hover-class="none">
        <p class="fz28">消息中心</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <a class="a-link main-padding-lr border-btm" href="../helpCenter/main" hover-class="none">
        <p class="fz28">帮助中心</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <a class="a-link main-padding-lr border-btm" href="../addressReceive/main" hover-class="none">
        <p class="fz28">收货地址</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
      <button class="button fz28 main-padding-lr border-top btn-reset" open-type="contact" hover-class="none">联系客服</button>
    </div>

  </div>
</template>

<script>

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
$val1:20rpx;
.container{
  @at-root .margin-top{
    margin-top: $val1;
  }
  @at-root .margin-btm{
    margin-bottom: $val1;
  }
  @at-root .person{
    .box{
      height: 200rpx;
      display: flex;
      align-items: center;
      .user-pic{
        width: 120rpx;
        min-width: 120rpx;
        height: 120rpx;
        border-radius: 100%;
        background-color: #f5f5f5;
        vertical-align: middle;
        overflow: hidden;
      }
      .info{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 30rpx;
        .name{
          margin-bottom: 15rpx;
        }
      }
    }
  }
  @at-root .order{
    .head{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 88rpx;
      .check-all{
        line-height: 88rpx;
      }
    }
    .sort{
      height: 130rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
  @at-root .wrap-a{
    .a-link{
      &:nth-last-of-type(1){
        border-bottom: none;
      }
      height: 108rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .button{
      height: 108rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
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





