<template>
<!--我的钱包-我的余额-->
  <div class="container">
    <div class="head main-padding-lr" id="wrap-head">
      <p class="fz100 main-color">￥88.00</p>
      <a class="put-forward fz24 fc-fff" href="../putForward/main" hover-class="none">提现</a>
    </div>

    <div class="bg-fff margin-btm">
      <div class="tab border-btm bg-fff" :class="{'active':tabFixed}">
        <ul class="fz30">
          <li :class="{'active':tabNum==0}" @click="tabNum=0"><span class="fc-666">钱包明细</span></li>
          <li :class="{'active':tabNum==1}" @click="tabNum=1"><span class="fc-666">退款记录</span></li>
          <li :class="{'active':tabNum==2}" @click="tabNum=2"><span class="fc-666">提现明细</span></li>
        </ul>
      </div>

      <div class="content main-padding-lr" :class="{'active':tabFixed}">
        <div class="detailed" :class="{'active':tabNum==0}">
          <ul>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 微信支付</p>
                <p class="price fz30 active">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 银行支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 余额支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>

            
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 微信支付</p>
                <p class="price fz30 active">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 银行支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 余额支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>

            
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 微信支付</p>
                <p class="price fz30 active">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 银行支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">购买橘红普洱</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 余额支付</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="detailed" :class="{'active':tabNum==1}">
          <ul>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30 active">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30 active">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30 active">+318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">退款</p>
                <p class="fz24 fc-999">2018-05-01 &nbsp;&nbsp; 订单编号：54645464645646</p>
                <p class="price fz30 active">+318.00</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="detailed" :class="{'active':tabNum==2}">
          <ul>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现中</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现失败</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现成功</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30 active">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现中</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现失败</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现中</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
            <li class="cd-list border-btm">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">提现失败</p>
                <p class="fz24 fc-999">2018-05-01</p>
                <p class="price fz30">-318.00</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      url:this.$url,
      tabNum:0,
      tabFixed:false,
      headHeight:0
    }
  },
  computed:{
    
  },
  onReady(){
    this.tabFixed = false;
    this.headHeight = 0;
    wx.pageScrollTo({//将页面滚动到目标位置
      scrollTop: 0,
      duration: 300
    });
    //小程序周期函数：生命周期函数--监听页面初次渲染完成
    var query = wx.createSelectorQuery();//创建节点选择器
    query.select('#wrap-head').boundingClientRect();//选择id
    query.exec((res)=> {//res就是 所有标签为mjltest的元素的信息的数组
      //console.log(res);
      //console.log(res[0].height);//取高度
      this.headHeight = res[0].height;
    });
  },
  onPageScroll: function(res) {
    // Do something when page scroll
    //console.log(res.scrollTop)
    //console.log(res.scrollTop >= this.headHeight,this.headHeight)
    if (res.scrollTop >= this.headHeight) {
      this.tabFixed = true;
    } else {
      this.tabFixed = false;
    }
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
$height:115rpx;
.container{
  .head{
    &::after{
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20rpx;
      background-color: #ededed;
    }
    height: 310rpx;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .put-forward{
      $val:40rpx;
      background-color: #688c1e;
      line-height: $val;
      border-radius: $val;
      padding: 0 20rpx;
    }
  }
  .tab{
    &.active{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
    }
    ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $height;
      li{
        &.active{
          span{
            &::after{
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              left: 28rpx;
              right: 28rpx;
              background-color: $mainColor;
              height: 3rpx;
            }
            color: $mainColor;
          }
        }
        width: 33.33%;
        height: 100%;
        display: flex;
        justify-content: center;
        span{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
      }
    }
  }
  .content{
    &.active{
      padding-top: $height;
    }
    .detailed{
      &.active{
        display: block;
      }
      display: none;
      ul{
        @at-root .cd-list{
          &:nth-last-child(1){
            border-bottom: none;
          }
          display: flex;
          align-items: center;
          height: 145rpx;
          .iconfont{
            margin-right: 28rpx;
          }
          .info{
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            position: relative;
            .title{
              padding-right: 150rpx;
              margin-bottom: 5rpx;
            }
            .price{
              &.active{
                color: #ffa31f;
              }
              position: absolute;
              top: 0;
              right: 0;
            }
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





