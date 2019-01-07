<template>
<!--个人信息-->
  <div class="container">
    <div class="box margin-top bg-fff main-padding-lr">
      <ul class="fz28">
        <li class="border-btm head" @click="uploadPic()">
          <p class="name">头像</p>
          <!--<open-data class="person-pic" type="userAvatarUrl">用户头像</open-data>-->
          <button class="user-pic-btn btn-reset" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
            <!--获取用户信息-->
            <img class="pic-bg" v-if="url" :src="userPic" mode="aspectFill">
          </button>
        </li>
        <li class="border-btm">
          <p class="name">昵称</p>
          <input class="key-value" type="text" v-model="nickname" placeholder="昵称" placeholder-class=".fc-999">
        </li>
        <li class="border-btm right-btn">
          <p class="name">手机号码</p>
          <input class="key-value" type="number" :disabled="phoneNeedChange" v-model="phone" placeholder="11位手机号码" maxlength="11" placeholder-class=".fc-999">
          <p class="r-btn edit-phone fz26 fc-fff" v-if="phoneNeedChange" @click="phoneNeedChange=false">编辑</p>
        </li>
        <li class="border-btm right-btn" v-if="!phoneNeedChange">
          <p class="name">验证码</p>
          <input class="key-value" type="number" v-model="vcode" placeholder="手机验证码" maxlength="11" placeholder-class=".fc-999">
          <p class="r-btn get-vcode fz26 fc-fff" :class="{'active':isActive}" @click="sendVcode()">{{vcodeTip}}</p>
        </li>
        <li class="border-btm">
          <p class="name">邮箱</p>
          <input class="key-value" type="text" v-model="email" placeholder="邮箱信息" placeholder-class=".fc-999">
        </li>
        <!--<li class="border-btm">
          <p class="name">银行卡绑定</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
          <a class="fixed" href="../bankCardBinding/main" hover-class="none"></a>
        </li>-->
      </ul>
    </div>
    <div class="wrap-btns main-padding-lr">
      <p class="btn btn-sure flex-center fz30 fc-fff main-bg" @click="updateUserInfo()">确认保存</p>
    </div>
    <userInfo ref="userInfo"><!--登录授权--></userInfo>
  </div>
</template>

<script>

import userInfo from '@/components/userInfo'
export default {
  data () {
    return {
      url:this.$url,
      nickname:'',
      phone:'',
      email:'',
      vcode:'',
      vcodeTip:'获取',
      isActive:true,
      phoneNeedChange:true,
      userPic:''
    }
  },
  watch:{
    phone:(newVal, oldVal)=>{//console.log(newVal,1122, oldVal)
      if(newVal=="" || newVal.length != 11 || newVal==null || newVal==undefined){
        this.phoneNeedChange = false;//console.log(this.phoneNeedChange)
      }
    }
  },
  components: {
    userInfo
  },
  onShow(){
    this.phoneNeedChange = true;
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.getUserinfo();
    });
  },
  methods: {
    uploadPic(){
      //不建议更换头像，建议使用微信默认的头像
      return;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(res,tempFilePaths)
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
          //this.$alert();
        }else if(res.data.msg == 1){
          let data = res.data.rows[0];
          this.nickname = data.NickName;
          this.phone = data.EnrolName;
          this.email = data.NvrFd1;
          this.userPic = data.Headimgurl;
        }else if(res.data.msg == 2){
          this.$alert('数据提交失败');
        }
      });
    },
    updateUserInfo(){
      //提交用户信息
      var urlData = {
        'ActionName':'updateUserinfo',
        'nickname':this.nickname,
        'phone':this.phone,
        'email':this.email,
        'txtCode':this.vcode
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          //res.data.rows;
          this.$alert('保存成功');
          wx.navigateBack();
        }else if(res.data.msg == 2){
          this.$alert('数据提交失败');
        }
      });
    },
    sendVcode(){
      //获取手机号码
      if(this.phone == ""){
        this.$alert('手机号码不能为空');
        return;
      }
      if(this.phone.length !== 11){
        this.$alert('请填写正确的手机号码');
        return;
      }
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
      }
      li{
        &.right-btn{
          input{
            margin-right:100rpx;
          }
          .r-btn{

          }
        }
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
        .r-btn{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        .get-vcode{
          &.active{
            background-color: $mainColor;
          }
          line-height: 2;
          padding: 0 18rpx;
          background-color: #bbb;
          border-radius: 10rpx;
        }
        .edit-phone{
          color: $mainColor;
          height: 100%;
          padding: 0 18rpx;
          display: flex;
          align-items: center;
        }
        .fixed{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
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





