<template>
<!--最新资讯-->
  <div class="container">
    <div class="margin-top margin-btm">
      <news-list><!--资讯列表--></news-list>
    </div>

  </div>
</template>

<script>
import newsList from '@/components/newsList'
export default {
  data () {
    return {
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    newsList
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
  
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





