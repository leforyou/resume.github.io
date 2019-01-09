<template>
<!--获取 微信用户信息 的弹窗-->
<div class="user-info" :class="{'active':isActive}" @click="hide()">
  <div class="box" catchtap="show">
    <div class="head">微信登录授权</div>
    <div class="content">
      <p>为了您的正常使用</p>
      <p>需要获得您的公开信息</p>
    </div>
    <div class="foot">
      <button class="btn-reset" open-type="getUserInfo" @click="hide()" @getuserinfo="bindGetUserInfo">确认</button>
    </div>
  </div>
</div>
</template>

<script>
//<userInfo ref="userInfo"><!--登录授权--></userInfo>
//this.$refs.userInfo.show();
//import userInfo from '@/components/userInfo'
export default {
  props: [''],
  data(){
    return{
      info:{},
      isActive:false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  onShow(){
    this.check();
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.check();
    });
  },
  methods:{
    check(){
      var urlData = {
        'ActionName':'getUserinfo'
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          //this.$alert();
          this.show();
        }else if(res.data.msg == 1){
          let data = res.data.rows[0];
          if(data.Headimgurl == '' || data.NickName == ''){
            this.show();
          }else{
            this.hide();
          }
        }else if(res.data.msg == 2){
          this.show();
        }
      });
    },
    show(){
      this.isActive = true;
    },
    hide(){
      this.isActive = false;
    },
    bindGetUserInfo: function(e) {
      //获取-微信个人信息
      this.hide();
      this.info = e.mp.detail.userInfo;
      if(this.info == null){
        //用户选择拒绝
        this.show();
      }else if(typeof this.info == 'object'){
        //用户选择允许
        this.hide();
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
    }
  }
}
</script>

<style lang='scss' scoped>
.user-info{
  &.active{
    opacity: 1;
    visibility: visible;
    .box{
      transform: translate(-50%,-50%);
    }
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  transform: translateZ(0);
  z-index: 9999;
  .box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-68%) translateZ(0);
    transition: all 0.3s;
    width: 80%;
    background-color: #fff;
    border-radius: 8rpx;
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.1);
    .head{
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36rpx;
    }
    .content{
      text-align: center;
      font-size: 28rpx;
      padding: 38rpx 0rpx;
      box-sizing: border-box;
      position: relative;
      &::before,&::after{
        content: '';
        display: block;
        position: absolute;
        right: 0;
        left: 0;
        background-color: #ddd;
        border-top: 1rpx solid #eee;
        transform: scaleY(0.5);
      }
      &::before{
        top: 0;
      }
      &::after{
        bottom: 0;
      }
      p{
        padding: 12rpx 0;
        box-sizing: border-box;
      }
    }
    .foot{
      button{
        height: 90rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        background-color: #f8f8f8;
      }
    }
  }
  .btn-reset{
    background-color:transparent;
    border: none;
    margin: 0;
    padding: 0;
    line-height:1.5;
  }
  .btn-reset::after{
    border: none;
  }
}

</style>
