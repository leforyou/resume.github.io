<template>
<!--开始推广-->
  <div class="container">
    <div class="head flex-center">
      <div class="img-box">
        <img v-if="url" :src="url+qrCodeImg" >
      </div>
      <p class="share fz30 fc-666">分享二维码开发推广</p>
    </div>
    
    <div class="wrap-btn main-padding-lr">
      <p class="btn main-bg fz30 fc-fff flex-center" @click="save()">保存到本地</p>
      <button class="btn btn-reset main-bg fz30 fc-fff flex-center" open-type="share">分享给朋友</button>
    </div>



    <div class="open-setting" :class="{'active':isActive}" @click="hide()">
      <div class="box" catchtap="show">
        <div class="head">打开授权设置页</div>
        <div class="content">
          <p>为了您的正常使用</p>
          <p>需要开启保存到相册的权限</p>
        </div>
        <div class="foot">
          <button class="btn-reset" open-type="openSetting" @click="hide()">确认</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
export default {
  data () {
    return {
      url:this.$url,
      isActive:false,
      qrCodeImg:''
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad: function(options) {
    //小程序生命周期函数
    console.log('分享与分销',options);
    share.distribution(options);//分享与分销
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    //console.log('store',store.state.login.openid);
    //console.log('share.msg.path',share);
    //console.log('share.msg.shareOpenid',share.msg.shareOpenid);
    return {
      title: share.msg.title,
      path: share.msg.path,
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
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.getSetting();
      this.getQrCode();
    });
  },
  methods: {
    show(){
      this.isActive = true;
    },
    hide(){
      this.isActive = false;
    },
    getSetting(){
      //获取授权信息
      wx.getSetting({
        success:(res)=> {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            //弹窗授权
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success:()=> {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              },
              fail:()=>{

              }
            })
          }
        }
      });
    },
    save(){
      //下载文件资源到本地
      wx.showLoading({
        title:'正在保存',
        mask:true
      });
      wx.downloadFile({
        url: this.url+this.qrCodeImg, //网络图片资源
        success: (res)=> {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            this.saveToAlbum(res.tempFilePath);
          }else{
            wx.hideLoading();
          }
        },
        fail:()=>{
          wx.hideLoading();
        }
      });
    },
    saveToAlbum(tempFilePath){
      //保存图片到系统相册
      wx.saveImageToPhotosAlbum({
        filePath:tempFilePath,//图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
        success:(res)=> {
          wx.hideLoading();
          this.$alert('保存成功');
        },
        fail:(res)=>{
          //console.log(res,'图片保存到相册失败');
          wx.hideLoading();
          if(res.errMsg == 'saveImageToPhotosAlbum:fail cancel'){
            //用户取消保存
          }
          if(res.errMsg.indexOf('auth')>-1){
            //用户拒绝保存，已经拒绝使用保存到相册的权限
            this.show();
          }
        }
      });
    },
    getQrCode(){
      //获取二维码
      var urlData = {
        'ActionName':'getcodeimg',
        "page":"pages/index/main"
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg === 0){
          this.$alert(res.data.msgbox);
        }else if (res.data.msg === 1) {
          this.qrCodeImg = res.data.access_token;
        } else if (res.data.msg === 2) {
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
  .head{
    flex-direction: column;
    .img-box{
      margin-top: 100rpx;
      margin-bottom: 30rpx;
      img{
        width: 450rpx;
        height: 450rpx;
      }
    }
  }
  .wrap-btn{
    margin-top: 80rpx;
    .btn{
      $h:86rpx;
      height: $h;
      border-radius: $h;
      margin-bottom: 50rpx;
    }
  }
}
/**打开授权设置**/
.open-setting{
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



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





