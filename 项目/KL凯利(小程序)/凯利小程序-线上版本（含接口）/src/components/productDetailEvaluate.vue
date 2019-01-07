<template>
<!--商品评价-->
<div class="evaluate">
  <ul>
    <li class="list main-padding-lr border-btm" v-for="(item,itemIndex) in evaluateArr" :key="itemIndex">
      <div class="head">
        <div class="person">
          <img class="pic-bg" v-if="url"  :src="item.Headimgurl" mode="aspectFill"><!--头像-->
          <span class="name fz30">{{item.NickName}}<!--刘先生--></span>
        </div>
        <div class="star fz50">
          <i v-for="(item,indexStar) in item.starsArr" :key="indexStar" class="iconfont flex-center" :class="item.star"></i>
        </div>
      </div>
      <div class="content">
        <p class="ellipsis4 fz28 fc-666">{{item.Details}}<!--评论内容--></p>
      </div>
    </li>
  </ul>
  <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
</div>
</template>

<script>
import stars from '@/utils/stars.js'
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  props: ['PID','detailsEvaluate'],
  data(){
    return{
      url:this.$url,
      evaluateArr:[],
      curpage:1,
      pagesize:10
    }
  },
  components:{
    DropDownRefresh
  },
  beforeMount(){
    
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    if(this.detailsEvaluate==1){
      this.curpage += 1;
      this.getComment();
    }
    
  },
  onShow(){
    
  },
  mounted(){
    this.$nextTick(function () {
      this.evaluateArr=[];
      this.curpage=1;
      this.getComment();
    });
  },
  methods:{
    getComment(){
      //评价
      var urlData = {
        'ActionName':'getcommentByProuctID',
        'PID':this.PID,
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        //this.evaluateArr = res.data.rows;
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.starsArr = stars(element.Score);//评价星星
            if(element.NickName == "")element.NickName="用户昵称";
            if(element.Details == "")element.Details="此用户没有填写评价";
          });
          this.evaluateArr = this.evaluateArr.concat(data);
          if(data.length==0)this.$refs.refresh.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh.hide();
          this.$refs.refresh.notMore();
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
.evaluate{
  margin-bottom: 20rpx;
  ul{
    @at-root .list{
      
      @at-root .head{
        height: 120rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @at-root .person{
          display: flex;
          align-items: center;
          img{
            width: 60rpx;
            height: 60rpx;
            background-color: #f5f5f5;
            border-radius: 100%;
            overflow: hidden;
          }
          @at-root .name{
            margin-left: 20rpx;
          }
        }
        @at-root .star{
          display: flex;
          flex-wrap: nowrap;
          .iconfont{
            margin-left:6rpx;
          }
        }
      }
      @at-root .content{
        line-height: 1.5;
        padding-bottom: 40rpx;
      }
    }
  }
}
</style>
