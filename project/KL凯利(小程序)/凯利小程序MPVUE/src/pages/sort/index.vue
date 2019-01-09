<template>
  <div class="container">
    <div class="sort-search">
      <search><!--搜索--><p class="search-content">搜索</p></search>
    </div>
    <div class="wrap-sort">
      <scroll-view class="sort-left" scroll-y>
        <ul class="fz28">
          <li class="sort-left-list ellipsis2" :class="{'active':index==0}" @click="tab(0)">橘红普洱</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==1}" @click="tab(1)">橘红普洱橘红普洱橘红普洱</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==2}" @click="tab(2)">绿茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==3}" @click="tab(3)">红茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==4}" @click="tab(4)">黄茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==5}" @click="tab(5)">白茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==6}" @click="tab(6)">青茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==7}" @click="tab(7)">黑茶</li>


          
          <li class="sort-left-list ellipsis2" :class="{'active':index==8}" @click="tab(8)">红茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==9}" @click="tab(9)">黄茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==10}" @click="tab(10)">白茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==11}" @click="tab(11)">青茶</li>
          <li class="sort-left-list ellipsis2" :class="{'active':index==12}" @click="tab(12)">黑茶</li>
        </ul>
      </scroll-view>

      <scroll-view class="sort-right bg-fff" scroll-y @scrolltolower="lower">
        <ul>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
          <li class="product-list">
            <a href="../productDetail/main" class="box" hover-class="none">
              <div class="left">
                <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
              </div>
              <div class="right">
                <h1 class="title fz26 ellipsis2">瀛橘天香  橘红普洱</h1>
                <p class="num fz22 fc-999">280g个/盒</p>
                <div class="price">
                  <span class="new main-color fz30">￥318.00</span>
                  <span class="old fz22 fc-999 delete-line">￥390.00</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div v-if="isRefresh">
          <DropDownRefresh><!--下拉刷新动画--></DropDownRefresh>
        </div>
      </scroll-view>
    </div>
    <custom-service><!--客服--></custom-service>
  </div>
</template>

<script>
import search from '@/components/search'
import customService from '@/components/customService'
import DropDownRefresh from '@/components/DropDownRefresh'

export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      index:0,
      isRefresh:true
    }
  },
  computed:{
    
  },
  components: {
    search,customService,DropDownRefresh
  },
  methods: {
    tab(index){
      console.log(index)
      this.index = index;
    },
    lower(e){
      console.log("滚动到底部触发：  ",e)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
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





