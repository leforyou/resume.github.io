<template>
<!--个人中心-->
  <div class="container">
    <div class="person margin-top main-padding-lr bg-fff">
      <div class="box">
        <!--<open-data class="user-pic" type="userAvatarUrl">用户头像</open-data>-->
        <button class="user-pic-btn btn-reset" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
          <!--获取用户信息-->
          <img class="pic-bg" v-if="url" :src="userPic" mode="aspectFill">
        </button>
        <a class="info" href="../personalInfo/main" hover-class="none">
          <!--<p class="name fz30">账号123</p>-->
          <open-data class="name fz30" type="userNickName"><!--用户昵称--></open-data>
          <p class="member fz24">{{LevelName}}</p>
        </a>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </div>
    </div>

    <div class="order margin-top bg-fff">
      <div class="head main-padding-lr border-btm">
        <p class="fz28">我的订单</p>
        <a href="../orderAll/main?activeNum=0&testId=9999" class="check-all fz24 fc-999" hover-class="none">查看全部订单</a>
      </div>
      <div class="sort">
        <a href="../orderAll/main?activeNum=1" hover-class="none">
          <p class="fz32 fc-999">{{stataSum.wfsum}}<!--0--></p>
          <p class="fz26 fc-666">待付款</p>
        </a>
        <a href="../orderAll/main?activeNum=2" hover-class="none">
          <p class="fz32 fc-999">{{stataSum.dfhsum}}<!--0--></p>
          <p class="fz26 fc-666">待发货</p>
        </a>
        <a href="../orderAll/main?activeNum=3" hover-class="none">
          <p class="fz32 fc-999">{{stataSum.dshsum}}<!--0--></p>
          <p class="fz26 fc-666">待收货</p>
        </a>
        <a href="../orderAll/main?activeNum=4" hover-class="none">
          <p class="fz32 fc-999">{{stataSum.dpjsum}}<!--0--></p>
          <p class="fz26 fc-666">待评价</p>
        </a>
        <a class="hide" href="../orderAll/main?activeNum=5" hover-class="none">
          <p class="fz32 fc-999">{{stataSum.thzsum}}<!--0--></p>
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
    <userInfo ref="userInfo"><!--登录授权--></userInfo>
  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import userInfo from '@/components/userInfo'
export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      stataSum:{},
      LevelName:'',
      userPic:''
    }
  },
  onLoad: function(options) {
    //加载
    share.distribution(options);
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    return {
      title: share.msg.title,
      path: `pages/personalCenter/main?${share.msg.shareIdName}=${store.state.login.memberid}`,
      imageUrl: share.msg.imageUrl,
      success: function(res){
        // 转发成功之后的回调
        if(res.errMsg == 'shareAppMessage:ok'){
          share.shareToFriend();
        }
      },
      fail: function(){
        // 转发失败之后的回调
      },
      complete:function(){
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    }
  },
  components: {
    userInfo
  },
  onShow(){
    this.getUserinfo();
    this.getOrderStataSum();
    this.memberDiscountsFn();
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      //console.log('updated',this.allOderList,typeof this.allOderList)
      this.getOrderStataSum();
    });
  },
  methods: {
    getOrderStataSum(){
      var urlData = {
        'ActionName':'getorderStataSUM'
      };
      this.$http.get('post/postMemberData.ashx',urlData).then(async(res)=>{
        this.stataSum = res.data;
        if(res.data.msg == 0){
          
        }else if(res.data.msg == 1){
          this.stataSum = res.data;
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
        }
      });
    },
    memberDiscountsFn(){
      //会员折扣
      return new Promise((resolve,reject)=>{
        var urlData = {
          'ActionName':'getMemberDiscounts'
        };
        this.$http.get('/post/postMemberData.ashx',urlData).then((res)=>{
          if(res.data.msg == 0){
            this.$alert(res.data.msgbox);
            resolve(false);
          }else if(res.data.msg == 1){
            this.LevelName = res.data.LevelName;
          }else if(res.data.msg == 2){
            this.$alert(res.data.msgbox);
            resolve(false);
          }
        });
      });
    },
    onGotUserInfo(e){
      //获取-微信个人信息
      this.info = e.mp.detail.userInfo;
      if(this.info == null){
        //用户选择拒绝
      }else if(typeof this.info == 'object'){
        //用户选择允许
        this.userPic = this.info.avatarUrl;
        this.info.avatarUrl = encodeURI(this.info.avatarUrl);
        this.submitInfo(this.info);
        try {
            wx.setStorageSync('userInfo', this.info);
        } catch (e) { 
          console.log('用户信息保存本地失败! ',e); 
        }
      }
    },
    submitInfo(urlData){
      urlData.ActionName = 'postUserinfo';
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          //res.data.rows;
          //this.$alert('数据提交成功');
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);
        }
      });
    },
    getUserinfo(){
      //获取用户信息
      var urlData = {
        'ActionName':'getUserinfo'
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          let data = res.data.rows[0];
          this.userPic = data.Headimgurl;
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
      position: relative;
      .user-pic-btn{
        width: 120rpx;
        min-width: 120rpx;
        height: 120rpx;
        border-radius: 100%;
        background-color: #f5f5f5;
        vertical-align: middle;
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
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
      .iconfont{
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
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
        width: 100%;
        flex-grow: 1;
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





