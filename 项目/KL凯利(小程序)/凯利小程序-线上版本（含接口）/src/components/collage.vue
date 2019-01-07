<template>
<!--拼团-->
<div class="collage main-padding-lr">
  <ul>
    <li class="position-relative" v-for="(item,index) in groupBuyProductList" :key="index" v-if="item != undefined">
      <div class="head">
        <div class="left">
          <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
          <img class="ico" v-if="url" :src="url+'img/ico-collage.png'">
        </div>
        <div class="right">
          <h1 class="title fz28 ellipsis1">{{item.Title}}</h1>
          <div class="bar">
            <p class="fz22 fc-999">还差{{item.differNum}}人成团</p>
            <div class="line">
              <i class="acitve main-bg" :style="{'width':item.percentage+'%'}"></i>
            </div>
          </div>
          <p class="old-price delete-line fz28 fc-999">￥{{item.Price}}</p>
          <p class="new-price fz36 main-color">￥{{item.GroupPrice}}</p>
          <a href="" class="join main-bg fz26 fc-fff" hover-class="none">立即参团</a>
        </div>
      </div>
      <div class="time">
        <span class="fc-666 fz24">距离活动截止时间：</span>                     
        <span class="square fc-fff fz26 sub-bg">{{item.hourNum}}</span>
        <span class="fc-666 fz24">小时</span>
        <span class="square fc-fff fz26 sub-bg">{{item.minuteNum}}</span>
        <span class="fc-666 fz24">分</span>
        <span class="square fc-fff fz26 sub-bg">{{item.secondNum}}</span>
        <span class="fc-666 fz24">秒</span>
        <!--    
        <span class="fc-666 fz24">距离活动截止时间：</span>                   
        <span class="square fc-fff fz26 sub-bg">{{item.dayNum}}</span>
        <span class="fc-666 fz24">天</span>
        <span class="square fc-fff fz26 sub-bg">{{item.hourNum}}</span>
        <span class="fc-666 fz24">小时</span>
        <span class="square fc-fff fz26 sub-bg">{{item.minuteNum}}</span>
        <span class="fc-666 fz24">分钟</span>-->
      </div>
      <a class="position-absolute" :href="'../productDetailOurBuy/main?PID='+item.PID+'&GroupID='+item.ID+'&differNum='+item.GroupNumber" hover-class="none"></a>
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
        groupBuyProductList:[],
        setIavl:null
      }
    },
    onShow(){
      //生命周期函数--监听页面显示
      this.init();
      this.setIavl = setInterval(()=>{
        this.init();
      },30e3);
    },
    onHide(){
      //生命周期函数--监听页面隐藏-页面切换
      clearInterval(this.setIavl);
    },
    mounted(){
      this.$nextTick(function () {
        /*this.init();
        this.setIavl = setInterval(()=>{
          this.init();
        },10e3);*/
      });
    },
    methods:{
      init(){
        this.getGroupBuyProductList();
      },
      getGroupBuyProductList(){
        //开团商品
        this.$http.get('get/getProductData.aspx',{'ActionName':'getGroupBuyProductList'}).then((res)=>{
          this.groupBuyProductList = res.data.rows;//res.data.rows.slice(0, 2);用li:nth-child(n+3){display: none;}控制团购，只显示前面两个
          this.groupBuyProductList.forEach((item,index) => {
            item.Price = item.Price.toFixed(2);
            item.GroupPrice = item.GroupPrice.toFixed(2);

            let times = this.countDown(item.endGroupTime,index);//剩余天数/小时/分钟
            this.$set(item,'dayNum',times.day);
            this.$set(item,'hourNum',times.hour);
            this.$set(item,'minuteNum',times.minute);
            this.$set(item,'secondNum',times.second);

            let differNum = item.GroupNumber - item.GroupBuySum;//开团还差多少人:总数 减去 已购买的人数
            differNum = Math.max(differNum,0);
            let percentage = item.GroupBuySum*100/item.GroupNumber;//已完成的百分比：已购买的人数 除以 总数
            percentage = Math.min(percentage,100);
            this.$set(item,'differNum',differNum);
            this.$set(item,'percentage',percentage);
          });
        });
        //开团定时器--倒计时

        setInterval(()=>{
          try {
            this.groupBuyProductList.forEach((item,index) => {
              let times = this.countDown(item.endGroupTime,index);//剩余天数/小时/分钟
              this.$set(item,'dayNum',times.day);
              this.$set(item,'hourNum',times.hour);
              this.$set(item,'minuteNum',times.minute);
              this.$set(item,'secondNum',times.second);
            }); 
          } catch (error) {
            
          }
        },1000);
      },
      countDown(val,index){
        //倒计时，返回值是：时/分/秒
        let current = new Date().getTime();//获取当前的时间戳值(js时间戳是毫秒-长度13，php时间戳是秒-长度10)
        let endGroupTime = new Date(val).getTime();//将后台传来的时间【2018/6/23 10:55:51】转成时间戳值

        let residualTime = endGroupTime - current;
        residualTime = parseInt(residualTime/1000);//转化成秒
        if(residualTime>=0){
          let day = 0; //不计算剩余天数
          let hour = parseInt((residualTime) / 3600); //剩余小时
          let minute = parseInt((residualTime) % 3600 / 60); //剩余分钟
          let second = parseInt((residualTime) % 60);  //剩余秒数
          return {'day':day,'hour':hour,'minute':minute,'second':second};
        }else{
          //过期
          delete this.groupBuyProductList[index];//delete删除不会改变数组长度，但是删除的位置变undefined，splice(index,1)删除会改变数组的长度,不能用forEach循环，只能用for倒数循环
          return {'day':0,'hour':0,'minute':0,'second':0};
        }



        /*返回值是：天/时/分
        let current = new Date().getTime();//获取当前的时间戳值(js时间戳是毫秒-长度13，php时间戳是秒-长度10)
        let endGroupTime = new Date(val).getTime();//将后台传来的时间【2018/6/23 10:55:51】转成时间戳值

        let residualTime = endGroupTime - current;
        residualTime = parseInt(residualTime/1000);//转化成秒
        if(residualTime>=0){
          let day = parseInt(residualTime / (24 * 3600)); //剩余天数
          let hour = parseInt((residualTime) % (24 * 3600) / 3600); //剩余小时
          let minute = parseInt((residualTime) % 3600 / 60); //剩余分钟
          let second = parseInt((residualTime) % 60);  //剩余秒数
          return {'day':day,'hour':hour,'minute':minute,'second':second};
        }else{
          //过期
          delete this.groupBuyProductList[index];//delete删除不会改变数组长度，但是删除的位置变undefined，splice(index,1)删除会改变数组的长度,不能用forEach循环，只能用for倒数循环
          return {'day':0,'hour':0,'minute':0,'second':0};
        }*/
      }
    }
}
</script>

