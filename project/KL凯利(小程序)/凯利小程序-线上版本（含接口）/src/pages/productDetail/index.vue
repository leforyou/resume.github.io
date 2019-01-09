<template>
<!--<div class="container" :class="{'overflow-y':isOverflow}">-->
  <div class="container" v-if="prouctDetail">
    <swiper-product-detail :imgUrls="ImgList"><!--商品详情页轮播图--></swiper-product-detail>
    
    <div class="info main-padding-lr">
      <div class="box">
        <h1 class="title padding-right fz32 ellipsis2">{{prouctDetail.Title}}</h1>
        <p class="promise padding-right fz30 fc-999">正宗茶质</p>
        <div class="price">
          <span class="new main-color fz36">￥{{prouctDetail.Price}}</span>
          <span class="old fz22 fc-999 delete-line">￥{{prouctDetail.Price0}}</span>
        </div>
        <div class="express-sales fz22">
          <span class="express fc-b2">快递：包邮</span>
          <span class="sales fc-b2">销量：{{prouctDetail.salesum}}件</span>
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
    <productDetailSize ref="size" :prouctDetail="prouctDetail" :PID='PID'><!--商品规格--></productDetailSize>
    <productDetailParameter ref="parameter" :prouctDetail="prouctDetail"><!--商品参数--></productDetailParameter>

    <div class="details-evaluate">
      <div class="head fz28 border-btm">
        <div class="head-details" :class="{'active':detailsEvaluate==0}" @click="detailsEvaluate=0"><span>详情</span></div>
        <div class="head-evaluate" :class="{'active':detailsEvaluate==1}" @click="detailsEvaluate=1"><span>评论</span></div>
      </div>
      <div class="content">
        <div class="content-details main-padding-lr" :class="{'active':detailsEvaluate==0}">
          <wxParses :articleHTML="articleHTML"><!--富文本解析组件--></wxParses>
        </div>
        <div class="content-evaluate" :class="{'active':detailsEvaluate==1}">
          <productDetailEvaluate :PID='PID' :detailsEvaluate="detailsEvaluate"><!--评论内容列表--></productDetailEvaluate>
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
      <div class="list collection" @click="handleCollection()">
        <i class="iconfont fz40" :class="{'icon-star-none fc-999':IsCollection=='0','icon-star-full fc-ffc939':IsCollection=='1'}"></i>
        <span class="fz24 fc-666">收藏</span>
      </div>
      <button class="list customer contact btn-reset" open-type="contact" >
        <i class="iconfont icon-wodekefu fc-999 fz40"></i>
        <span class="fz24 fc-666">客服</span>
      </button>
      <div class="list buy-now" @click="shopping('buyNow')">
        <span class="fz30 sub-color">立即购买</span>
      </div>
      <div class="list sub-bg add-cart" @click="shopping('addCart')">
        <span class="fz30 fc-fff">加入购物车</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import swiperProductDetail from '@/components/swiperProductDetail'
import productDetailEvaluate from '@/components/productDetailEvaluate'
import productDetailSuggest from '@/components/productDetailSuggest'
import productDetailSize from '@/components/productDetailSize'
import productDetailParameter from '@/components/productDetailParameter'
import wxParses from '@/components/wxParses'
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      detailsEvaluate:0,
      PID:null,
      prouctDetail:null,
      ImgList:[],
      articleHTML:'',
      IsCollection:'0'
    }
  },
  onLoad: function(options) {
    //小程序生命周期函数
    share.distribution(options);//分享与分销
    if(options.PID){
      this.detailsEvaluate = 0;
      this.PID = options.PID;
      this.getProuctDetail();
      this.checkCollection();
    }
  },
  onShow(){
    //重置提交订单的优惠券可用面额
    store.dispatch('setDenomination');
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    return {
      title: share.msg.title,
      path: `pages/productDetail/main?${share.msg.shareIdName}=${store.state.login.memberid}&PID=${this.PID}`,
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
  computed:{
    
  },
  components: {
    swiperProductDetail,productDetailEvaluate,productDetailSuggest,productDetailSize,productDetailParameter,wxParses
  },
  mounted(){
    this.$nextTick(function () {
      //要删除
      //this.PID = 72;
      //this.getProuctDetail();
    });
  },
  methods: {
    childSize(){
      this.$refs.size.show(null);
    },
    childParameter(){
      this.$refs.parameter.show();
      //this.isOverflow = true;
    },
    getProuctDetail(){
      //获取商品详情数据
      this.prouctDetail = null;
      this.ImgList = [];
      var urlData = {
        'ActionName':'getProuctDetailByID',
        'PID':this.PID
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.prouctDetail = res.data.rows[0];
          this.prouctDetail.Price = NP.plus(this.prouctDetail.Price,0).toFixed(2);
          this.prouctDetail.Price0 = NP.plus(this.prouctDetail.Price0,0).toFixed(2);
          this.articleHTML = this.prouctDetail.Detail;
          //轮播图字符分割
          let imgArr = this.prouctDetail.ImgList;
          imgArr = imgArr.split('^#^');
          for(var i = 0 ; i < imgArr.length ; i ++){
            var list = imgArr[i].split('|');
            this.ImgList.push(list[2]);//可取1或2
          }
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    shopping(str){
      //立即购买、加入购物车
      this.$refs.size.show(str);
    },
    handleCollection(){
      if(this.IsCollection == '0'){
        this.addCollection();
      }else if(this.IsCollection == '1'){
        this.deleteCollection();
      }
    },
    addCollection(){
      //收藏
      var urlData = {
        'ActionName':'addCollectionByPID',
        'PID':this.PID
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.IsCollection = '1';
          this.$alert('收藏成功');
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    deleteCollection(item,index){
      //取消收藏
      var urlData = {
        'ActionName':'deleteCollentionByID',
        'PID':this.PID
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.IsCollection = '0';
          this.$alert('取消收藏');
        }else if(res.data.msg == 0){
          
        }else if(res.data.msg == 2){
          
        }
      });
    },
    checkCollection(){
      //检查产品是否收藏
      var urlData = {
        'ActionName':'checkCollectionStataByPID',
        'PID':this.PID
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.IsCollection = res.data.IsCollection;
        }else if(res.data.msg == 1){
          this.IsCollection = res.data.IsCollection;
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    }
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
      line-height: 1;
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






