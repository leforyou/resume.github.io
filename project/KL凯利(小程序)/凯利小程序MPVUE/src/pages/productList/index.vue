<template>
  <div class="container">
    <div class="head main-padding-lr">
      <ul class="fz28">
        <li @click="tabSwitch(0); allFn();" :class="{'tabActive':tabNum==0}">
          <span class="fc-666">综合</span>
        </li>
        <li @click="tabSwitch(1); salesFn();" :class="{'tabActive':tabNum==1}">
          <span class="fc-666">销量</span>
          <i class="ico" :class="{'active1':salesClass.isA,'active2':salesClass.isB}"></i>
        </li>
        <li  @click="tabSwitch(2); priceFn();" :class="{'tabActive':tabNum==2}">
          <span class="fc-666">价格</span>
          <i class="ico" :class="{'active1':priceClass.isA,'active2':priceClass.isB}"></i>
        </li>
      </ul>
    </div>

    <productList><!--产品列表--></productList>
    <custom-service><!--客服--></custom-service>


  </div>
</template>

<script>
import productList from '@/components/productList'
import customService from '@/components/customService'
export default {
  data () {
    //console.log(this.$url)
    return {
      url:this.$url,
      tabNum:0,
      salesClass:{
        isA:false,
        isB:false
      },
      priceClass:{
        isA:false,
        isB:false
      }
    }
  },
  computed:{
    
  },
  components: {
    productList,customService
  },

  methods: {
    tabSwitch(num){
      this.tabNum = num;
    },
    allFn(){
      this.salesClass.isA = false;
      this.salesClass.isB = false;
      this.priceClass.isA = false;
      this.priceClass.isB = false;
    },
    salesFn(){
      this.priceClass.isA = false;
      this.priceClass.isB = false;
      if(this.salesClass.isA == false && this.salesClass.isB == false){
        this.salesClass.isA = true;
      }else{
        if(this.salesClass.isA == true){
          this.salesClass.isA = false;
          this.salesClass.isB = true;
        }else if(this.salesClass.isB == true){
          this.salesClass.isB = false;
          this.salesClass.isA = true;
        }
      }
    },
    priceFn(){
      this.salesClass.isA = false;
      this.salesClass.isB = false;
      if(this.priceClass.isA == false && this.priceClass.isB == false){
        this.priceClass.isA = true;
      }else{
        if(this.priceClass.isA == true){
          this.priceClass.isA = false;
          this.priceClass.isB = true;
        }else if(this.priceClass.isB == true){
          this.priceClass.isB = false;
          this.priceClass.isA = true;
        }
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
  padding-top: 80rpx;
  .head{
    height: 80rpx;
    background-color: #fff;
    padding-top: 15rpx;
    padding-bottom: 15rpx;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    ul{
      width:100%;
      height: 100%;
      display:flex;
      li{
        &:nth-last-child(1){
          border-right: none;
        }
        &.tabActive{
          span{
            color: $mainColor;
          }
        }
        .ico{
          $width:11rpx;
          &.active1{
            &::before{
              border-color:transparent transparent #7fb414 transparent;
            }
          }
          &.active2{
            &::after{
              border-color:#7fb414 transparent transparent transparent;
            }
          }
          &::before,&::after{
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-width: $width;
            border-style: solid;
          }
          &::before{
            margin-top: -$width - 2;
            border-color:transparent transparent #ccc transparent;
          }
          &::after{
            margin-top: $width + 2;
            border-color: #ccc transparent transparent transparent;
          }
          position: relative;
          display: block;
          height: 30rpx;
          margin-left: 8rpx;
        }
        border-right: 1rpx solid #ededed;
        height: 100%;
        width:33.33%;
        display:flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="scss">
/**能设置本页面与组件的样式**/
page{
  background-color: #ededed;
}
.product{
  margin-top: 20rpx;
  .list{
    margin-bottom: 20rpx;
  }
}
</style>






