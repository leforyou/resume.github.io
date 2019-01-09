<template>
<!--推广订单-->
  <div class="container">
    <div class="wrap-orders margin-btm" v-for="(item,index) in arr1" :key="index">
      <ul class="order">
        <!--<li class="list bg-fff margin-top" v-if="item.Status == '未处理'">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="item.Headimgurl" mode="aspectFill">
            <p class="fc-999">{{item.nickName}}</p>
            <p class="main-color">等待买家付款</p>
          </div>
          <a class="content main-padding-lr" href="" hover-class="none">
            <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
              <div class="left">
                <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">{{item.ProductName}}</p>
                <p class="price fz28">￥{{list.Price}}</p>
                <p class="num fz28 fc-999">x{{list.Num}}</p>
              </div>
            </div>
          </a>
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥{{item.Total0}}</div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥{{item.rebatesum}}</p>
          </div>
        </li>

        <li class="list bg-fff margin-top" v-if="item.Status == '处理中'">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="item.Headimgurl" mode="aspectFill">
            <p class="fc-999">{{item.nickName}}</p>
            <p class="main-color">等待商家发货</p>
          </div>
          <a class="content main-padding-lr" href="" hover-class="none">
            <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
              <div class="left">
                <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">{{item.ProductName}}</p>
                <p class="price fz28">￥{{list.Price}}</p>
                <p class="num fz28 fc-999">x{{list.Num}}</p>
              </div>
            </div>
          </a>
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥{{item.Total0}}</div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥{{item.rebatesum}}</p>
          </div>
        </li>-->

        <li class="list bg-fff margin-top">
          <div class="head main-padding-lr fz24">
            <img class="person-pic pic-bg" v-if="url" :src="item.Headimgurl" mode="aspectFill">
            <p class="fc-999">{{item.nickName}}<!--刘小姐--></p>
            <p class="main-color">交易完成</p>
          </div>
          <a class="content main-padding-lr" href="" hover-class="none">
            <div class="content-box" v-for="(list,indexlist) in item.itemrows" :key="indexlist">
              <div class="left">
                <img class="img" v-if="url" :src="url+list.ProductImg" mode="aspectFill">
              </div>
              <div class="right">
                <p class="title fz28 ellipsis2">{{item.ProductName}}<!--瀛橘天香  橘红普洱--></p>
                <p class="price fz28">￥{{list.Price}}<!--￥318.00--></p>
                <p class="num fz28 fc-999">x{{list.Num}}<!--x1--></p>
              </div>
            </div>
          </a>
          <div class="total-price fz24 fc-666 main-padding-lr">合计：￥{{item.Total0}}<!--￥318.00--></div>
          <div class="foot border-top fz28 main-padding-lr">
            <p>我的收益：</p>
            <p class="main-color">￥{{item.rebatesum}}<!--30.00--></p>
          </div>
        </li>
      </ul>
    </div>
    <DropDownRefresh  ref="refresh1"><!--下拉刷新动画--></DropDownRefresh>
  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      curpage1:1,
      pagesize1:10,
      arr1:[]
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    this.curpage1 += 1;
    this.getOrder();
  },
  onShow(){
    /*let setIval = setInterval(()=>{
      if(Object.keys(this.$refs).length != 0){
        this.init();
        clearInterval(setIval);
      }
    },30);*/
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      
    });
  },
  methods: {
    init(){
      this.curpage1 = 1;
      this.arr1=[];
      this.getOrder();
    },
    getOrder(){
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'myGeneralizeOrderList',
        'pagesize':this.pagesize1,
        'curpage':this.curpage1
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 1){
          let rebatesum = NP.divide(res.data.rebatesum,100);//受益=订单金额*(rebatesum/100)
          let data = res.data.rows;
          data.forEach(element => {
            element.rebatesum = NP.times(element.Total0,rebatesum);//乘以比率
            element.Total0 = NP.plus(element.Total0,0).toFixed(2);
            element.itemrows.forEach(item => {
              item.Price = NP.plus(item.Price,0).toFixed(2);
            });
          });
          this.arr1 = this.arr1.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
          this.$alert();//数据获取失败
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
  .wrap-orders{
    .order{
      .head{
        height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 118rpx;
        position: relative;
        .person-pic{
          position: absolute;
          left: 28rpx;
          width: 70rpx;
          height: 70rpx;
        }
      }
      .content{
        background-color: #fafafa;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        .content-box{
          $val:160rpx;
          display: flex;
          padding-bottom:10rpx;
          &:nth-last-child(1){
            padding-bottom:0rpx;
          }
          .left{
            min-width: $val;
            width: $val;
            img{
              width: $val;
              height: $val;
              border-radius: 12rpx;
              overflow: hidden;
              vertical-align: middle;
            }
          }
          .right{
            $val:10rpx;
            position: relative;
            padding-left: 20rpx;
            padding-right: 150rpx;
            padding-top: $val;
            width:100%;
            .price,.num{
              position: absolute;
              right: 0;
            }
            .price{
              top: $val;
            }
            .num{
              top: 70rpx;
            }
          }
        }
      }
      .total-price{
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .foot{
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
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





