<template>
<!--收货地址-->
  <div class="container">
    <div class="box bg-fff main-padding-lr margin-top margin-btm">
      <ul>
        <li class="border-btm flex-between" v-for="(item,index) in addressArr" :key="index">
          <i class="iconfont icon-gou fz24" @click="chooseDefaultAddress(item.ID)" :class="{'active':item.IsDefault}"></i>
          <div class="info fz28" @click="chooseDefaultAddress(item.ID)">
            <p class="name-phone">{{item.Receiver}} &nbsp;&nbsp; {{item.Mobile}}</p>
            <p class="fc-999">{{item.NvrFd1}}{{item.Address}}</p>
          </div>
          <div class="right-change flex-center" @click="changeInfo(item)">
            <i class="sigh-change flex-center fz30">i<!--修改--></i>
          </div>
        </li>


       <!--<li class="border-btm flex-between">
          <i class="iconfont icon-gou fz24"></i>
          <div class="info fz28">
            <p class="name-phone">陈小姐 &nbsp;&nbsp; 13800138000</p>
            <p class="fc-999">广东省广州市天河区龙口西天信大厦1603广东省广州市天河区龙口西天信大厦1603</p>
          </div>
          <i class="sigh-change flex-center fz30" @click="changeInfo()">i</i>
        </li> -->
      </ul>
      <a class="add flex-between" href="../addressAdd/main" hover-class="none">
        <i class="iconfont icon-jiahao1 fz24 flex-center"></i>
        <p class="fz28">新增地址</p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
      </a>
    </div>

  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  data () {
    return {
      url:this.$url,
      addressArr:[],
      orderChooseAddress:false
    }
  },
  computed:{
    
  },
  onLoad(options){
    if(options.order){
      this.orderChooseAddress = true;
    }
  },
  onShow(){
    //小程序 - 生命周期函数--监听页面显示
    //this.addressArr = store.state.address.addressArr;
    this.addressArr = [];
    store.dispatch('getAddress').then((addressArr)=>{//获取地址方法二：同步（结合的是Promise）
        this.addressArr = addressArr;
    });
  },
  components: {
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick( function () {//async
      
    });
  },
  methods: {
    changeInfo(item){
      //修改收货地址
      wx.navigateTo({
        url: '../addressChange/main?addressInfo='+JSON.stringify(item)
      });
    },
    chooseDefaultAddress(ID){
      //点击-修改默认地址
      var urlData = {
        'ActionName':'UpdatedefaultAddress',
        'DID':ID
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg === 0){
          this.$alert(res.data.msgbox);
        }else if (res.data.msg === 1) {
          store.dispatch('getAddress').then((addressArr)=>{//获取地址方法二：同步（结合的是Promise）
              this.addressArr = addressArr;
          });
          if(this.orderChooseAddress){
            wx.navigateBack();
          }
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
$color:#0670eb;
.container{
  $left:56rpx;
  .box{
    overflow: hidden;
    ul{
      li{
        position: relative;
        padding-left: $left;
        .iconfont{
          color: $color;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .icon-gou{
          display: none;
          &.active{
            display: block;
          }
        }
        .info{
          width: 100%;
          padding: 30rpx 0;
          .name-phone{
            margin-bottom: 6rpx;
          }
        }
        .right-change{
          padding-top: 20rpx;
          padding-bottom: 20rpx;
          padding-left: 15rpx;
          padding-right: 5rpx;
          height: 100%;
          position: relative;
          .sigh-change{
            min-width: 40rpx;;
            width: 40rpx;
            height: 40rpx;
            border-radius: 100%;
            border: 1rpx solid $color;
            color: $color;
          }
        }
        
      }
    }
  }
  .add{
    position: relative;
    height: 88rpx;
    padding-left: $left;
    .icon-jiahao1{
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: $color;
      border: 1rpx solid $color;
      border-radius: 100%;
      width: 35rpx;
      height: 35rpx;
      font-weight: bold;
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





