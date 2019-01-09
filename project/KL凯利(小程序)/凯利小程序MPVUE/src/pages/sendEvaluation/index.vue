<template>
<!--发表评价-->
  <div class="container">
    <div class="box">
      <div class="content main-padding-lr bg-fff">
        <textarea class="desc fz28" type="text" placeholder="宝贝满足你的期待吗？说说他的优点和美中不足的地方吧" maxlength="200" placeholder-class=".fc-999" auto-height="true"></textarea>
      </div>
      <div class="stars main-padding-lr bg-fff">
        <p class="text fz28">评分</p>
        <i v-for="(item,index) in arrStars" :key="index" class="iconfont flex-center" :class="item.star" @click="starsChoose(index)"></i>



        <!---
        <i class="iconfont flex-center icon-star-full fc-ffc939"></i>
        <i class="iconfont flex-center icon-star-full fc-ffc939"></i>
        <i class="iconfont flex-center icon-star-full fc-ffc939"></i>
        <i class="iconfont flex-center icon-star-half fc-ffc939"></i>
        <i class="iconfont flex-center icon-star-none fc-aaa"></i>
        -->
      </div>
      <div class="wrap-btn main-padding-lr">
        <p class="btn main-bg fz30 fc-fff flex-center">发表评价</p>
      </div>
    </div>
  </div>
</template>

<script>
import stars from './stars'
export default {
  data () {
    return {
      url:this.$url,
      arrStars:[],
      starScore:10 //五星-满分
    }
  },
  beforeMount(){
    this.$data.arrStars = stars(this.starScore);
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    starsChoose(index){
      let num = (index + 1) * 2;
      if(this.starScore == num){
        //点击自己
        if(this.starScore % 2 == 1){
          this.starScore = this.starScore + 1;
          this.$data.arrStars = stars(this.starScore);
        }else if(this.starScore % 2 == 0){
          this.starScore = this.starScore - 1;
          this.$data.arrStars = stars(this.starScore);
        }
      }else{
        this.starScore = num;
        this.$data.arrStars = stars(this.starScore);
      }
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
  .box{
    .content{
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      margin: 20rpx 0;
      .desc{
        min-height: 225rpx;
        width: 100%;
      }
    }
    .stars{
      display: flex;
      align-items: center;
      height: 108rpx;
      .text{
        margin-right: 25rpx;
      }
      .iconfont{
        padding: 0rpx 5rpx;
        height: 100%;
      }
    }
    .wrap-btn{
      margin-top: 80rpx;
      .btn{
        $h:86rpx;
        height: $h;
        border-radius: $h;
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





