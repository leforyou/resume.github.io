<template>
<!--我的评论-->
  <div class="container">
    <ul>
      <li class="list main-padding-lr margin-btm bg-fff">
        <div class="head">
          <div class="person">
            <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
            <span class="name fz30">刘先生</span>
          </div>
          <div class="star fz50">
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
        </div>
      </li>
      <li class="list main-padding-lr margin-btm bg-fff">
        <div class="head">
          <div class="person">
            <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
            <span class="name fz30">刘先生</span>
          </div>
          <div class="star fz50">
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
        </div>
      </li>
      <li class="list main-padding-lr margin-btm bg-fff">
        <div class="head">
          <div class="person">
            <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
            <span class="name fz30">刘先生</span>
          </div>
          <div class="star fz50">
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
        </div>
      </li>
      <li class="list main-padding-lr margin-btm bg-fff">
        <div class="head">
          <div class="person">
            <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
            <span class="name fz30">刘先生</span>
          </div>
          <div class="star fz50">
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
        </div>
      </li>
      <li class="list main-padding-lr margin-btm bg-fff">
        <div class="head">
          <div class="person">
            <img v-if="url" :src="url+'img/slider-product-detail.jpg'" mode="aspectFill">
            <span class="name fz30">刘先生</span>
          </div>
          <div class="star fz50">
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。</p>
        </div>
      </li>
      
    </ul>

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
.container{
  overflow: hidden;
  .margin-btm{
    margin-bottom: 20rpx;
  }
  ul{
    margin-top: 20rpx;
    @at-root .list{
      @at-root .head{
        height: 120rpx;
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 50rpx;
        @at-root .person{
          display: flex;
          align-items: center;
          img{
            width: 60rpx;
            height: 60rpx;
            background-color: #ddd;
            border-radius: 100%;
            overflow: hidden;
          }
          @at-root .name{
            margin-left: 20rpx;
          }
        }
        @at-root .star{
          display: flex;
          flex-wrap: nowrap;
          margin-left: 60rpx;
          .iconfont{
            margin-left:6rpx;
          }
        }
        @at-root .delete{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          padding: 5rpx;
        }
      }
      @at-root .content{
        line-height: 1.5;
        padding-bottom: 40rpx;
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





