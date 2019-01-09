<template>
<!--首页-公告-->
  <div class="container">
    <div class="head main-padding-lr hide">
      <p class="title fz38">公告</p>
    </div>
    <div class="content main-padding-lr margin-btm"> 
      <p class="fz30 fc-666">{{message}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      message:''
    }
  },
  onLoad(options){
    this.message = options.msg;
  },
  computed:{
    
  },
  components: {
    
  },
  methods: {
    
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  .head{
    padding-top: 40rpx;
    padding-bottom: 40rpx;
  }
  .content{
    padding-top: 10rpx;
    p{
      line-height:1.8;
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





