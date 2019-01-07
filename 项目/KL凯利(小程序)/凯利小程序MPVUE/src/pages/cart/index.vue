<template>
<!--购物车-->
  <div class="container">
    <div class="edit-coplete bg-fff margin-btm">
      <p class="fz24 fc-999" :class="{'active':isActive == 0}" @click="editCoplete(0)">编辑</p>
      <p class="fz24 fc-999" :class="{'active':isActive == 1}" @click="editCoplete(1)">完成</p>
    </div>

    <div class="product">
      <ul class="margin-btm">
        <li class="p-list bg-fff margin-top">
          <div class="choose main-padding-lr">
            <i class="iconfont fz20" :class="{'icon-gou':checked}"></i>
          </div>
          <a class="img-box" href="../productDetail/main" hover-class="none">
            <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">瀛橘天香  橘红普洱 瀛橘天香橘红普洱瀛橘天橘红普洱瀛橘天香橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <span class="price main-color fz28">￥318.00</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">1</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}">删除</div>
        </li>
        <li class="p-list bg-fff margin-top">
          <div class="choose main-padding-lr">
            <i class="iconfont fz20" :class="{'icon-gou':checked}"></i>
          </div>
          <a class="img-box" href="../productDetail/main" hover-class="none">
            <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <span class="price main-color fz28">￥318.00</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">2</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}">删除</div>
        </li>
        <li class="p-list bg-fff margin-top">
          <div class="choose main-padding-lr">
            <i class="iconfont fz20" :class="{'icon-gou':!checked}"></i>
          </div>
          <a class="img-box" href="../productDetail/main" hover-class="none">
            <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <span class="price main-color fz28">￥318.00</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">2</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}">删除</div>
        </li>
        <li class="p-list bg-fff margin-top">
          <div class="choose main-padding-lr">
            <i class="iconfont fz20" :class="{'icon-gou':checked}"></i>
          </div>
          <a class="img-box" href="../productDetail/main" hover-class="none">
            <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <span class="price main-color fz28">￥318.00</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">2</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}">删除</div>
        </li>
        <li class="p-list bg-fff margin-top">
          <div class="choose main-padding-lr">
            <i class="iconfont fz20" :class="{'icon-gou':checked}"></i>
          </div>
          <a class="img-box" href="../productDetail/main" hover-class="none">
            <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">瀛橘天香  橘红普洱</h1>
            <p class="num fz26 fc-999">280g个/盒</p>
            <span class="price main-color fz28">￥318.00</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">2</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}">删除</div>
        </li>
      </ul>
    </div>

    <div class="foot bg-fff">
      <div class="left">
        <i class="iconfont fz20" :class="{'icon-gou':checked}"></i>
        <p class="all fz30 fc-666">全选</p>
      </div>
      <div class="right">
        <div class="settled" :class="{'active':isActive == 0}">
          <p class="fz24 sum">合计：836.00</p>
          <p class="fz24 fc-999">不含运费</p>
          <p class="fz30 fc-fff sub-bg jie-suan" @click="submitBalance()">结算</p>
        </div>
        <div class="delete-choose sub-bg fc-fff fz30" :class="{'active':isActive == 1}">删除</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      isActive:0,
      checked:true
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    editCoplete(val){
      if(val == 0){
        this.isActive = 1;//编辑--删除
      }else if(val == 1){
        this.isActive = 0;//完成
      }
    },
    submitBalance(){
      wx.navigateTo({
        url: '../sureOrder/main'
      });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;

.container{
  $f-height:110rpx;
  padding-bottom: $f-height;
  overflow: hidden;
  @at-root .edit-coplete{
    height: 82rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    p{
      &.active{
        display:flex;
      }
      padding: 0 28rpx;
      height: 100%;
      display: flex;
      align-items: center;
      display: none;
    }
  }
  @at-root .product{
    >ul{
      @at-root .p-list{
        $val:160rpx;
        $deleteWidth:105rpx;
        display: flex;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        position: relative;
        .choose{
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont{
            &.icon-gou{
              background-color: $mainColor;
              border: 1rpx solid $mainColor;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
            }
            width: 38rpx;
            height: 38rpx;
            border-radius: 100%;
            border: 1rpx solid #999;
          }
        }
        .img-box{
          height: $val;
          min-width: $val;
          margin-right: 20rpx;
          img{
            width: $val;
            height: $val;
            border-radius: 10rpx;
          }
        }
        .info{
          &.active{
            padding-right: $deleteWidth;
          }
          position: relative;
          margin-right: 28rpx;
          width: calc(100% - 302rpx);
          box-sizing: border-box;
          .title{
            width: 100%;
          }
          .num{
            margin-top: 5rpx;
          }
          .price{
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .calculate{
            &.active{
              display: flex;
            }
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50rpx;
            display: none;
            align-items: center;
            .iconfont,.cal-num{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
            .iconfont{
              width: 52rpx;
            }
            .cal-num{
              width: 54rpx;
            }
          }
        }
        >.delete{
          &.active{
            display: flex;
          }
          background-color: #5c8802;
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: $deleteWidth;
        }
      }
    }
  }
  @at-root .foot{
    height: $f-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .left{
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .iconfont{
        &.icon-gou{
          background-color: $mainColor;
          border: 1rpx solid $mainColor;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        width: 38rpx;
        height: 38rpx;
        border-radius: 100%;
        border: 1rpx solid #999;
        margin:0 20rpx;
      }
    }
    .right{
      height: 100%;
      width: 50%;
      .active{
        display: flex !important;
      }
      .settled{
        $val:190rpx;
        display: none;
        height: 100%;
        padding-right: $val+30;
        position: relative;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        .sum{
          color: #688c1e;
        }
        .jie-suan{
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: $val;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .delete-choose{
        display: none;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
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





