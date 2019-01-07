<template>
<!--银行卡绑定-->
  <div class="container">
    <div class="box margin-top bg-fff main-padding-lr">
      <ul class="fz28">
        <li class="border-btm">
          <p class="name">姓名</p>
          <input class="key-value" type="text" placeholder="姓名" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">手机号码</p>
          <input class="key-value" type="number" placeholder="11位手机号码" maxlength="11" placeholder-class=".fc-999">
        </li>
        <li class="border-btm">
          <p class="name">银行卡号</p>
          <input class="key-value" type="number" placeholder="银行卡号信息" placeholder-class=".fc-999">
        </li>
      </ul>
    </div>
    <div class="wrap-btns main-padding-lr">
      <p class="btn btn-sure flex-center fz30 fc-fff main-bg">确认保存</p>
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
  .box{
    ul{
      .head{
        height: 175rpx;
        .person-pic{
          width: 120rpx;
          height: 120rpx;
        }
      }
      li{
        display: flex;
        align-items: center;
        min-height: 88rpx;
        position: relative;
        .name{
          width: 210rpx;
          min-width: 210rpx;
        }
        .key-value{
          width: 100%;
        }
        .iconfont{
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .wrap-btns{
    margin-top: 80rpx;
    .btn{
      $h:86rpx;
      height: $h;
      border-radius: $h;
    }
    .btn-sure{
      margin-bottom: 40rpx;
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





