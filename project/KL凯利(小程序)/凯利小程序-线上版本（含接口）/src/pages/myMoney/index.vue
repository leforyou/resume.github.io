<template>
<!--我的钱包-我的余额-->
  <div class="container">
    <div class="head main-padding-lr" id="wrap-head">
      <p class="fz100 main-color">￥{{balance}}</p>
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
            <li class="cd-list border-btm" v-for="(item,index) in arr1" :key="index">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">{{item.Title}}<!--购买橘红普洱--></p>
                <p class="fz24 fc-999">{{item.CreateTime}}<!--2018-05-01--> &nbsp;&nbsp; {{item.Details}}<!--余额支付--></p>
                <p class="price fz30">{{item.TransAmount}}<!---318.00--></p>
              </div>
            </li>
          </ul>
          <DropDownRefresh ref="refresh1"><!--下拉刷新动画--></DropDownRefresh>
        </div>

        <div class="detailed" :class="{'active':tabNum==1}">
          <ul>
            <li class="cd-list border-btm" v-for="(item,index) in arr2" :key="index">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">{{item.Title}}<!--退款--></p>
                <p class="fz24 fc-999">{{item.CreateTime}}<!--2018-05-01--> &nbsp;&nbsp; {{item.Details}}<!--订单编号：54645464645646--></p>
                <p class="price fz30 active">{{item.TransAmount}}<!--+318.00--></p>
              </div>
            </li>
          </ul>
          <DropDownRefresh ref="refresh2"><!--下拉刷新动画--></DropDownRefresh>
        </div>

        <div class="detailed" :class="{'active':tabNum==2}">
          <ul>
            <li class="cd-list border-btm" v-for="(item,index) in arr3" :key="index">
              <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
              <div class="info">
                <p class="title fz30 ellipsis1">{{item.Title}}<!--提现失败--></p>
                <p class="fz24 fc-999">{{item.CreateTime}}<!--2018-05-01--></p>
                <p class="price fz30">{{item.TransAmount}}<!---318.00--></p>
              </div>
            </li>
          </ul>
          <DropDownRefresh ref="refresh3"><!--下拉刷新动画--></DropDownRefresh>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      tabNum:0,
      tabFixed:false,
      headHeight:0,
      balance:0,
      refundArr:[],
      putforwardArr:[],
      curpage1:1,
      pagesize1:10,
      arr1:[],
      curpage2:1,
      pagesize2:10,
      arr2:[],
      curpage3:1,
      pagesize3:10,
      arr3:[]
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh
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
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.init();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.tabNum == 0){
      this.curpage1 += 1;
      this.getWalletDetailList1();
    }else if(this.tabNum == 1){
      this.curpage2 += 1;
      this.getWalletDetailList2();
    }else if(this.tabNum == 2){
      this.curpage3 += 1;
      this.getWalletDetailList3();
    }
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
  mounted(){
    this.$nextTick(function () {
      
    });
  },
  onShow(){
    //每次进入页面都会刷新数据，判断条件是处理第一次进入该页面没加载组件报错的问题
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
  methods: {
    init(){
      this.curpage1=1;
      this.pagesize1=10;
      this.arr1=[];
      this.curpage2=1;
      this.pagesize2=10;
      this.arr2=[];
      this.curpage3=1;
      this.pagesize3=10;
      this.arr3=[];
      this.getWalletDetailList1();
      this.getWalletDetailList2();
      this.getWalletDetailList3();
      this.getBalance();
    },
    getBalance(){
      //获取钱包余额
      var urlData = {
        'ActionName':'getbalance'
      };
      this.$http.get('/post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.balance = NP.plus(res.data.rows[0].Amount, 0).toFixed(2);
          if (this.balance == null || this.balance == '')this.balance = '0.00';
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    getWalletDetailList1(){
      //钱包明细流水
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'myWalletDetailList',
        'wtype':'',
        'curpage':this.curpage1,
        'pagesize':this.pagesize1
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.TransAmount = element.TransAmount>0 ? ('+'+element.TransAmount) : element.TransAmount;
            element.CreateTime = element.CreateTime.replace(/\//g,"-").split(" ")[0];
          });
          this.arr1 = this.arr1.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getWalletDetailList2(){
      //钱包明细流水
      this.$refs.refresh2.show();
      var urlData = {
        'ActionName':'myWalletDetailList',
        'wtype':1,
        'curpage':this.curpage2,
        'pagesize':this.pagesize2
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh2.hide();
          this.$refs.refresh2.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.TransAmount = element.TransAmount>0 ? ('+'+element.TransAmount) : element.TransAmount;
            element.CreateTime = element.CreateTime.replace(/\//g,"-").split(" ")[0];
          });
          this.arr2 = this.arr2.concat(data);
          this.$refs.refresh2.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh2.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getWalletDetailList3(){
      //钱包明细流水
      this.$refs.refresh3.show();
      var urlData = {
        'ActionName':'myWalletDetailList',
        'wtype':2,
        'curpage':this.curpage2,
        'pagesize':this.pagesize2
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh3.hide();
          this.$refs.refresh3.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.TransAmount = element.TransAmount>=0 ? ('+'+element.TransAmount) : element.TransAmount;
            element.CreateTime = element.CreateTime.replace(/\//g,"-").split(" ")[0];
          });
          this.arr3 = this.arr3.concat(data);
          this.$refs.refresh3.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh3.hide();
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





