<template>
<!--商品规格-->
<div class="wrap-size" :class="{'active':isShow}" @click="hide()" catchtouchmove="true">
  <div class="box" catchtap="show">
    <div class="head main-padding-lr">
      <div class="left">
        <img class="img" v-if="url" :src="url+prouctDetail.Img" mode="aspectFill">
      </div>
      <div class="right">
        <p class="price main-color fz32">￥{{price}}<!--￥318.00--></p>
        <p class="title ellipsis1 fz32">{{prouctDetail.Title}}<!--铁观音--></p>
        <i class="iconfont icon-chahao fc-999 fz40" @click="hide()"></i>
      </div>
    </div>
    <div class="content main-padding-lr">
      <div class="size">
        <div class="left fz28">规格</div>
        <div class="right fz28">
          <span v-for="(item,index) in sizeArr" :key="index" :class="{'active':chooseSize==index}" @click="chooseSizeFn(index,item)">
            {{item.NvrFd15}}g/{{item.SpecificationName}}
          </span>
          <!--<span v-for="(item,index) in sizeArr" :key="index" :class="{'active':chooseSize==index}" @click="chooseSizeFn(index,item)">
            {{item.NvrFd1}}g/{{prouctDetail.SpecificationName}}
          </span>-->
        </div>
      </div>
      <div class="num">
        <div class="left fz28">数量</div>
        <div class="right fz28">
          <i class="iconfont icon-jianhao main-color fz28" @click="changeNum(-1)"><!--fc-999--></i>
          <span class="vol fz28">{{productNum}}</span>
          <i class="iconfont icon-jiahao1 fz28 main-color" @click="changeNum(+1)"></i>
        </div>
      </div>
    </div>
    <div class="foot fz30">
      <div class="buy-now sub-color" :class="{'active':shoppingState==null}" @click="buyNow()">立即购买</div>
      <div class="add-cart sub-bg fc-fff" :class="{'active':shoppingState==null}" @click="addCart()">加入购物车</div>
      <div class="sure sub-bg fc-fff" :class="{'active':shoppingState!==null}" @click="sure()">确定</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['prouctDetail','PID'],
  data(){
    return{
      url:this.$url,
      isShow:false,
      chooseSize:null,
      price:0,
      sizeArr:[],
      productNum:1,
      shoppingState:null,
      Specifications:null
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.sizeArr.push(this.prouctDetail);
      this.price = this.prouctDetail.GroupPrice.toFixed(2);
    });
  },
  methods:{
    show(str){
      this.isShow = true;
      this.shoppingState = str;//立即购买、加入购物车
    },
    hide(){
      this.isShow = false;
    },
    chooseSizeFn(num,item){
      this.chooseSize = num;
      this.price = item.GroupPrice.toFixed(2);
      this.sid = item.ID;
      this.Specifications = item.NvrFd1;
    },
    sure(){
      //确认按钮--单独购买是调用productDetailSize组件的方法
      if(this.shoppingState === 'multiBuy'){
        this.multiBuy();
      }
    },
    changeNum(num){
      this.productNum += num;
      if(this.productNum == 0){
        this.productNum = 1;
      }
    },
    multiBuy(){
      //多人团购-立刻购买
      if(this.chooseSize == null){
        this.$alert('请选择商品规格');
        return;
      }
      let arr = [] , obj = {};
      obj.ProID = this.prouctDetail.ID;//ProID 字段是对应购物车
      obj.ProImg = this.prouctDetail.Img;//ProImg 字段是对应购物车
      obj.ProName = this.prouctDetail.Title;//ProName 字段是对应购物车
      obj.ProPrice = this.prouctDetail.GroupPrice;//ProPrice 字段是对应购物车
      obj.ID = this.sid;//商品规格ID
      obj.Num = this.productNum;//Num 字段是对应购物车
      obj.Specifications = '';//单位：盒
      arr[0] = obj;
      wx.navigateTo({
        url: '../sureOrder/main?type=buyNow&arr='+JSON.stringify(arr) + "&orderType=G"// O:普通购买订单 I:积分订单 G:团购订单
      });
      this.hide();
    }
  }
}
</script>

<style lang='scss' scoped>
$val:130rpx;
.wrap-size{
  &.active{
    opacity: 1;
    visibility: visible;
    .box{
      transform: translateY(0%);
    }
  }
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  opacity: 0;
  transition: all .3s;
  z-index: 9999999;
  @at-root .box{
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: all .3s;
    transform: translateY(100%);
    @at-root .head{
      background-color: #f5f5f5;
      padding-left: $val + 28;
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      .left{
        float: left;
        margin-left: -$val;
        .img{
          width: $val;
          height: $val;
        }
      }
      .right{
        height: $val;
        position: relative;
        padding-left: 30rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .price{
          margin-bottom: 25rpx;
        }
        .iconfont{
          $val:10rpx;
          position: absolute;
          top: -$val;
          right: -$val;
          padding: $val;
        }
      }
    }
    @at-root .content{
      min-height: 390rpx;
      .size,.num{
        display: flex;
        justify-content: space-between;
        .left{
          width: 100rpx;
          min-width: 100rpx;
          white-space: nowrap;
          line-height: 58rpx;
        }
      }
      .size{
        padding: 25rpx 0;
        .right{
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          margin-left: -15rpx;
          span{
            &.active{
              border: 1rpx solid #414d28;
              color: #414d28;
            }
            padding: 0 25rpx;
            line-height: 58rpx;
            border: 1rpx solid #aaa;
            color: #aaa;
            border-radius: 10rpx;
            margin-left: 15rpx;
            margin-bottom: 15rpx;
          }
        }
      }
      .num{
        padding: 25rpx 0;
        .right{
          display: flex;
          align-items: center;
          .vol{
            padding: 0 22rpx;
          }
          .iconfont{
            width: 40rpx;
            height: 40rpx;
            background-color: #e6e6e6;
            border-radius: 6rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    @at-root .foot{
      border-top: 1px solid #dcdcdc;
      height: 110rpx;
      display: flex;
      .buy-now,.add-cart,.sure{
        &.active{
          display: flex;
        }
        flex-grow: 1;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
