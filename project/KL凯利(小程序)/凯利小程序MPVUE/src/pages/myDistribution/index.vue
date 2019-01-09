<template>
<!--我的分销-->
  <div class="container">
    <div class="head flex-center">
      <p class="fz24 fc-fff">累计收益</p>
      <p class="fz80 fc-fff">546.00</p>
    </div>

    <div class="distribution">
      <ul class="fz30">
        <li>
          <a class="box flex-center" href="../promoteOrder/main" hover-class="none">
            <i class="iconfont icon-dingdan flex-center fc-fff fz50"></i>
            <p class="title fc-666">推广订单</p>
            <p class="num">
              <span class="main-color">5</span>
              <span class="fc-666">个</span>
            </p>
          </a>
        </li>
        <li>
          <a class="box flex-center" href="../myTeam/main" hover-class="none">
            <i class="iconfont icon-tuandui flex-center fc-fff fz68"></i>
            <p class="title fc-666">我的团队</p>
            <p class="num">
              <span class="main-color">0</span>
              <span class="fc-666">个</span>
            </p>
          </a>
        </li>
        <li>
          <!--<button class="box flex-center share btn-reset" open-type="share"></button>-->
          <a class="box flex-center" href="../promoteStart/main" hover-class="none">
            <i class="iconfont icon-zhuanfa flex-center fc-fff fz50"></i>
            <p class="title fc-666">开始推广</p>
          </a>
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
  .head{
    $color1:#97d024;
    $color2:#8dc51e;
    height: 260rpx;
    flex-direction: column;
    background: $color1;
    background: -webkit-linear-gradient(top bottom, $color1 , $color2); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to bottom top, $color1 , $color2); /* 标准的语法（必须放在最后） */
  }
  .distribution{
    margin-top: 60rpx;
    ul{
      display: flex;
      li{
        width: 33.33%;
        .box{
          flex-direction: column;
          .iconfont{
            width: 110rpx;
            height: 110rpx;
            border-radius: 100%;
          }
          .icon-dingdan{
            background-color: #ff9c0c;
          }
          .icon-tuandui{
            background-color: #ff620c;
          }
          .icon-zhuanfa{
            background-color: #2c9ef6;
          }
          .title{
            margin: 15rpx 0;
          }
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





