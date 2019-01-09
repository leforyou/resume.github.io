<template>
<!--购物车-->
  <div class="container">
    <div class="edit-coplete bg-fff margin-btm" :class="{'active':cartList.length!=0}">
      <p class="fz24 fc-999" :class="{'active':isActive == 0}" @click="editCoplete(0)">编辑</p>
      <p class="fz24 fc-999" :class="{'active':isActive == 1}" @click="editCoplete(1)">完成</p>
    </div>

    <div class="product" :class="{'active':cartList.length!=0}"> 
      <ul class="margin-btm">
        <li class="p-list bg-fff margin-top" v-for="(item,index) in cartList" :key="index">
          <div class="choose main-padding-lr" @click="chooseItem(item)"> 
            <i class="iconfont fz20" :class="{'icon-gou':item.IsSelected}"></i>
          </div>
          <a class="img-box" :href="'../productDetail/main?PID='+item.ProID" hover-class="none">
            <img class="img" v-if="url" :src="url+item.ProImg" mode="aspectFill">
          </a>
          <div class="info" :class="{'active':isActive == 1}">
            <h1 class="title fz28 ellipsis1">{{item.ProName}}<!--瀛橘天香  橘红普洱 瀛橘天香橘红普洱瀛橘天橘红普洱瀛橘天香橘红普洱--></h1>
            <p class="num fz26 fc-999">{{item.Specifications}}g/{{item.NvrFd2}}<!--280g/盒--></p>
            <span class="price main-color fz28">￥{{item.ProPrice}}</span>
            <div class="calculate scale-1px" :class="{'active':isActive == 0}">
              <i class="iconfont icon-jianhao fc-999 fz28" @click="changeNum(-1,item)"><!--减号--></i>
              <p class="cal-num fc-999 fz28 border-left-1px border-right-1px">{{item.Num}}</p>
              <i class="iconfont icon-jiahao1 fc-999 fz28" @click="changeNum(+1,item)"><!--加号--></i>
            </div>
          </div>
          <div class="delete flex-center fz24 fc-fff" :class="{'active':isActive == 1}" @click="deleteItem(item)">删除</div>
        </li>
      </ul>
    </div>

    <div class="foot bg-fff" :class="{'active':cartList.length!=0}">
      <div class="left" @click="chooseAll()">
        <i class="iconfont fz20" :class="{'icon-gou':allChecked}"></i>
        <p class="all fz30 fc-666">全选</p>
      </div>
      <div class="right">
        <div class="settled" :class="{'active':isActive == 0}">
          <p class="fz24 sum">合计：{{totalPrice}}</p>
          <p class="fz24 fc-999">不含运费</p>
          <p class="fz30 fc-fff sub-bg jie-suan" @click="submitBalance()">结算</p>
        </div>
        <div class="delete-choose sub-bg fc-fff fz30" :class="{'active':isActive == 1}" @click="deleteAll()">删除</div>
      </div>
    </div>
    <a class="not-product text-center fz28" href="../sort/main" open-type="switchTab" hover-class="none" :class="{'active':notProduct}">
      <i class="iconfont icon-xiazai50 fz80 fc-999"></i>
      <p class="fc-999">购物车空空如也!</p>
      <p class="goto main-color">去逛逛吧！</p>
    </a>
  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import NP from 'number-precision'
