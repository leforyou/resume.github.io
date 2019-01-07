<template>
<!--我的团队-->
  <div class="container">
    <div class="team">
      <ul class="margin-btm">
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">刘小姐</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">曾先生</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">何小姐</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">周先生</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">刘小姐</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">曾先生</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">何小姐</p>
        </li>
        <li class="main-padding-lr bg-fff margin-top">
          <img class="person-pic pic-bg" v-if="url" :src="url+'img/product1.jpg'" mode="aspectFill">
          <p class="name fz28">周先生</p>
        </li>
      </ul>
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
  .team{
    ul{
      li{
        height: 110rpx;
        display: flex;
        align-items: center;
        .person-pic{
          width: 70rpx;
          height: 70rpx;
          margin-right: 40rpx;
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
  background-color: #ededed;
}
</style>





