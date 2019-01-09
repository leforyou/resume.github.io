<template>
<!--使用优惠券-下单时用-->
  <div class="container">
    <div class="content main-padding-lr">
      <div class="sort not-used">
        <!--可以使用-->
        <div class="state">
          <i class="st-line"></i>
          <p class="title fz26 fc-666">可使用优惠券（1张）</p>
          <i class="st-line"></i>
        </div>
        <ul>
          <li class="sort-list bg-fff">
            <div class="head">
              <p class="price">
                <span class="fz90">50</span>
                <span class="fz38">元</span>
              </p>
              <a href="" class="btn fz24" @click="useCoupons()">使用</a>
              <p class="fz24 fc-666">满500元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：2018.05.11~2018.06.11</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="sort has-used">
        <!--不可使用-->
        <div class="state">
          <i class="st-line"></i>
          <p class="title fz26 fc-666">不可使用优惠券（2张）</p>
          <i class="st-line"></i>
        </div>
        <ul>
          <li class="sort-list bg-fff">
            <div class="head">
              <p class="price">
                <span class="fz90">40</span>
                <span class="fz38">元</span>
              </p>
              <a href="" class="btn fz24">使用</a>
              <p class="fz24 fc-666">满400元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：2018.05.11~2018.06.11</p>
            </div>
          </li>
          <li class="sort-list bg-fff">
            <div class="head">
              <p class="price">
                <span class="fz90">30</span>
                <span class="fz38">元</span>
              </p>
              <a href="" class="btn fz24">使用</a>
              <p class="fz24 fc-666">满300元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：2018.05.11~2018.06.11</p>
            </div>
          </li>
        </ul>
      </div>
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
    useCoupons(){
      wx.navigateBack({
        delta:1
      });
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
  .content{
    .sort{
      .sort-list::before{
        background-color: $mainColor;
      }
      .btn{
        color: $mainColor;
        border: 1rpx solid $mainColor;
      }
    }
    .has-expired,.has-used{
      .sort-list::before{
        background-color: #ccc;
      }
      .btn{
        color: #999;
        border: 1rpx solid #999;
      }
    }
    .sort{
      .state{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 88rpx;
        .st-line{
          width: 50%;
          height: 2rpx;
          background-color: #666;
        }
        .title{
          white-space: nowrap;
          margin: 0 20rpx;
        }
      }
      ul{
        @at-root .sort-list{
          &::before{
            content: '';
            display: block;
            height: 16rpx;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
          }
          $top:56rpx;
          $lr:44rpx;
          position: relative;
          .head{
            padding: $top $lr 38rpx;
            position: relative;
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            .price{
              position: absolute;
              left: $lr;
              top: $top;
            }
            .btn{
              border-radius: 40rpx;
              line-height: 40rpx;
              padding: 0 25rpx;
              margin-bottom: 20rpx;
            }
          }
          .line{
            &::before,&::after{
              content: '';
              display: block;
              position: absolute;
              top: 0%;
              transform: translateY(-50%);
              width: 40rpx;
              height: 40rpx;
              background-color: #ededed;
              border-radius: 100%;
            }
            &::before{
              left: -52rpx;
            }
            &:after{
              right: -52rpx;
            }
            $lr:35rpx;
            display: block;
            margin: 0 35rpx;
            position: relative;
            border-bottom: 4rpx dotted #bbb;
          }
          .foot{
            padding: 0 $lr;
            height: 80rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
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





