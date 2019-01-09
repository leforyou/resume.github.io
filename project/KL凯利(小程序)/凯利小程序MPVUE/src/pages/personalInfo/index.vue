<template>
<!--个人信息-->
  <div class="container">
    <div class="box margin-top bg-fff main-padding-lr">
      <ul class="fz28">
        <li class="border-btm head" @click="uploadPic()">
          <p class="name">头像</p>
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </li>
        <li class="border-btm">
          <p class="name">昵称</p>
          <input class="key-value" type="text" placeholder="昵称" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">手机号码</p>
          <input class="key-value" type="number" placeholder="11位手机号码" maxlength="11" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">邮箱</p>
          <input class="key-value" type="text" placeholder="邮箱信息" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">银行卡绑定</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
          <a class="fixed" href="../bankCardBinding/main" hover-class="none"></a>
        </li>
      </ul>
    </div>
    <div class="wrap-btns main-padding-lr">
      <p class="btn btn-sure flex-center fz30 fc-fff main-bg">确认保存</p>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    uploadPic(){
      //不建议更换头像，建议使用微信默认的头像
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





