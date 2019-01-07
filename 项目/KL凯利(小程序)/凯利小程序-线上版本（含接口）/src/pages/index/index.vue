<template>
  <div class="container">
    <search><!--搜索--><p class="search-content">搜索</p></search>
    <swiperHome :imgUrls='bannerArr'><!--首页轮播图--></swiperHome>
    <div class="promise main-padding-lr">
      <ul class="fz24">
        <li>
          <img v-if="url" :src="url+'img/ensure-patent.png'" >
          <span class="fc-666">专利保证</span>
        </li>
        <li>
          <img v-if="url" :src="url+'img/ensure-pquality.png'">
          <span class="fc-666">品质保障</span>
        </li>
        <li>
          <img v-if="url" :src="url+'img/ensure-specialty.png'">
          <span class="fc-666">正宗原产</span>
        </li>
      </ul>
    </div>

    <div class="navigation main-padding-lr">
      <ul class="fz24">
        <li>
          <a href="../productList/main" hover-class="none">
            <i class="iconfont icon-shuyeb1 fz66"></i>
            <span>最新产品</span>
          </a>
        </li>
        <li>
          <a href="../productList/main" hover-class="none">
            <i class="iconfont icon-huo fz68"></i>
            <span>热卖产品</span>
          </a>
        </li>
        <li>
          <a href="../orderAll/main?activeNum=0" hover-class="none">
            <i class="iconfont icon-dingdan-home fz60"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li>
          <a href="../integralMall/main" hover-class="none">
            <i class="iconfont icon-shangpinguanli fz66"></i>
            <span>积分商城</span>
          </a>
        </li>
        <li>
          <a href="../personalCenter/main" hover-class="none" open-type="switchTab">
            <i class="iconfont icon-huiyuanguanli-copy fz62"></i>
            <span>会员中心</span>
          </a>
        </li>
      </ul>
    </div>

    <coupon ref='coupon'><!--优惠券--></coupon>

    <div class="notice fz26">
      <a :href="'../notice/main?msg='+message" class="box main-padding-lr" hover-class="none">
        <span class="gong-gao sub-bg fc-fff">公告</span>
        <scroll-view scroll-x>
          <p class="msg fc-999 ellipsis1">{{message}}</p>
        </scroll-view>
      </a>
    </div>

    <collage ref='collage'><!--拼团--></collage>

    <div class="product-list head-tle">
      <div class="head main-padding-lr">
        <p class="left fz30">最新推荐</p>
        <a class="right" href="../productList/main" hover-class="none">
          <span class="fz24 fc-999">更多</span>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </a>
      </div>
      <productList :productListArr="productListArr"><!--产品列表--></productList>
    </div>

    <div class="video">
      <div class="head">
        <img v-if="url" :src="url+'img/make-tea-title.png'">
      </div>
      <videoTea/>
    </div>

    <div class=" head-tle">
      <div class="head main-padding-lr">
        <p class="left fz30">最新资讯</p>
        <a class="right" href="../newsList/main" hover-class="none">
          <span class="fz24 fc-999">更多</span>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </a>
      </div>
      <news-list :newsListArr="newsListArr"><!--资讯列表--></news-list>
    </div>

    <custom-service><!--客服--></custom-service>

    <userInfo ref="userInfo"><!--登录授权--></userInfo>

  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import search from '@/components/search'
import swiperHome from '@/components/swiperHome'
import productList from '@/components/productList'
import coupon from '@/components/coupon'
import collage from '@/components/collage'
import videoTea from '@/components/videoTea'
import newsList from '@/components/newsList'
import customService from '@/components/customService'
import userInfo from '@/components/userInfo'

export default { 
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      bannerArr:[],
      productListArr:[],
      newsListArr:[],
      message:'',
      videoUrl:null
    }
  },
  computed:{
    
  },
  components: {
    search,swiperHome,productList,coupon,collage,videoTea,newsList,customService,userInfo
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.downRefresh();
    });
  },
  onShow(){
    
  },
  onLoad: function(options) {
    //小程序生命周期函数
    //console.log('index.vue分享与分销onLoad',options);
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
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.downRefresh();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
  },
  methods: {
    downRefresh(){
      this.bannerFn();
      this.productListFn();
      this.getNewsListFn();
      this.getIndexMessage();
      this.getVideo();
      this.$refs.coupon.init();
      this.$refs.collage.init();
    },
    bannerFn(){
      //轮播图
      this.$http.get('get/getProductData.aspx',{'ActionName':'getIndexBanner'}).then((res)=>{
        this.bannerArr = res.data.rows;
      });
    },
    productListFn(){
      //产品列表
      var urlData = {
        'ActionName':'getProuctList',
        'type':1,
        'curpage':1,
        'pagesize':4
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        this.productListArr = res.data.rows;
      });
    },
    getNewsListFn(){
      //最新资讯
      var urlData = {
        'ActionName':'getNewsList',
        'curpage':1,
        'pagesize':4,
        'orderby':'asc'
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        this.newsListArr = res.data.rows;
      });
    },
    getIndexMessage(){
      //获取公告信息
      this.$http.get('get/getProductData.aspx',{'ActionName':'getIndexMessage'}).then((res)=>{
        this.message = res.data.rows[0].NvrFd15;
      });
    },
    getVideo(){
      //获取获得视频
      this.$http.get('get/getProductData.aspx',{'ActionName':'getVideo'}).then((res)=>{
        this.videoUrl = res.data.rows[0].NvrFd9;
      });
    }
  }
}
</script>



<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
.container{
  background-color: #f4f7ed;
}
.promise{
  ul{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 0 40rpx;
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 42rpx;
        height: 42rpx;
        margin-right: 10rpx;
      }
    }
  }
}
.navigation{
  ul{
    display:flex;
    justify-content: space-between;
    align-items: flex-end;
    li{
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .iconfont,span{
          color: #414d28;
      }
      .iconfont{
          margin-bottom: 10rpx;
      }
    }
  }
}   
.notice{
  padding-top: 10rpx;
  .box{
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 120rpx;
   .gong-gao{
      position: absolute;
      top: 50%;
      left: 28rpx;
      transform: translateY(-50%);
      line-height: 38rpx;
      padding: 0 12rpx;
      border-radius: 6rpx;
      white-space: nowrap;
      box-shadow: 2rpx 2rpx 12rpx rgba($color: #414d28, $alpha: 0.6);
    }
    scroll-view{
      .msg{
        white-space: nowrap;
        padding-right: 20rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
      }
    }
  }
}      
.head-tle{
  background-color: #fff;
  .head{
    display: flex;
    justify-content:space-between;
    align-items: center;
    border-bottom: 1rpx solid #ededed;
    position: relative;
    &::before{
      content: '';
      display: block;
      width: 8rpx;
      height: 30rpx;
      background-color: #7fb414;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .left{

    }
    .right{
      line-height: 85rpx;
      display: flex;
      align-items: center;
    }
  }
}    
.video{
  padding-bottom: 20rpx;
  .head{
    height: 110rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 660rpx;
      height: 60rpx;
    }
  }
}
</style>

<style lang="scss">
/**能设置本页面与组件的样式**/
.product-list{
  .product ul li::after{
      content: '';
      display: block;
      border-bottom: 1rpx solid #ededed;
      position: absolute;
      bottom: 0rpx;
      left: 28rpx;
      right: 28rpx;
  }
  .product ul li:nth-last-child(1)::after{
    border: none;
  }
}
</style>






