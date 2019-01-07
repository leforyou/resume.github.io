<template>
  <div class="container">
    <div class="sort-search">
      <search><!--搜索--><p class="search-content">搜索</p></search>
    </div>
    <div class="wrap-sort">
      <scroll-view class="sort-left" scroll-y>
        <ul class="fz28">
          <li v-for="(item,index) in sortArr" :key="item" class="sort-left-list ellipsis2" 
            :class="{'active':indexAcitve==index}" @click="tab(index,item.Code)">
            {{item.Name}}
          </li>
        </ul>
      </scroll-view>

      <scroll-view class="sort-right bg-fff" scroll-y @scrolltolower="lower">
        <ul>
          <li class="product-list" v-for="(item,index) in productListArr" :key="index">
            <a :href="'../productDetail/main?PID='+item.ID" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">{{item.Title}}</h1>
                <p class="num fz22 fc-999">{{item.NvrFd15}}g/{{item.SpecificationName}}<!--280g/盒--></p>
                <div class="price">
                  <span class="new main-color fz30">￥{{item.Price}}</span>
                  <span class="old fz22 fc-999 delete-line">￥{{item.Price0}}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
      </scroll-view>
    </div>
    <custom-service><!--客服--></custom-service>
  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import search from '@/components/search'
import customService from '@/components/customService'
import DropDownRefresh from '@/components/DropDownRefresh'

export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      indexAcitve:0,
      isRefresh:true,
      curpage:1,
      pagesize:10,
      productclass:null,
      sortArr:[],
      productListArr:[],
      isAble:true
    }
  },
  onLoad: function(options) {
    //小程序生命周期函数
    share.distribution(options);
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    return {
      title: share.msg.title,
      path: `pages/sort/main?${share.msg.shareIdName}=${store.state.login.memberid}`,
      imageUrl: share.msg.imageUrl
    }
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.curpage = 1;
      this.productListArr = [];
      this.productSort();
    });
  },
  components: {
    search,customService,DropDownRefresh
  },
  methods: {
    tab(index,Code){
      this.indexAcitve = index;
      this.curpage = 1;
      this.productclass = Code;
      this.productListArr = [];
      this.getProductListByTypeFn();
    },
    lower(e){
      //console.log("滚动到底部触发：  ",e)
      this.curpage += 1;
      this.getProductListByTypeFn();
    },
    productSort(){
      //左侧分类
      var urlData = {
        'ActionName':'getTeaTypeList'
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.sortArr = res.data.rows;
          this.productclass = res.data.rows[0].Code;
          this.productListArr = [];
          this.getProductListByTypeFn();
        }else if(res.data.msg == 2){
          this.$refs.refresh.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getProductListByTypeFn(){
      //右侧产品列表
      if(this.isAble==false)return;
      this.isAble=false;
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'getProductListByType',
        'productclass':this.productclass,
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        this.isAble=true;
        if(res.data.msg == 1){
          let data = res.data.rows;
          this.productListArr = this.productListArr.concat(data);
          this.$refs.refresh.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh.hide();
          this.$refs.refresh.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh.hide();
          this.$alert();//数据获取失败
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$color:#f5f5f5;
$width:230rpx;
.container{
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @at-root .sort-search{
    height: 130rpx;
    min-height: 130rpx;
  }
  @at-root .wrap-sort{
    height: 100%;
    display: flex;
    @at-root .sort-left{
      width: $width;
      min-width: $width;
      height: 100%;
      background-color: $color;
      ul{
        @at-root .sort-left-list{
          &.active{
            &::before{
              content: '';
              display: block;
              position: absolute;
              left: 0;
              top: 32rpx;
              bottom: 32rpx;
              background-color: #7fb414;
              width: 8rpx;
            }
            background-color: #fff;
            color: #7fb414;
            position: relative;
          }
          line-height: 1.6;
          padding: 28rpx;
        }
      }
    }
    @at-root .sort-right{
      width: 100%;
      height: 100%;
      ul{
        @at-root .product-list{
          &:nth-last-child(1){
            border-bottom:none;
          }
          $width:160rpx;
          $val:20rpx;
          border-bottom: 1rpx solid $color;
          width: 100%;
          .box{
            display: flex;
            width: 100%;
            padding: $val;
            .left{
              img{
                border-radius: 10rpx;
                overflow: hidden;
                width: $width;
                height: $width;
                vertical-align: middle;
              }
            }
            .right{
              height: $width;
              margin-left: $val;
              position: relative;
              .title{

              }
              .num{

              }
              .price{
                position: absolute;
                left: 0;
                bottom: 0;
                .new{
                  margin-right: 16rpx;
                }
              }
            }
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
  background-color: #fff;
  height:100%;
  overflow: hidden;
}
</style>





