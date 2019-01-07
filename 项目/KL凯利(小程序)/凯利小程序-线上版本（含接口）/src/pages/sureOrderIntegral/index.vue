<template>
<!--确认订单-->
  <div class="container">
    <div class="address main-padding-lr border-top margin-btm">
      <a class="box" href="../addressReceive/main?order=true" hover-class="none">
        <i class="iconfont icon-dizhi-copy fz38 fc-666"></i>
        <p class="fz26 a-add" :class="{'active':hasAddress == false}">新增地址</p>
        <p class="fz26 a-name" :class="{'active':hasAddress == true}">收货人：{{address.Receiver}} &nbsp;&nbsp; {{address.Mobile}}</p>
        <p class="fz24 fc-666 a-info" :class="{'active':hasAddress == true}">收货地址：{{address.NvrFd1}}{{address.Address}}</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

    <div class="product bg-fff margin-btm">
      <div class="content" hover-class="none">
        <div class="content-box main-padding-lr margin-btm" v-for="(item,index) in orderArr" :key="index">
          <div class="left">
            <img class="img" v-if="url" :src="url+item.ProImg" mode="aspectFill">
          </div>
          <div class="right">
            <p class="title fz28 ellipsis2">{{item.ProName}} <!--瀛橘天香  橘红普洱--></p>
            <p class="price fz28">积分{{item.JiFen}}<!-- ￥318.00 --></p>
            <p class="num fz28 fc-999">x{{item.Num}}<!-- 1 --></p>
          </div>
        </div>
      </div>
      <div class="delivery main-padding-lr">
        <div class="box">
          <p class="title fz28">配送方式</p>
          <p class="price fz28 fc-666">￥0.00</p>
          <p class="fz28 fc-666">快递发货</p>
        </div>
      </div>
      <div class="message main-padding-lr">
        <div class="box border-top border-btm">
          <p class="title fz28">买家留言：</p>
          <textarea class="desc fz28" type="text" v-model="BuyerMessage" placeholder="点击给商家留言" maxlength="200" placeholder-class=".fc-999" auto-height="true"></textarea>
        </div>
      </div>
      <div class="total-price main-padding-lr">
        <p class="fz28">合计</p>
        <p class="fz28 main-color">{{usedIntegral}}<!--￥0.00--></p>
      </div>
    </div>

    <div class="coupon-balance main-padding-lr bg-fff margin-btm">
      <ul class="fz28">
        <!--<li class="border-btm ico" @click="useCoupon()">
          <p>优惠</p>
          <p class="main-color hide" :class="{'show':Denomination == 0}">有{{couponsNum}}张可用</p>
          <p class="main-color hide" :class="{'show':Denomination != 0}">{{Denomination}}</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </li>
      </ul>
    </div>


    <div class="money-count main-padding-lr bg-fff margin-btm">
      <ul>-->
        <!--<li>
          <p class="fz28">商品金额</p>
          <p class="fz28 fc-666">￥{{totalPrice}}</p>
        </li>-->
        <li class="border-btm">
          <p>总积分</p>
          <p class="main-color">{{totalIntegral}}</p>
        </li>
        <li class="border-btm">
          <p class="fz28">已用积分</p>
          <p class="fz28 fc-666">-{{usedIntegral}}</p>
        </li>
        <li class="border-btm">
          <p class="fz28">剩余积分</p>
          <p class="fz28 fc-666">{{surplusIntegral}}</p>
        </li>
        <li class="border-btm">
          <p class="fz28">运费</p>
          <p class="fz28 fc-666">￥0.00</p>
        </li>
      </ul>
    </div>

    <div class="foot bg-fff">
      <p class="fz30 main-color main-padding-lr">使用积分：{{usedIntegral}}<!--0.00--></p>
      <p class="submit fz30 sub-bg fc-fff" @click="submitOrder()">兑换</p>
    </div>


  </div>
</template>

