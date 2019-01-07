<template>
<!--我的积分-->
  <div class="container">
    <div class="head margin-btm">
      <p class="usable fz24 fc-fff">可用积分</p>
      <p class="num fz80 fc-fff">{{amount}}</p>
      <a href="../integralMall/main" class="mall fz24 fc-fff scale-1px" hover-class="none">
        <span class="fz24 fc-fff">积分商城</span>
        <i class="iconfont icon-gengduo fc-fff fz22"></i>
      </a>
    </div>

    <div class="content margin-btm bg-fff">
      <p class="record main-padding-lr fz30 fc-666 flex-center border-btm">积分记录</p>
      <ul class="main-padding-lr">
        <li class="cd-list border-btm" v-for="(item,index) in memberArr" :key="index">
          <i class="iconfont icon-fangxinjiaoyi fc-999 fz68"></i>
          <div class="info">
            <p class="title fz30 ellipsis1">{{item.Title}}<!--购买橘红普洱--></p>
            <p class="fz24 fc-999 ellipsis2">{{item.CreateTime}}<!--2018-05-01--> &nbsp;&nbsp; {{item.Details}}<!--微信支付--></p>
            <p class="price fz30 active">{{item.TransAmount}} <!-- +318 --></p>
          </div>
        </li>
      </ul>
    </div>
    <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>

  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      memberArr:[],
      amount:0,
      curpage:1,
      pagesize:10
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    this.curpage += 1;
    this.getMember();
  },
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.init();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
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
      this.memberArr=[];
      this.curpage=1;
      this.pagesize=10;
      this.getPointsCount();
      this.getMember();
    },
    getPointsCount(){
      //我的总积分
      var urlData = {
        'ActionName':'myPointsCount'
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          if(res.data.Amount == '' || res.data.Amount==null){
            this.amount = 0;
          }else{
            this.amount = res.data.Amount;
          }
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    getMember(){
      //积分列表
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'myPointsList',
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh.hide();
          this.$refs.refresh.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.TransAmount = element.TransAmount>=0 ? ('+'+element.TransAmount) : element.TransAmount;
            element.CreateTime = element.CreateTime.replace(/\//g,"-").split(" ")[0];
          });
          this.memberArr = this.memberArr.concat(data);
          this.$refs.refresh.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh.hide();
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
  .head{
    $color1:#ff990c;
    $color2:#fac613;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 265rpx;
    background: $color1;
    background: -webkit-linear-gradient(right bottom, $color1 , $color2); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to bottom left, $color1 , $color2); /* 标准的语法（必须放在最后） */
    .usable{

    }
    .num{
      
    }
    .mall{
      &::before{
        border-radius: 40rpx;
        border-color: #fff;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40rpx;
      padding: 0 22rpx;
      .iconfont{
        margin-left: 5rpx;
      }
    }
  }
  .content{
    .record{
      height: 110rpx;
    }
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


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





