<template>
<!--提现申请-->
  <div class="container">
    <div class="head bg-fff main-padding-lr">
      <div class="box">
        <p class="fz30">可提现金额(元)<!--金额(元)--></p>
        <p class="fz24 fc-ba">￥{{balance}}<!--金额(元)--></p>
      </div>
      <input class="fz30" type="text" placeholder="请输入金额，满50可提现" placeholder-class=".fc-ba">
    </div>

    <div class="main-padding-lr">
      <p class="btn fz30 fc-fff main-bg" @click="submit()">提交申请</p>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      balance:0
    }
  },
  onShow(){
    this.getBalance();
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    submit(){
      this.$modal('该功能还没开通!')
    },
    getBalance(){
      //获取钱包余额
      var urlData = {
        'ActionName':'getbalance'
      };
      this.$http.get('/post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.balance = res.data.rows[0].Amount.toFixed(2);
          if (this.balance == null)this.balance = '0.00';
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  .head{
    $val:40rpx;
    padding-bottom: $val;
    .box{
      padding: $val 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .btn{
    $height:90rpx;
    height: $height;
    border-radius: $height;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80rpx;
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