<script>
import store from '@/store/store.js'
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      orderArr:[],
      type:null,
      BuyerMessage:'',
      hasAddress:false,
      address:{},
      AddressID:null,
      totalIntegral:0,
      usedIntegral:0,
      surplusIntegral:0,
      orderType:'O'
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad:function(options){
    //console.log(options)
    //console.log(JSON.parse(options.arr))
    //小程序周期函数，获取url传递的参数
    if(options.type === 'cart'){
      //购物车
      //this.orderArr = JSON.parse(options.arr);
      //this.type = options.type;
    }else if(options.type === 'buyNow'){
      //立刻购买
      //this.orderArr = JSON.parse(options.arr);
      //this.type = options.type;
    }else if(options.type === 'integral'){
      //积分兑换
      this.orderArr = JSON.parse(options.arr);
      this.type = options.type;
    }
    this.orderType = options.orderType || "O";  // O:普通购买订单 I:积分订单 G:团购订单
    this.usedIntegral = NP.times(this.orderArr[0].JiFen, this.orderArr[0].Num);
  },
  async onShow(){
    this.getAdress();
    this.getIntegral();
    let flag = await this.checkUserInfo();
    if(flag == false){
      //没绑定手机号码-执行下面代码
      let isTrue = await this.$modal('为了你能正常下单，请先绑定个人信息');
      if(isTrue){
        wx.navigateTo({
          url: '../personalInfo/main'
        });
      }
    }
  },
  methods: {
    totalPriceFN(){
      //计算积分
      this.surplusIntegral = NP.minus(this.totalIntegral , this.usedIntegral);//相减
    },
    async submitOrder(){
      //提交订单
      let flag = await this.checkUserInfo();
      if(flag == false){
        //没绑定手机号码-执行下面代码
        let isTrue = await this.$modal('为了你能正常下单，请先绑定个人信息');
        if(isTrue){
          wx.navigateTo({
            url: '../personalInfo/main'
          });
        }else{
          return;
        }
      }
      //提交订单
      if(this.AddressID == null){
        this.$alert('请选择填写收货地址');
        return;
      }
      let isExchange = await this.$modal('你确定要兑换吗？');
      if(isExchange == false)return;
      let num = '',sid = '',bugType = '', pids = [] , Specifications = '';
      /*if(this.type === 'cart'){
        num = '';
        sid = '';
        bugType = 2;
        Specifications = '';
        this.orderArr.forEach((item)=>{pids.push(item.ProID)});
      }else if(this.type === 'buyNow'){
        num = '';
        sid = this.orderArr[0].ID;
        bugType = 1;
        Specifications = this.orderArr[0].Specifications;
        pids[0] = this.orderArr[0].ProID;
      }else */if(this.type === 'integral'){
        num = this.orderArr[0].Num;
        sid = this.orderArr[0].ID;
        bugType = 1;
        Specifications = this.orderArr[0].Specifications;
        pids[0] = this.orderArr[0].ProID;
      }
      if(this.BuyerMessage=='')this.BuyerMessage = '无';
      var urlData = {
        'ActionName':'AddNewOrder',
        'Specifications':'',
        'num':num,
        'sid':sid, //商品规格ID
        "orderType": this.orderType,  // O:普通购买订单 I:积分订单 G:团购订单
        "bugType": bugType,    //1：立即购买(积分商品立即兑换) 2:购物车里结算
        "op": 1,
        "pids": pids.join(','),  //商品ID ,多个商品用","分割
        "AddressID": this.AddressID, //收货地址ID
        // "DistributionModel": "快递发货",//配送方式
        "BuyerMessage": this.BuyerMessage, //买家留言
        "productTotal": this.usedIntegral,  //商品总计
        "voucherID": '', //优惠券ID
        //"voucherAmount": 30, //优惠卷金额
        "freight": 0, //运费
        "paymoney": 0, // 微信支付金额
        "walletBalance": 0  //钱包余额支付金额
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
         this.$alert('订单提交失败');
        }else if(res.data.msg == 1){
          this.$alert('兑换成功');
          wx.redirectTo({
            url: '../paymentSuccess/main'
          }); 
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    }/*,
    getWeixinPayValue(ordercode){
      //获取微信支付的5个参数
      var urlData = {
        'ActionName':'weixinPay',
        'orderno':ordercode //订单号
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
          wx.redirectTo({
            url: '../paymentSuccess/main'
          });
        },
        'fail':async (res)=>{
          let flag = await this.$modal('你还没完成支付，请到订单中心完成支付!');
          if(flag==true){
            wx.switchTab({
              url:'../personalCenter/main'
            });
          }else{
            wx.navigateBack();
          }
        }
      });
    }*/,
    async getAdress(){
      //获取地址
      await store.dispatch('getAddress');
      let arr = store.state.address.addressArr;
      if(arr.length == 0){
        this.hasAddress = false;
      }else{
        this.hasAddress = true;
      };
      let item = null;
      arr.forEach(element => {
        if(element.IsDefault){
          item = element;
          this.AddressID = element.ID;
        }
      });
      if (item){
        this.address = item;
      }else{
        this.address = arr[0];
      }
    },
    getIntegral(){
      //我的总积分
      var urlData = {
        'ActionName':'myPointsCount'
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.totalIntegral = res.data.Amount;
          this.totalPriceFN();
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    checkUserInfo(){
      //检测用户的手机号码有没绑定
      return new Promise((resolve, reject)=>{
        //获取用户信息
        var urlData = {
          'ActionName':'getUserinfo'
        };
        this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
          if(res.data.msg == 0){
            //this.$alert();
            resolve(false);
          }else if(res.data.msg == 1){
            let data = res.data.rows[0];
            let phone = data.EnrolName;
            if(phone.length>6){
              resolve(true);
            }else{
              resolve(false);
            }
          }else if(res.data.msg == 2){
            resolve(false);
          }
        });
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  $height:110rpx;
  padding-bottom: $height;
  overflow: hidden;
  .address{
    $top:30rpx;
    background-color: #fff;
    background-image: url(../../../static/img/address-bar.png);
    background-position:0 100%;
    background-repeat: repeat-x;
    background-size: 70rpx 3rpx;
    .box{
      position: relative;
      padding-left: 50rpx;
      padding-right: 50rpx;
      padding-top: $top;
      padding-bottom: $top;
      min-height: 68rpx;
      .active{
        display: block !important;
      }
      .a-add ,.a-name ,.a-info{
        display:none;
      }
      .iconfont.icon-dizhi-copy{
        position: absolute;
        top: $top - 3rpx;
        left: 0;
      }
      .iconfont.icon-gengduo{
        position: absolute;
        top: $top;
        right: 0;
        margin-top: 5rpx;
      }
      .a-name{
        margin-bottom: 10rpx;
      }
    }
  }

  .product{
    .content{
      .content-box{
        $wh:160rpx;
        background-color: #fafafa;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        display: flex;
        .left{
          min-width: $wh;
          width: $wh;
          img{
            width: $wh;
            height: $wh;
            border-radius: 12rpx;
            overflow: hidden;
            vertical-align: middle;
          }
        }
        .right{
          $val:10rpx;
          position: relative;
          padding-left: 20rpx;
          padding-right: 150rpx;
          padding-top: $val;
          width: calc(100% - 160rpx);
          .price,.num{
            position: absolute;
            right: 0;
          }
          .price{
            top: $val;
          }
          .num{
            top: 70rpx;
          }
        }
      }
    }
    .delivery{
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      .box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        .title{
          position: absolute;
          top: 0;
          left: 0;
        }
        .price{
          margin-bottom: 20rpx;
        }
      }
    }
    .message{
      .box{
        display: flex;
        align-items: center;
        min-height: 70rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        .title{
          white-space: nowrap;
        }
        .desc{
          width: 100%;
          margin-left: 6rpx;
          position: relative;
          top: 2rpx;
        }
      }
    }
    .total-price{
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: space-between
    }
  }
  .coupon-balance{
    ul{
      li{
        &:nth-last-child(1){
          border-bottom: none;
        }
        &.ico{
          padding-right: 45rpx;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 90rpx;
        .iconfont{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .money-count{
    $top:30rpx;
    overflow: hidden;
    ul{
      margin-top: $top;
      li{
        margin-bottom: $top;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: $height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .submit{
      height: 100%;
      width: 200rpx;
      display: flex;
      justify-content: center;
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





