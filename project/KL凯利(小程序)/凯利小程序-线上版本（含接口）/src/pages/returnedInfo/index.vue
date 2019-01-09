<template>
<div class="container">
    <!--申请退换货-填写退货信息-->

    <div class="reason">
      <ul class="main-padding-lr bg-fff fz24">
        <li class="border-btm">
          <p class="name">快递公司</p>
          <input class="desc" type="text" v-model="company" placeholder="物流单号" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">快递单号</p>
          <input class="desc" type="text" v-model="number" placeholder="物流单号" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">姓名</p>
          <input class="desc" type="text" v-model="name" placeholder="姓名" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">手机号码</p>
          <input class="desc" type="number" v-model="phone" placeholder="便于商家联系您" maxlength="11" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">备注信息</p>
          <textarea class="desc" type="text" v-model="desc" placeholder="最多可填200字" maxlength="200" placeholder-class=".fc-999" auto-height="true"></textarea>
        </li>
      </ul>
    </div>

    <div class="submit main-padding-lr">
      <p class="btn fz30 fc-fff main-bg" @click="submit()">确定提交</p>
    </div>

</div>
</template>

<script>
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      item:{},
      company:'',
      number:'',
      name:'',
      phone:'',
      desc:''
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad(options){
    this.orderid = options.orderid;
    console.log(this.orderid)
  },
  onShow(){
    this.company='';
    this.number='';
    this.name='';
    this.phone='';
    this.desc='';
  },
  methods: {
    submit(){
      if(this.company == ''){
        this.$alert('请填写快递公司');
        return;
      }
      if(this.number == ''){
        this.$alert('请填写快递单号');
        return;
      }
      if(this.name == ''){
        this.$alert('请填姓名');
        return;
      }
      if(this.phone == ''){
        this.$alert('电话不能为空');
        return;
      }
      if(this.phone.length < 6){
        this.$alert('电话格式不正确');
        return;
      }
      wx.showLoading({
        title:'提交中',
        mask:true
      });
      var urlData = {
        'ActionName':'addExpressMessage',
        'orderid':this.orderid, //订单ID
        'expressCompany':this.company,//快递公司
        'expressNumber':this.number,//快递单号
        'name':this.name,//姓名
        'userPhone':this.phone,//手机号码
        'expressDesc':this.desc//备注描述
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);//数据获取失败
          wx.hideLoading();
        }else if(res.data.msg == 1){
          wx.hideLoading();
          this.$alert(res.data.msgbox);//数据获取失败
          wx.navigateBack();
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
          wx.hideLoading();
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
.picker{
  &,p{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
}
.container{
  margin-bottom: 20rpx;
  overflow: hidden;
  
  @at-root .reason{
    ul{
      li{
        &:nth-last-child(1){
          border-bottom: none;
        }
        display: flex;
        align-items: center;
        padding-right: 40rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        min-height: 76rpx;
        position: relative;
        .name{
          width: 145rpx;
          min-width: 145rpx;
        }
        .desc{
          width: 100%;
        }
        .iconfont{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  @at-root .submit{
    margin-top: 82rpx;
    .btn{
      $val:88rpx;
      border-radius: $val;
      line-height: $val;
      text-align: center;
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