export default {
  data () {
    return {
      url:this.$url,
      isActive:0,
      allChecked:false,
      cartList:[],
      notProduct:false,
      totalPrice:0.00
    }
  },
  computed:{
    
  },
  components: {
    
  },
  onLoad: function(options) {
    //加载
    share.distribution(options);
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    return {
      title: share.msg.title,
      path: share.msg.path,
      imageUrl: share.msg.imageUrl,
      success: function(res){
        // 转发成功之后的回调
        if(res.errMsg == 'shareAppMessage:ok'){
          share.shareToFriend();
        }
      },
      fail: function(){
        // 转发失败之后的回调
      },
      complete:function(){
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    }
  },
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.cartListFN();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
  },
  onShow(){
    this.cartListFN();
  },
  mounted(){
    this.$nextTick(function () {
      
    });
  },
  methods: {
    editCoplete(val){
      if(val == 0){
        this.isActive = 1;//编辑--删除
      }else if(val == 1){
        this.isActive = 0;//完成
      }
    },
    submitBalance(){
      //结算-到订单提交
      let num = 0,arr = [];
      for(let i = 0 ; i < this.cartList.length ; i ++){
        if(this.cartList[i].IsSelected == true){
          num ++;
          arr.push(this.cartList[i]);
        }
      }
      if(num==0){
        this.$alert('没有选中商品！');
        return;
      }
      wx.navigateTo({
        url: '../sureOrder/main?type=cart&arr='+JSON.stringify(arr) + "&orderType=O"// O:普通购买订单 I:积分订单 G:团购订单
      });
    },
    cartListFN(){
      //获取购物车列表
      this.cartList = [];
      var urlData = {
        'ActionName':'CartList'
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.notProduct = true;//提示购物车空空如也
        }else if(res.data.msg == 1){
          this.notProduct = false;
          this.cartList = res.data.rows;
          this.cartList.forEach(element => {
            element.ProPrice = element.ProPrice.toFixed(2);
          });
          this.totalPriceFN();
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
    },
    totalPriceFN(){
      //计算总价格
      this.totalPrice = 0;
      let total = 0;
      this.cartList.forEach((item,index)=>{
        if(item.IsSelected == true){
          let priceItemNum = NP.times(item.ProPrice, item.Num);//相乘
          total = NP.plus(total, priceItemNum);//相加
        }
      });
      this.totalPrice = total.toFixed(2);
    },
    changeNum(i,item){
      //加减产品数量
      let num = item.Num + i;
      if(num == 0){
        num = 1;
      }
      this.$set(item,'Num',num);
      this.totalPriceFN();
      this.updateCartProductNum(item.ProID,num);
    },
    chooseItem(item){
      //单选
      if(item.IsSelected){
        this.$set(item,'IsSelected',false);//$set是局部方法
        this.selectProduct(item.ProID,0);
      }else{
        this.$set(item,'IsSelected',true);//$set是局部方法
        this.selectProduct(item.ProID,1);
      }
      let num = 0;
      for(let i = 0 ; i < this.cartList.length ; i ++){
        if(this.cartList[i].IsSelected == true){
          num ++;
        }
      }
      if(num == this.cartList.length){
        this.allChecked = true;
      }else if(num == 0){
        this.allChecked = false;
      }
      this.totalPriceFN();
    },
    chooseAll(){
      //全选、全不选
      let num = 0,arrId = [];
      for(let i = 0 ; i < this.cartList.length ; i ++){
        if(this.cartList[i].IsSelected == true){
          num ++;
        }
        arrId.push(this.cartList[i].ProID);
      }
      this.cartList.forEach((item,index)=>{
        if(num < this.cartList.length){
          this.allChecked = true;
          this.$set(item,'IsSelected',true);
        }else if(num == this.cartList.length){
          this.allChecked = false;
          this.$set(item,'IsSelected',false);
        }
      });
      if(num < this.cartList.length){
        this.selectProduct(arrId.join(','),1);
      }else if(num == this.cartList.length){
        this.selectProduct(arrId.join(','),0);
      }
      this.totalPriceFN();
    },
    async deleteItem(item){
      //单个删除
      var urlData = {
        'ActionName':'DeleteCartByPIDS',
        'pids':item.ID
      };
      let flag = await this.$modal('你确定要该商品吗');
      if(flag==false){
        return;
      }
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
         this.$alert(res.data.msgbox);
         this.cartListFN();
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
      this.totalPriceFN();
    },
    async deleteAll(){
      //批量删除
      let arr = [];
      for(let i = 0 ; i < this.cartList.length ; i ++){
        if(this.cartList[i].IsSelected == true){
          arr.push(this.cartList[i].ID);
        }
      }
      if(arr.length == 0){
        this.$alert('你没有选中要删除的商品！');
        return;
      }
      let flag = await this.$modal('你确定要选中的商品吗');
      if(flag==false){
        return;
      }
      var urlData = {
        'ActionName':'DeleteCartByPIDS',
        'pids':arr.join(',')
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
         this.$alert(res.data.msgbox);
         this.cartListFN();
        }else if(res.data.msg == 2){
          this.$alert();//数据获取失败
        }
      });
      this.totalPriceFN();
    },
    selectProduct(pids,IsSelected){
      //修改购物车商品选中的状态
      var urlData = {
        'ActionName':'SelectProductInCart',
        'pids':pids,
        'IsSelected':IsSelected
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
         //this.$alert(res.data.msgbox);
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
        }
      });
    },
    updateCartProductNum(PID,num){
      //增加和减少购物车商品的数量
      var urlData = {
        'ActionName':'updateCartProductNum',
        'PID':PID,
        'num':num
      };
      this.$http.get('post/postMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
         //this.$alert(res.data.msgbox);
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
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
  $f-height:110rpx;
  padding-bottom: $f-height;
  overflow: hidden;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  @at-root .edit-coplete{
    &.active{
      display: flex;
    }
    height: 82rpx;
    display: none;
    justify-content: flex-end;
    align-items: center;
    p{
      &.active{
        display:flex;
      }
      padding: 0 28rpx;
      height: 100%;
      display: flex;
      align-items: center;
      display: none;
    }
  }
  @at-root .product{
    &.active{
      display: block;
    }
    display: none;
    >ul{
      @at-root .p-list{
        $val:160rpx;
        $deleteWidth:105rpx;
        display: flex;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        position: relative;
        .choose{
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont{
            &.icon-gou{
              background-color: $mainColor;
              border: 1rpx solid $mainColor;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
            }
            width: 38rpx;
            height: 38rpx;
            border-radius: 100%;
            border: 1rpx solid #999;
          }
        }
        .img-box{
          height: $val;
          min-width: $val;
          margin-right: 20rpx;
          img{
            width: $val;
            height: $val;
            border-radius: 10rpx;
          }
        }
        .info{
          &.active{
            padding-right: $deleteWidth;
          }
          position: relative;
          margin-right: 28rpx;
          width: calc(100% - 302rpx);
          box-sizing: border-box;
          .title{
            width: 100%;
          }
          .num{
            margin-top: 5rpx;
          }
          .price{
            position: absolute;
            bottom: 0;
            left: 0;
          }
          .calculate{
            &.active{
              display: flex;
            }
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50rpx;
            display: none;
            align-items: center;
            .iconfont,.cal-num{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              position: relative;
              z-index: 99;
            }
            .iconfont{
              width: 52rpx;
            }
            .cal-num{
              width: 54rpx;
            }
          }
        }
        >.delete{
          &.active{
            display: flex;
          }
          background-color: #5c8802;
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: $deleteWidth;
        }
      }
    }
  }
  @at-root .foot{
    &.active{
      display: flex;
    }
    height: $f-height;
    display: none;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0rpx 0rpx 1rpx rgba($color: #000000, $alpha: 0.1);
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .iconfont{
        &.icon-gou{
          background-color: $mainColor;
          border: 1rpx solid $mainColor;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        width: 38rpx;
        height: 38rpx;
        border-radius: 100%;
        border: 1rpx solid #999;
        margin:0 20rpx;
      }
    }
    .right{
      height: 100%;
      min-width: 50%;
      .active{
        display: flex !important;
      }
      .settled{
        $val:190rpx;
        display: none;
        height: 100%;
        padding-right: $val+30;
        position: relative;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        .sum{
          color: #688c1e;
        }
        .jie-suan{
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: $val;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .delete-choose{
        display: none;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @at-root .not-product{
    &.active{
      display: flex;
    }
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i,p{
      padding-bottom: 10rpx;
    }
    .goto{
      margin-bottom: 30%;
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





