<template>
<!--帮助中心-->
  <div class="container">
    <div class="box">
      <ul class="fz28">
        <li class="main-padding-lr border-btm" v-for="(item,index) in arr" :key="index">
          <a :href="'../helpDetail/main?aid='+item.ID" hover-class="none">{{item.NvrFd1}}</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      arr:[]
    }
  },
  computed:{
    
  },
  components: {
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.getCenterList();
    });
  },
  methods: {
    getCenterList(){
      var urlData = {
        'ActionName':'getHelpCenterList'
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$alert(res.data.msgbox);
        }else if(res.data.msg == 1){
          this.arr = res.data.rows;
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  .box{
    ul{
      li{
        a{
          padding: 40rpx 0;
          line-height: 1.6;
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





