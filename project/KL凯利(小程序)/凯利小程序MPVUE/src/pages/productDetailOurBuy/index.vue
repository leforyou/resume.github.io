<template>
<!--<div class="container" :class="{'overflow-y':isOverflow}">-->
  <div class="container">
    <swiper-product-detail :imgUrls="imgArr"><!--商品详情页轮播图--></swiper-product-detail>
    
    <div class="info main-padding-lr">
      <div class="box">
        <h1 class="title padding-right fz32 ellipsis2">瀛橘天香  橘红普洱瀛橘天香</h1>
        <p class="promise padding-right fz30 fc-999">正宗茶质</p>
        <div class="price">
          <span class="new main-color fz36">￥318.00</span>
          <span class="old fz22 fc-999 delete-line">￥390.00</span>
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

    <div class="join-group main-padding-lr bg-fff margin-top">
      <div class="box">
        <p class="title fz26 fc-666">参团>筹齐拼团人数发货/筹不齐退款</p>
        <p class="explain fz22 fc-999">
          <span class="symbol fc-999">!</span>
          <span class="fc-999">开团并邀请参团，24小时内人数不足自动退款</span>
        </p>
        <i class="iconfont icon-gengduo fc-999 fz24"></i>
        <button class="share btn-reset" open-type="share"></button>
      </div>
    </div>
    <div class="join-people main-padding-lr bg-fff margin-top">
      <div class="box">
        <p class="title fz26 fc-666">已参团人员</p>
        <scroll-view class="scroll-view" scroll-y="true">
          <ul>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
            <li><img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill"></li>
          </ul>
        </scroll-view>
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
    <productDetailSize ref="size"><!--商品规格--></productDetailSize>
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

    

    <div class="foot">
      <button class="list customer contact btn-reset" open-type="contact" >
        <i class="iconfont icon-wodekefu fc-999 fz40"></i>
        <span class="fz24 fc-666">客服</span>
      </button>
      <div class="list buy-now">
        <span class="fz30 sub-color">￥318.00</span>
        <span class="fz30 sub-color">单独购买</span>
      </div>
      <div class="list sub-bg add-cart">
        <span class="fz30 fc-fff">￥288.00</span>
        <span class="fz30 fc-fff">3人拼团</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import swiperProductDetail from '@/components/swiperProductDetail'
import productDetailEvaluate from '@/components/productDetailEvaluate'
import productDetailSize from '@/components/productDetailSize'
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
    swiperProductDetail,productDetailEvaluate,productDetailSize,productDetailParameter
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
.margin-top{
  margin-top: 20rpx;
}
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
.join-group{
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  .box{
    position: relative;
    .title{
      padding-right: 30rpx;
      margin-bottom: 22rpx;
    }
    .explain{
      display: flex;
      align-items: center;
      .symbol{
        border: 1rpx solid #999;
        border-radius: 100%;
        width: 28rpx;
        height: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14rpx;
      }
    }
    .iconfont{
      position: absolute;
      top: 0;
      right: 0;
    }
    .share{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}
.join-people{
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  .box{
    .title{
      margin-bottom: 22rpx;
    }
    .scroll-view{
      height: 80rpx;
      ul{
        $br:30rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: -$br;
        margin-right: -$br;
        overflow: hidden;
        li{
          $val:80rpx;
          width: $val;
          height: $val;
          margin-right: $br;
          margin-bottom: $br;
          img{
            width: $val;
            height: $val;
            border-radius: 100%;
            background-color: #eee;
          }
        }
      }
    }
  }
}
.size-parameter{
  background-color: #fff;
  margin: 20rpx 0;
  overflow: hidden;
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
      margin-bottom: 20rpx;
    }
    .content-evaluate{
      margin-bottom: 20rpx;
    }
  }
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
  .customer{
    width: 108rpx;
    min-width: 108rpx;
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
    width: 50%;
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