<style lang='scss' scoped>
.collage{
  padding-bottom: 20rpx;
  @at-root ul{
    @at-root li{
      &:nth-child(n+3){
        display: none;
      }
      margin-top: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0rpx 0rpx 6rpx rgba(0,0,0, 0.2);
      @at-root .head{
        padding: 30rpx;
        border-bottom: 1px solid #ededed;
        display: flex;
        @at-root .left{
          width: 260rpx;
          position: relative;
          .img{
            width: 260rpx;
            height: 260rpx;
          }
          .ico{
            width: 54rpx;
            height: 56rpx;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        @at-root .right{
          padding-left: 30rpx;
          padding-top: 10rpx;
          padding-bottom: 10rpx;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          @at-root .bar{
            width: 100%;
            @at-root .line{
              width: 100%;
              height: 10rpx;
              border-radius: 10rpx;
              overflow: hidden;
              background-color: #e6e6e6;
              margin-top: 15rpx;
              .acitve{
                height: 100%;
                border-radius: 10rpx;
                display:block;
                position: relative;
                &::after{
                  content: '';
                  display: block;
                  background-color: #fff;
                  width: 6rpx;
                  height: 6rpx;
                  border-radius: 100%;
                  position: absolute;
                  top: 50%;
                  right: 4rpx;
                  transform: translateY(-50%)
                }
              }
            }
          }
          @at-root .join{
            position: absolute;
            right: 0;
            bottom: 10rpx;
            line-height: 66rpx;
            padding: 0 40rpx;
            border-radius: 66rpx;
            white-space: nowrap;
          }
        }
      }
      @at-root .time{
        display: flex;
        align-items: center;
        padding: 22rpx 30rpx;
        .square{
          min-width: 40rpx;
          height: 40rpx;
          padding: 0 6rpx;
          margin: 0 8rpx;
          box-sizing: border-box;
          border-radius: 6rpx;
          display: flex;
          justify-content:center;
          align-items: center;
        }
      }
    }
  }
}
</style>
