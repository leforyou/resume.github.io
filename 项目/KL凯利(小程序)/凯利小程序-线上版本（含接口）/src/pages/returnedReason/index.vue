<template>
<div class="container">
    <!--申请退换货-退换原因填写-->
    <div class="transaction-info">
      <ul class="main-padding-lr bg-fff fz24">
        <li>
          <p class="left">商品名称：</p>
          <p class="right">{{item.ProductName}}<!--橘红普洱--></p>
        </li>
        <li>
          <p class="left">付款金额：</p>
          <p class="right main-color">{{item.Total0}}<!--￥318.00--></p>
        </li>
        <li>
          <p class="left">订单编号：</p>
          <p class="right">{{item.OrderCode}}<!--546468762124--></p>
        </li>
        <li>
          <p class="left">交易时间：</p>
          <p class="right">{{item.TimeFd4}}<!--2018-05-09  14:25:59--></p>
        </li>
      </ul>
    </div>

    <div class="reason">
      <ul class="main-padding-lr bg-fff fz24">
        <li class="border-btm">
          <p class="name">处理方式</p>
          <p class="desc ellipsis1">{{wayVal}}</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
          <picker class="picker" @change="bindPickerChangeWay" :range="wayArr"><p></p></picker>
        </li>
        <li class="border-btm">
          <p class="name">退款原因</p>
          <p class="desc ellipsis1">{{reasonVal}}</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
          <picker class="picker" @change="bindPickerChangeReason" :range="reasonArr" range-key="name"><p></p></picker>
        </li>
        <li class="border-btm">
          <p class="name">退款金额</p>
          <p class="desc">{{item.Total0}}<!--318.00--></p>
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
      wayVal:'请选择处理方式',
      reasonVal:'请选择退款原因',
      item:{},
      wayArr: ['最快速度帮我处理', '我有耐心等待', '不急慢慢来','其它'],
      phone:'',
      desc:'',
      reasonArr:[
        {id:0,name:'拍错/不喜欢/效果不好'},
        {id:1,name:'材质与商品描叙不符'},
        {id:2,name:'大小尺寸与商品描叙不符'},
        {id:3,name:'卖家发错货'},
        {id:4,name:'假冒品牌'},
        {id:5,name:'收到商品少件/破损或污渍'},
        {id:6,name:'做工粗糙/有瑕疵'},
        {id:7,name:'生产日期/保质期描叙不符'},
        {id:8,name:'颜色/款式/描叙不符'},
        {id:9,name:'其它'}
      ]
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad(options){//console.log(options)
    this.item.ProductName = options.ProductName;
    this.item.Total0 = NP.plus(options.Total0,0).toFixed(2);
    this.item.OrderCode = options.OrderCode;
    this.item.ID = options.ID;
    this.item.TimeFd4 = options.TimeFd4.replace(/\//g,"-");
  },
  onShow(){
    this.wayVal='请选择处理方式';
    this.reasonVal='请选择退款原因';
    this.wayArr= ['最快速度帮我处理', '我有耐心等待', '不急慢慢来','其它'];
    this.phone='';
    this.desc='';
  },
  methods: {
    bindPickerChangeWay(e){
      //console.log('picker发送选择改变，携带值为', e);
      //console.log('返回数组的下标',e.target.value);
      let index = e.target.value;
      this.wayVal = this.wayArr[index];
    },
    bindPickerChangeReason(e){
      let index = e.target.value;
      this.reasonVal = this.reasonArr[index].name;
    },
    submit(){
      if(this.phone == ''){
        this.$alert('电话不能为空');
        return;
      }
      if(this.desc.length < 5){
        this.$alert('描述内容不能少于5个字!');
        return;
      }
      if(this.wayVal == '请选择处理方式'){
        this.$alert('请选择处理方式');
        return;
      }
      if(this.reasonVal == '请选择退款原因'){
        this.$alert('请选择退款原因!');
        return;
      }
      var urlData = {
        'ActionName':'updateorderByTuihuo',
        'refundID':'',//退货信息ID，默认为空
        'orderID':this.item.ID, //订单ID
        'disposeWay':this.wayVal,//处理方式
        'refundReason':this.reasonVal,//退款原因
        'refund_feel':this.item.Total0,//退款金额
        'phone':this.phone,//电话
        'desc':this.desc//备注
      };
      this.$http.get('post/postMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);//数据获取失败
        }else if(res.data.msg == 1){
          this.$alert(res.data.msgbox);//数据获取失败
          wx.navigateBack();
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
  @at-root .transaction-info{
    border-top: 3rpx solid #ededed;
    margin-bottom: 20rpx;
    ul{
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      li{
        &:nth-last-child(1){
          margin-bottom: 0rpx;
        }
        margin-bottom: 26rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
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





