<template>
  <div class="container">
    <search><!--搜索--><p class="search-content">搜索</p></search>
    <swiperHome :imgUrls='imgArr'><!--首页轮播图--></swiperHome>
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

    <coupon><!--优惠券--></coupon>

    <div class="notice fz26">
      <div class="box main-padding-lr">
        <span class="gong-gao sub-bg fc-fff">公告</span>
        <scroll-view scroll-x>
          <p class="msg fc-999">橘红普洱具有橘皮和普洱茶的保健功效外，还独创了一种单独品饮其中一种饮品所不具有!</p>
        </scroll-view>
      </div>
    </div>

    <collage><!--拼团--></collage>

    <div class="product-list head-tle">
      <div class="head main-padding-lr">
        <p class="left fz30">最新推荐</p>
        <a class="right" href="../productList/main" hover-class="none">
          <span class="fz24 fc-999">更多</span>
          <i class="iconfont icon-gengduo fc-999 fz24"></i>
        </a>
      </div>
      <productList><!--产品列表--></productList>
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
      <news-list><!--资讯列表--></news-list>
    </div>

    <custom-service><!--客服--></custom-service>


  </div>
</template>

<script>
import search from '@/components/search'
import swiperHome from '@/components/swiperHome'
import productList from '@/components/productList'
import coupon from '@/components/coupon'
import collage from '@/components/collage'
import videoTea from '@/components/videoTea'
import newsList from '@/components/newsList'
import customService from '@/components/customService'
export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      imgArr:[
        'img/slider1.jpg',
        'img/slider1.jpg',
        'img/slider1.jpg'
      ]
    }
  },
  computed:{
    
  },
  components: {
    search,swiperHome,productList,coupon,collage,videoTea,newsList,customService
  },
  
  methods: {
    
  },

  
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.$http.get('#/purchase',{}).then((response)=>{
        //如果请求失效，则要在微信公众平台设置请求的域名
        console.log('小程序首页ajax请求purchase：',response);
      });
      this.$http.get('#/manage/998',{}).then((response)=>{
        //如果请求失效，则要在微信公众平台设置请求的域名
        console.log('小程序首页ajax请求manage：',response);
      });
      
      this.$http.get('#/salesman/998',{}).then((response)=>{
        //如果请求失效，则要在微信公众平台设置请求的域名
        console.log('小程序首页ajax请求salesman：',response);
      });
    });
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






