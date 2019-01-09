<template>
  <div class="container">
    <!--我的优惠券-->
    <div class="head-nav bg-fff main-padding-lr">
      <div class="box">
        <p class="fz28 fc-666" :class="{'active':tabNum==0}" @click="tabNum=0">未使用</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==1}" @click="tabNum=1">已使用</p>
        <p class="fz28 fc-666" :class="{'active':tabNum==2}" @click="tabNum=2">已过期</p>
      </div>
    </div>

    <div class="content main-padding-lr">
      <div class="sort not-used" :class="{'active':tabNum==0}">
        <!--未使用-->
        <ul>
          <li class="sort-list bg-fff" v-for="(item,index) in arr1" :key="index">
            <div class="head">
              <p class="price">
                <span class="fz90">{{item.Denomination}}</span>
                <span class="fz38">元</span>
              </p>
              <a :href="'../sort/main'" open-type="switchTab" class="btn fz24">使用</a>
              <p class="fz24 fc-666">满{{item.LimitAmount}}元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：{{item.StartDate}}~{{item.EndDate}}</p>
            </div>
          </li>
        </ul>
        <DropDownRefresh  ref="refresh1"><!--下拉刷新动画--></DropDownRefresh>
      </div>
      <div class="sort has-used" :class="{'active':tabNum==1}">
        <!--已使用-->
        <ul>
          <li class="sort-list bg-fff" v-for="(item,index) in arr2" :key="index">
            <div class="head">
              <p class="price">
                <span class="fz90">{{item.Denomination}}</span>
                <span class="fz38">元</span>
              </p>
              <a href="" class="btn fz24">已使用</a>
              <p class="fz24 fc-666">满{{item.LimitAmount}}元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：{{item.StartDate}}~{{item.EndDate}}</p>
            </div>
          </li>
        </ul>
        <DropDownRefresh  ref="refresh2"><!--下拉刷新动画--></DropDownRefresh>
      </div>
      <div class="sort has-expired" :class="{'active':tabNum==2}">
        <!--已过期-->
        <ul>
          <li class="sort-list bg-fff" v-for="(item,index) in arr3" :key="index">
            <div class="head">
              <p class="price">
                <span class="fz90">{{item.Denomination}}</span>
                <span class="fz38">元</span>
              </p>
              <a href="" class="btn fz24">已过期</a>
              <p class="fz24 fc-666">满{{item.LimitAmount}}元可用</p>
            </div>
            <i class="line"></i>
            <div class="foot">
              <p class="fz24 fc-bbb">瀛橘天香</p>
              <p class="fz24 fc-bbb">有效期：{{item.StartDate}}~{{item.EndDate}}</p>
            </div>
          </li>
        </ul>
        <DropDownRefresh  ref="refresh3"><!--下拉刷新动画--></DropDownRefresh>
      </div>
    </div>
  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      tabNum:0,
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
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.tabNum == 0){
      this.curpage1 += 1;
      this.getCoupons1();
    }else if(this.tabNum == 1){
      this.curpage2 += 1;
      this.getCoupons2();
    }else if(this.tabNum == 2){
      this.curpage3 += 1;
      this.getCoupons3();
    }
  },
  onShow(){
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  mounted(){
    this.$nextTick(function () {
      
    });
  },
  methods: {
    init(){
      this.arr1 = [];
      this.arr2 = [];
      this.arr3 = [];
      this.curpage1 = 1;
      this.curpage2 = 1;
      this.curpage3 = 1;
      this.getCoupons1();
      this.getCoupons2();
      this.getCoupons3();
    },
    getCoupons1(){
      //未使用
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'getVoucherList',
        'Status':1,
        'curpage':this.curpage1,
        'pagesize':this.pagesize1
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.StartDate = element.StartDate.replace(/\//,".").split(" ")[0];
            element.EndDate = element.EndDate.replace(/\//,".").split(" ")[0];
          });
          this.arr1 = this.arr1.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getCoupons2(){
      //已使用
      this.$refs.refresh2.show();
      var urlData = {
        'ActionName':'getVoucherList',
        'Status':2,
        'curpage':this.curpage2,
        'pagesize':this.pagesize2
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.StartDate = element.StartDate.replace(/\//,".").split(" ")[0];
            element.EndDate = element.EndDate.replace(/\//,".").split(" ")[0];
          });
          this.arr2 = this.arr2.concat(data);
          this.$refs.refresh2.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh2.hide();
          this.$refs.refresh2.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh2.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    getCoupons3(){
      //已过期
      this.$refs.refresh3.show();
      var urlData = {
        'ActionName':'getVoucherList',
        'Status':3,
        'curpage':this.curpage2,
        'pagesize':this.pagesize2
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.StartDate = element.StartDate.replace(/\//,".").split(" ")[0];
            element.EndDate = element.EndDate.replace(/\//,".").split(" ")[0];
          });
          this.arr3 = this.arr3.concat(data);
          this.$refs.refresh3.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh3.hide();
          this.$refs.refresh3.notMore();
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
$height:80rpx;
.container{
  margin-bottom: 20rpx;
  padding-top: $height;
  overflow: hidden;
  .head-nav{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $height;
      p{
        $val:50rpx;
        &.active{
          &::after{
            content: "";
            display: block;
            position: absolute;
            left: $val+10;
            right: $val+10;
            bottom: 0;
            border-bottom: 3rpx solid $mainColor;
          }
          color: $mainColor;
        }
        height: 100%;
        padding: 0 $val;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
  }
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
      &.active{
        display: block;
      }
      display: none;
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
          margin-top: 30rpx;
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





