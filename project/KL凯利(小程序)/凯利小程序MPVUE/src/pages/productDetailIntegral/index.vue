<template>
<!--<div class="container" :class="{'overflow-y':isOverflow}">-->
  <div class="container">
    <swiper-product-detail :imgUrls="imgArr"><!--商品详情页轮播图--></swiper-product-detail>
    
    <div class="info main-padding-lr">
      <div class="box">
        <h1 class="title padding-right fz32 ellipsis2">瀛橘天香  橘红普洱瀛橘天香</h1>
        <p class="promise padding-right fz30 fc-999">正宗茶质</p>
        <div class="price">
          <span class="new main-color fz36">31800分</span>
        </div>
        <div class="express-sales fz22">
          <span class="express fc-b2">快递：包邮</span>
          <span class="sales fc-b2">销量：90件</span>
        </div>
        <button class="share btn-reset" open-type="share" >
          <i class="iconfont icon-fenxiang fz30 fc-666"></i>
          <span class="fz22 fc-666">分享</span>
        </button>
      </div>
    </div>

    <div class="size-parameter">
      <ul class="main-padding-lr">
        <li class="border-btm" @click="childSize()">
          <span class="fz26 fc-666">规格数量</span>
          <i class="iconfont icon-gengduo fc-666 fz24"></i>
        </li>
        <li class="border-btm" @click="childParameter()">
          <span class="fz26 fc-666">产品参数</span>
          <i class="iconfont icon-gengduo fc-666 fz24"></i>
        </li>
      </ul>
    </div>
    <productDetailSizeIntegral ref="size"><!--商品规格--></productDetailSizeIntegral>
    <productDetailParameter ref="parameter"><!--商品参数--></productDetailParameter>

    <div class="details-evaluate">
      <div class="head fz28 border-btm">
        <div class="head-details" :class="{'active':detailsEvaluate==0}" @click="detailsEvaluate=0"><span>详情</span></div>
        <div class="head-evaluate" :class="{'active':detailsEvaluate==1}" @click="detailsEvaluate=1"><span>评论</span></div>
      </div>
      <div class="content">
        <div class="content-details main-padding-lr" :class="{'active':detailsEvaluate==0}">
          <img v-if="url" :src="url+'img/product-details.jpg'" style="width:100%;height:2433rpx;">
        </div>
        <div class="content-evaluate" :class="{'active':detailsEvaluate==1}">
          <productDetailEvaluate><!--评论内容列表--></productDetailEvaluate>
        </div>
      </div>
    </div>

    <div class="suggest" :class="{'active':detailsEvaluate==0}">
      <productDetailSuggest><!--猜你喜欢--></productDetailSuggest>
    </div>

    <div class="foot">
      <a class="list home" href="../index/main" hover-class="none" open-type="switchTab">
        <i class="iconfont icon-dianpu fc-999 fz40"></i>
        <span class="fz24 fc-666">首页</span>
      </a>
      <div class="list collection">
        <i class="iconfont icon-star-none fc-999 fz40"></i>
        <span class="fz24 fc-666">收藏</span>
      </div>
      <button class="list customer contact btn-reset" open-type="contact" >
        <i class="iconfont icon-wodekefu fc-999 fz40"></i>
        <span class="fz24 fc-666">客服</span>
      </button>
      <div class="list buy-now">
        <span class="fz30 sub-color">立即购买</span>
      </div>
      <div class="list sub-bg add-cart">
        <span class="fz30 fc-fff">加入购物车</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import swiperProductDetail from '@/components/swiperProductDetail'
import productDetailEvaluate from '@/components/productDetailEvaluate'
import productDetailSuggest from '@/components/productDetailSuggest'
import productDetailSizeIntegral from '@/components/productDetailSizeIntegral'
import productDetailParameter from '@/components/productDetailParameter'
export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      detailsEvaluate:0,
      //isOverflow:false,
      imgArr:[
        'img/slider-product-detail.jpg',
        'img/slider-product-detail.jpg',
        'img/slider-product-detail.jpg'
      ]
    }
  },
  computed:{
    
  },
  components: {
    swiperProductDetail,productDetailEvaluate,productDetailSuggest,productDetailSizeIntegral,productDetailParameter
  },

  methods: {
    childSize(){
      this.$refs.size.show();
    },
    childParameter(){
      this.$refs.parameter.show();
      //this.isOverflow = true;
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>



<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$val:108rpx;
$mainColor: #7fb414;
.container{
  padding-bottom: $val;
}
.info{
  padding-top: 40rpx;
  padding-bottom: 20rpx;
  background-color: #fff;
  .box{
    position: relative;
    .padding-right{
      padding-right: 55rpx;
    }
    .title{
      line-height: 1.6;
    }
    .promise{
      margin-top: 20rpx;
      margin-bottom: 50rpx;
      line-height: 1;
    }
    .price{
      line-height: 1;
      .new{
        margin-right: 16rpx;
      }
    }
    .express-sales{
      margin-top: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .share{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.size-parameter{
  background-color: #fff;
  margin: 20rpx 0;
  ul{
    li{
      &:nth-last-child(1){
        border-bottom: none;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 0;
    }
  }
}
.details-evaluate{
  background-color: #fff;
  .head{
    display: flex;
    justify-content: center;
    align-items: center;
    .head-details,.head-evaluate{
      &.active{
        span{
          &::after{
            content: '';
            display: block;
            position: absolute;
            bottom: -1rpx;
            left: 0;
            right: 0;
            background-color: $mainColor;
            height: 2rpx;
          }
          color: $mainColor;
          position: relative;
        }
      }
      height: 90rpx;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        height: 100%;
        padding: 0 2rpx;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .content{
    .content-details,.content-evaluate{
      &.active{
        display: block;
      }
      display: none;
    }
    .content-details{
      padding-top: 30rpx;
      padding-bottom: 60rpx;
    }
    .content-evaluate{
      margin-bottom: 20rpx;
    }
  }
}
.suggest{
  &.active{
    display: block;
  }
  display: none;
}
.foot{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top:1rpx solid #dcdcdc;
  height: $val;
  display: flex;
  align-items: center;
  justify-content: center;
  .home,.collection,.customer{
    width: 14.4%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    .iconfont{
      margin-bottom: 2rpx;
    }
  }
  .buy-now,.add-cart{
    width: 28.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }
  .buy-now{
    border-left: 1rpx solid #dcdcdc;
  }
}
</style>

<style lang="scss">
/**能设置本页面与组件的样式**/
page{
  background-color: #ededed;
  height: 100%;
}

.overflow-y{
  height: 90%;
  overflow-y: hidden;
}

</style>






