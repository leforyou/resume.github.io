<template>
<!--资讯列表-->
<div class="news">
  <ul class="main-padding-lr">
    <li class="border-btm">
      <a class="box" href="../newsDetail/main" hover-class="none">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/product2.jpg'" mode="aspectFill">
        </div>
        <div class="right">
          <p class="title fz30 ellipsis2">普洱茶“挂杯香”能否评判茶叶好坏？</p>
          <p class="time fz22 fc-999">2018-04-25</p>
        </div>
      </a>
    </li>
    <li class="border-btm">
      <a class="box" href="../newsDetail/main" hover-class="none">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/product4.jpg'" mode="aspectFill">
        </div>
        <div class="right">
          <p class="title fz30 ellipsis2">什么样的普洱茶会成为第二个88青？</p>
          <p class="time fz22 fc-999">2018-04-25</p>
        </div>
      </a>
    </li>
    <li class="border-btm">
      <a class="box" href="../newsDetail/main" hover-class="none">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
        </div>
        <div class="right">
          <p class="title fz30 ellipsis2">茶人黄刚：我的普洱仓储观</p>
          <p class="time fz22 fc-999">2018-04-25</p>
        </div>
      </a>
    </li>
    <li class="border-btm">
      <a class="box" href="../newsDetail/main" hover-class="none">
        <div class="left">
          <img class="img" v-if="url" :src="url+'img/product3.jpg'" mode="aspectFill">
        </div>
        <div class="right">
          <p class="title fz30 ellipsis2">从茶席开始，告别美盲</p>
          <p class="time fz22 fc-999">2018-04-25</p>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    props: ['newsList'],
    data(){
      return{
        url:this.$url
      }
    }
}
</script>

<style lang='scss' scoped>
.news{
  @at-root ul{
    background-color: #fff;
    @at-root li{
      $val:150rpx;
      padding-left: $val;
      padding-top: 25rpx;
      padding-bottom: 25rpx;
      &:nth-last-child(1){
        border: none;
      }
      @at-root .box{
        height: $val;
        @at-root .left{
          float: left;
          margin-left: -$val;
          img{
            width: $val;
            height: $val;
          }
        }
        @at-root .right{
          padding-left: 22rpx;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content:space-between;
          .title{
            padding-top: 10rpx;
          }
          .time{
            padding-bottom: 10rpx;
          }
        }
      }
    }
  }
}

</style>
