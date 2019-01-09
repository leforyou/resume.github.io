<template>
<!--积分商城-->
  <div class="container">

    <div class="head-nav bg-fff main-padding-lr margin-btm">
      <div class="box">
        <p class="flex-center" :class="{'active':tabNum==0}" @click="tabNum=0">
          <span class="flex-center fz28 fc-666">全部商品</span>
        </p>
        <p class="flex-center" :class="{'active':tabNum==1}" @click="tabNum=1">
          <span class="flex-center fz28 fc-666">可兑换商品</span>
        </p>
      </div>
    </div>
    
    <div class="product">
      <ul :class="{'active':tabNum==0}">
        <li class="list position-relative main-padding-lr bg-fff margin-btm" v-for="(item,index) in integralListAll" :key="index">
          <div class="left">
            <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">{{item.Title}}<!--橘红普洱瀛橘天香--></h1>
            <p class="num fz26 fc-999">{{item.NvrFd15}}g/{{item.SpecificationName}}<!--280g/盒--></p>
            <p class="intergral main-color fz36">{{item.JiFen}}分<!--31800分--></p>
            <a href="../productDetailIntegral/main" class="hide buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>
          </div>
          <a :href="'../productDetailIntegral/main?PID='+item.ID" class="position-absolute" hover-class="none" open-type="navigate"></a>
        </li>
        <li><DropDownRefresh  ref="refresh1"><!--下拉刷新动画--></DropDownRefresh></li>
      </ul>

      <ul :class="{'active':tabNum==1}">
        <li class="list position-relative main-padding-lr bg-fff margin-btm" v-for="(item,index) in integralListCan" :key="index">
          <div class="left">
            <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
          </div>
          <div class="right">
            <h1 class="title fz28 ellipsis2">{{item.Title}}<!--瀛橘天香  橘红普洱--></h1>
            <p class="num fz26 fc-999">{{item.NvrFd15}}g/{{item.SpecificationName}}<!--280g个/盒--></p>
            <p class="intergral main-color fz36">{{item.JiFen}}分<!--31800分--></p>
            <p class="buy-now main-color fz22" @click="buyNow(item)">立即兑换</p>
            <!--<a href="../productDetailIntegral/main" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即兑换</a>-->
          </div>
          <a :href="'../productDetailIntegral/main?PID='+item.ID" class="position-absolute" hover-class="none" open-type="navigate"></a>
        </li>
        <li><DropDownRefresh  ref="refresh2"><!--下拉刷新动画--></DropDownRefresh></li>
      </ul>
    </div>

  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      tabNum:0,
      curpageAll:1,
      pagesizeAll:10,
      integralListAll:[],
      curpageCan:1,
      pagesizeCan:10,
      integralListCan:[]
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh
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
      path: `pages/integralMall/main?${share.msg.shareIdName}=${store.state.login.memberid}`,
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
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.tabNum == 0){
      this.curpageAll += 1;
      this.getIntegralListAll();
    }else if(this.tabNum == 1){
      this.curpageCan += 1;
      this.getIntegralListCan();
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.getIntegralListAll();
      this.getIntegralListCan();
    });
  },
  methods: {
    getIntegralListAll(){
      //全部积分产品
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'getJF_ProductList',
        'IsExchange':0,
        'curpage':this.curpageAll,
        'pagesize':this.pagesizeAll
      };
      this.$http.get('/get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          this.integralListAll = this.integralListAll.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getIntegralListCan(){
      //可兑换积分产品
      this.$refs.refresh2.show();
      var urlData = {
        'ActionName':'getJF_ProductList',
        'IsExchange':1,
        'curpage':this.curpageCan,
        'pagesize':this.pagesizeCan
      };
      this.$http.get('/get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          this.integralListCan = this.integralListCan.concat(data);
          this.$refs.refresh2.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh2.hide();
          this.$refs.refresh2.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh2.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    buyNow(item){
      let arr = [] , obj = {};
      obj.ProID = item.ID;//ProID 字段是对应购物车
      obj.ProImg = item.Img;//ProImg 字段是对应购物车
      obj.ProName = item.Title;//ProName 字段是对应购物车
      obj.ProPrice = item.Price;//ProPrice 字段是对应购物车
      obj.JiFen = item.JiFen;//ProPrice 字段是对应购物车
      obj.ID = '0';//商品规格ID
      obj.Num = 1;//Num 字段是对应购物车
      obj.Specifications = '';//单位：盒
      arr[0] = obj;
      wx.navigateTo({
        url: '../sureOrderIntegral/main?type=integral&arr='+JSON.stringify(arr) + "&orderType=I"// O:普通购买订单 I:积分订单 G:团购订单
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
$height:80rpx;
.container{
  padding-top: $height;
  .head-nav{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .box{
      display: flex;
      align-items: center;
      height: $height;
      p{
        height: 100%;
        width: 50%;
        &.active{
          span{
            &::after{
              $val:20rpx;
              content: "";
              display: block;
              position: absolute;
              left: $val;
              right: $val;
              bottom: 0;
              border-bottom: 3rpx solid $mainColor;
            }
            color: $mainColor;
          }
        }
        span{
          position: relative;
          height: 100%;
        }
      }
    }
  }
  .product{
    @at-root ul{
      display: none;
      &.active{
        display: block;
      }
      @at-root .list{
        padding-top: 40rpx;
        padding-bottom: 40rpx;
        display: flex;
        position: relative;
        @at-root .left{
          img{
            width: 210rpx;
            height: 210rpx;
            border-radius: 10rpx;
          }
        }
        @at-root .right{
          $right:30rpx;
          $val:10rpx;
          width: 100%;
          padding-left: $right;
          padding-bottom: $val;
          padding-top: $val;
          position: relative;
          .intergral{
            position: absolute;
            bottom: $val;
            left: $right;
          }
          .buy-now{
            position: absolute;
            bottom: $val;
            right: 0;
            line-height: 46rpx;
            padding: 0 20rpx;
            border: 1rpx solid #7fb414;
            border-radius: 8rpx;
          }
        }
      }
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





