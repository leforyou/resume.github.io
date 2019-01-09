<template>
<!--资讯列表-->
<div class="news">
  <ul class="main-padding-lr">
    <li class="border-btm" v-for="(item,index) in newsListArr" :key="index">
      <a class="box" :href="'../newsDetail/main?NewID='+item.ID" hover-class="none">
        <div class="left">
          <img class="img" v-if="url" :src="url+item.img" mode="aspectFill">
        </div>
        <div class="right">
          <p class="title fz30 ellipsis2">{{item.title}}</p>
          <p class="time fz22 fc-999">{{item.ReleaseTime}}</p>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
    props: ['newsListArr'],
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
