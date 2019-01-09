<template>
<!--最新资讯-详情-->
  <div class="container">
    <div class="head main-padding-lr">
      <p class="title fz38">普洱茶“挂杯香”能否评判茶叶好坏？</p>
      <p class="time fz28 fc-999">发布时间：2018-13-18</p>
    </div>

    <div class="content main-padding-lr">
      <img v-if="url" :src="url+'img/slider1.png'" mode="aspectFill" style="width:100%;height:350rpx;">
      <i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">在茶界，顾名思义，“挂杯香”又称“挂杯”，俗称“杯底留香”，就是留存于杯子的香气。即洗茶第一泡从公道杯倒掉后，趁热在杯口闻一下，然后等公道杯稍冷或晃几下再闻的香气或香味。</p>
      <i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">而在品饮普洱茶时，所说的“挂杯”，并非指的是茶汤挂在杯壁上的时间，而是指茶香气留在杯壁上的时间。普洱茶的挂杯香有两种，公道杯香和品茗杯香，而公道杯香又可分为热杯香和冷杯香。</p>
      <i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">挂杯时间越长，留香时间越是持久浓郁，越能说明茶的品质上佳。但不同茶品，其挂杯香浓淡是完全不一样的，有些茶可能热杯香比较明显，杯子冷了香气倒不在了；有的茶可能热杯香、冷杯香都比较浓烈。</p>
    </div>

    <div class="foot main-padding-lr fz28">
      <div class="box border-top">
        <a href="" hover-class="none">
          <span class="prev-next main-color">上一篇：</span>
          <span class="fc-666 ellipsis1">没有了</span>
        </a>
        <a href="" hover-class="none">
          <span class="prev-next main-color">下一篇：</span>
          <span class="fc-666 ellipsis1">让两会成为官员学习面对公众的课堂让两会成为官员学习面对公众的课堂</span>
        </a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    
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
  .head{
    .title{
      margin-bottom: 10rpx;
    }
  }
  .content{
    padding-top: 60rpx;
    padding-bottom: 90rpx;
  }
  .foot{
    .box{
      height: 188rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      a{
        display: flex;
        align-items: center;
        margin: 12rpx 0;
        .prev-next{
          white-space: nowrap;
        }
      }
    }
  }
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #fff;
}
</style>





