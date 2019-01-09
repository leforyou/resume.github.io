<template>
<!--产品列表-->
<div class="product">
  <ul>
    <li class="list position-relative main-padding-lr" v-for="(item,index) in productListArr" :key="index">
      <div class="left">
        <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
      </div>
      <div class="right">
        <h1 class="title fz28 ellipsis2">{{item.Title}}</h1>
        <p class="num fz26 fc-999">{{item.NvrFd15}}g/{{item.SpecificationName}}<!--280g/盒--></p>
        <div class="price">
          <span class="new main-color fz36">￥{{item.Price}}</span>
          <span class="old fz22 fc-999 delete-line">￥{{item.Price0}}</span>
        </div>
        <a :href="'../productDetail/main?PID='+item.ID" class="buy-now main-color fz22" hover-class="none" open-type="navigate">立即购买</a>
      </div>
      <a :href="'../productDetail/main?PID='+item.ID" class="position-absolute" hover-class="none" open-type="navigate"></a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    props: ['productListArr'],
    data(){
      return{
        url:this.$url
      }
    },
    methods:{
      
    }
}
</script>

<style lang='scss' scoped>
.product{
  @at-root ul{
    @at-root .list{
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      display: flex;
      background-color: #fff;
      position: relative;
      @at-root .left{
        img{
          width: 210rpx;
          height: 210rpx;
          border-radius: 10rpx;
          vertical-align: middle;
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
        .title{

        }
        .num{

        }
        .price{
          position: absolute;
          bottom: $val;
          left: $right;
          .new{
            margin-right: 16rpx;
          }
          .old{

          }
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

</style>
