<template>
<!--富文本解析-->
<div class="wxParse">
  <wxParse :content="articleHTML" />
</div>
</template>

<script>
import wxParse from 'mpvue-wxparse'
export default {
    props: ['articleHTML'],
    data(){
      return{
        url:this.$url
      }
    },
    components: {
      wxParse
    },
    mounted(){
      
    },
    methods:{
     
    }
}
</script>

<style lang='scss' scoped>

</style>
<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
