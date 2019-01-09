<template>
<!--新增地址-->
  <div class="container">
    <div class="box margin-top bg-fff">
      <ul class="main-padding-lr fz28">
        <li class="border-btm">
          <p class="key-name">联系人</p>
          <input class="key-value" type="text" :value="addressInfo.Receiver" v-model="addressInfo.Receiver" placeholder="名字" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="key-name">手机号码</p>
          <input class="key-value" type="number" :value="addressInfo.Mobile" v-model="addressInfo.Mobile" placeholder="11位手机号码" maxlength="11" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="key-name">选择地区</p>
          <p class="key-value" :class="{'fc-999':area=='地区信息'}">{{area}}</p>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
          <picker class="picker" mode="region" @change="bindRegionChange" :value="region"><p></p></picker>
        </li>
        <li class="border-btm">
          <p class="key-name">详细地址</p>
          <textarea class="key-value" type="text" :value="addressInfo.Address" v-model="addressInfo.Address" placeholder="街道门牌信息" maxlength="200" placeholder-class=".fc-999" auto-height="true"></textarea>
        </li>
        <li class="border-btm">
          <p class="key-name">邮政编码</p>
          <input class="key-value" type="number" :value="addressInfo.AreaCode" v-model="addressInfo.AreaCode" placeholder="邮政编码" maxlength="6" placeholder-class=".fc-999">
        </li>
      </ul>
    </div>

    <div class="wrap-btns main-padding-lr">
      <p class="btn btn-sure flex-center fz30 fc-fff main-bg" @click="addAddress()">确认保存</p>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      url:this.$url,
      area:'地区信息',
      addressInfo:{},
      region: ['广东省', '广州市', '天河区']
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad: function(options) {
    
  },
  onShow(){
    this.addressInfo.Mobile = '';
    this.addressInfo.Receiver = '';
    this.addressInfo.AreaCode = '';
    this.addressInfo.Address = '';
    this.addressInfo.NvrFd1 = '';
    this.area = '地区信息';
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.addressInfo.ID = '';
      this.addressInfo.Mobile = '';
      this.addressInfo.Receiver = '';
      this.addressInfo.AreaCode = '';
      this.addressInfo.Address = '';
      this.addressInfo.NvrFd1 = '';
    });
  },
  methods: {
    bindRegionChange(e){
      //console.log('picker发送选择改变，携带值为', e.target.value);
      var arr = e.target.value;
      this.area = arr.join("  ");
      this.addressInfo.NvrFd1 = arr.join(",");
    },
    addAddress(){
      //新增地址
      wx.showLoading({
        title:'数据正在提交',
        mask:true
      });
      var urlData = {
        'ActionName':'AddNewOrUpdateAddress',
        'DID':this.addressInfo.ID,
        'Mobile':this.addressInfo.Mobile,
        'Receiver':this.addressInfo.Receiver,
        'AreaCode':this.addressInfo.AreaCode,
        'Address':this.addressInfo.Address,
        'Area':this.addressInfo.NvrFd1
      };
      this.$http.get('post/postMemberData.ashx',urlData).then(async(res)=>{
        if(res.data.msg == 0){
          wx.hideLoading();
          this.$alert(res.data.msg);//数据获取失败
        }else if(res.data.msg == 1){
          wx.hideLoading();
          this.$alert('添加成功');
          let setTime = setTimeout(()=>{
            wx.navigateBack();
            clearTimeout(setTime);
          },1.2e3);
        }else if(res.data.msg == 2){
          wx.hideLoading();
          this.$alert(res.data.msg);//数据获取失败
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
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
  .box{
    ul{
      li{
        &:nth-last-child(1){
          border-bottom: none;
        }
        min-height: 58rpx;
        padding: 15rpx 0;
        display: flex;
        align-items: center;
        position: relative;
        .key-name{
          min-width: 210rpx;
          width: 210rpx;
        }
        .key-value{
          width: 100%;
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
    .btn-del{
      border: 1rpx solid #999;
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





