<template>
<!--银行卡绑定-->
  <div class="container">
    <div class="box margin-top bg-fff main-padding-lr">
      <ul class="fz28">
        <li class="border-btm">
          <p class="name">姓名</p>
          <input class="key-value" type="text" v-model="name" placeholder="姓名" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">手机号码</p>
          <input class="key-value" type="number" v-model="phone" placeholder="11位手机号码" maxlength="11" placeholder-class=".fc-999">
        </li>
        <li class="border-btm hide">
          <p class="name">验证码</p>
          <input style="margin-right:100rpx;" class="key-value" type="number" v-model="vcode" placeholder="手机验证码" maxlength="11" placeholder-class=".fc-999">
          <p class="get-vcode fz26 fc-fff" :class="{'active':isActive}" @click="sendVcode()">{{vcodeTip}}</p>
        </li>
        <li class="border-btm">
          <p class="name">银行卡号</p>
          <input class="key-value" type="number" v-model="card" placeholder="银行卡号信息" placeholder-class=".fc-999">
        </li>
      </ul>
    </div>
    <div class="wrap-btns main-padding-lr">
      <p class="btn btn-sure flex-center fz30 fc-fff main-bg" @click="submit()">确认保存</p>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      name:'',
      phone:'',
      card:'',
      vcode:'',
      vcodeTip:'获取',
      isActive:true
    }
  },
  computed:{
    
  },
  components: {
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.getUserinfo();
    });
  },
  methods: {
    getUserinfo(){
      //获取用户信息
      var urlData = {
        'ActionName':'getUserinfo'
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          //this.$alert();
        }else if(res.data.msg == 1){
          let data = res.data.rows[0];
          this.name = data.TrueName;
          this.phone = data.EnrolName;
          this.card = data.NvrFd7;
        }else if(res.data.msg == 2){
          this.$alert('数据提交失败');
        }
      });
    },
    submit(){
      //保存
      if(this.name == ''){
        this.$alert('姓名不能为空');
        return;
      }
      if(this.phone == ''){
        this.$alert('手机不能为空');
        return;
      }
      if(this.card == ''){
        this.$alert('银行卡号不能为空');
        return;
      }
      var urlData = {
        'ActionName':'addBankCard',
        'username':this.name,
        'phone':this.phone,
        'bankcard':this.card,
        'txtCode':this.vcode
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          //this.$alert();
          this.$alert('保存失败');
        }else if(res.data.msg == 1){
          this.$alert('保存成功');
        }else if(res.data.msg == 2){
          this.$alert('数据提交失败');
        }
      });
    },
    sendVcode(){
      //获取手机号码
      if(this.isActive == false)return;
      var urlData = {
        'ActionName':'SendCode',
        'phone':this.phone
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          //res.data.rows;
          this.$alert('发送成功');
          let num = 60;
          this.vcodeTip = `${num}s`;
          this.isActive = false;
          let setIval = setInterval(()=>{
            num -= 1;
            if(num == 0){
              this.isActive = true;
              this.vcodeTip = '获取';
              clearInterval(setIval);
            }else{
              this.vcodeTip = `${num}s`;
            }
          },1e3);
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  .box{
    ul{
      .head{
        height: 175rpx;
        .person-pic{
          width: 120rpx;
          height: 120rpx;
        }
      }
      li{
        display: flex;
        align-items: center;
        min-height: 88rpx;
        position: relative;
        .name{
          width: 210rpx;
          min-width: 210rpx;
        }
        .key-value{
          width: 100%;
        }
        .iconfont{
          position: absolute;
          right: 0;
        }
        .get-vcode{
          &.active{
            background-color: $mainColor;
          }
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          line-height: 2;
          padding: 0 18rpx;
          background-color: #bbb;
          border-radius: 10rpx;
        }
      }
    }
  }
  .wrap-btns{
    margin-top: 80rpx;
    .btn{
      $h:86rpx;
      height: $h;
      border-radius: $h;
    }
    .btn-sure{
      margin-bottom: 40rpx;
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





