<template>
<!--商品详情-猜你喜欢-->
<div class="recommended">
  <div class="head fz30 fc-999">猜你喜欢</div>
  <ul>
    <li class="list" v-for="(item,index) in productListArr" :key="index">
      <a class="box" :href="'../productDetail/main?PID='+item.ID">
        <img v-if="url" :src="url+item.Img" mode="aspectFill">
        <div class="info">
          <p class="title fz28 ellipsis1">{{item.Title}}</p>
          <div class="price">
            <span class="new main-color fz36">￥{{item.Price}}</span>
            <span class="old fz22 fc-999 delete-line">￥{{item.Price0}}</span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: [''],
  data(){
    return{
      url:this.$url,
      curpage:1,
      pagesize:4,
      productListArr:[]
    }
  },
  onShow(){
    
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.productListFn();
    });
  },
  methods:{
    productListFn(){
      //产品列表
      var urlData = {
        'ActionName':'getProuctList',
        'orderF':'',
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.productListArr = res.data.rows;
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    }
  }
}
</script>

<style lang='scss' scoped>
$val:20rpx;
.recommended{
  padding-left: $val;
  padding-right: $val;
  .head{
    &::before,&::after{
      content: '';
      display: block;
      width: 268rpx;
      border-bottom: 1px solid #b3b3b3;
      position: absolute;
      top: 50%;
    }
    &::before{
      left: 0;
    }
    &::after{
      right: 0;
    }
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    position: relative;
  }
  ul{
    margin-right: -$val;
    display: flex;
    flex-wrap: wrap;
    @at-root .list{
      width: 50%;
      padding-right: $val;
      padding-bottom: $val;
      box-sizing: border-box;
      @at-root .box{
        display: block;
        border-radius: 12rpx;
        overflow: hidden;
        background-color: #fff;
        img{
          width: 100%;
          height: 344rpx;
        }
        @at-root .info{
          padding: 20rpx;
          .price{
            margin-top: 30rpx;
            .new{
              margin-right: 16rpx;
            }
          }
        }
      }
    }
  }
}
</style>
