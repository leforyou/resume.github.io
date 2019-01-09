<template>
<!--搜索-->
  <div class="container">
    <div class="search-page">
      <search isCanInput="true">
        <!--搜索-->
        <input class="search-content" type="search" placeholder="搜索" :value="searchContent" confirm-type="search" focus="true" v-model="searchContent" @confirm="searchFn()" @input="keysDown">
      </search>
    </div>

    <div class="history-record bg-fff" :class="{'active':type==0}">
      <ul class="main-padding-lr fz24">
        <li class="fc-999 border-btm">橘红普洱</li>
        <li class="fc-999 border-btm">红茶</li>
        <li class="fc-999 border-btm">绿茶</li>
        <li class="fc-999 border-btm">黑茶</li>
        <li class="fc-999 border-btm">大红袍</li>
        <li class="fc-999 border-btm">好茶</li>
        <li class="fc-999 border-btm">龙井茶</li>
        <li class="fc-999 border-btm">青茶</li>
      </ul>
      <div class="wrap-btn text-center">
        <p class="btn fz24">清除历史搜索</p>
      </div>
    </div>

    <div class="search-tips bg-fff" :class="{'active':type==1}">
      <ul class="main-padding-lr fz24">
        <li class="border-btm">大红袍</li>
        <li class="border-btm">好茶</li>
        <li class="border-btm">龙井茶</li>
        <li class="border-btm">绿茶</li>
        <li class="border-btm">黑茶</li>
        <li class="border-btm">青茶</li>
        <li class="border-btm">橘红普洱</li>
        <li class="border-btm">红茶</li>
      </ul>
    </div>
    

    <div class="search-product" :class="{'active':type==2}">
      <productList><!--产品列表--></productList>
    </div>
  </div>
</template>

<script>
import search from '@/components/search'
import productList from '@/components/productList'
export default {
  data () {
    return {
      url:this.$url,
      searchContent:'',
      type:0
    }
  },
  watch:{

  },
  computed:{
    
  },
  components: {
    search,productList
  },
  methods: {
    searchFn(){
      this.type = 2;
      console.log(this.searchContent)
    },
    keysDown(event){
      //console.log('我是输出的内容',event,event.mp.detail.value,event.mp.detail.keyCode )
      if(this.searchContent != '' && event.target.keyCode != 8){//event.target.keyCode只有在手机中调试，才有显示，在电脑不显示该属性
        //搜索提示
        this.type = 1;
      }else if(this.searchContent == '' && event.target.keyCode != 8){
        //显示历史记录
        this.type = 0;
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
  padding-top: 130rpx;
  height: 100%;
  box-sizing: border-box;
}
.history-record,.search-tips,.search-product{
  display: none;
  height: 100%;
  &.active{
    display: block;
  }
}
.history-record,.search-tips{
  >ul{
    >li{
      line-height: 86rpx;
    }
  }
  .wrap-btn{
    padding: 60rpx 0rpx 30rpx;
    .btn{
      $color:rgb(255, 40, 40);
      display: inline-block;
      padding: 0 20rpx;
      line-height: 70rpx;
      border: 1rpx solid $color;
      color: $color;
    }
  }
}
.search-tips{

}
.search-product{
  margin-top: 20rpx;
}
</style>



<style lang='scss'>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
.search-page{
  position: fixed;
  top:0;
  left: 0;
  right:0;
  z-index: 9999;
}
.search-product{
  .list{
    margin-bottom: 20rpx;
  }
}
</style>





