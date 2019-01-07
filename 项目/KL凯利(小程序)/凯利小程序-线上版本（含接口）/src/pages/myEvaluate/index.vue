<template>
<!--我的评论-->
  <div class="container">
    <ul>
      <li class="list main-padding-lr margin-btm bg-fff" v-for="(item,index) in commentArr" :key="index">
        <div class="head">
          <div class="person">
            <img class="pic-bg" v-if="url" :src="item.Headimgurl" mode="aspectFill">
            <span class="name fz30">{{item.nickname}}<!--刘先生--></span>
          </div>
          <div class="star fz50">
            <i v-for="(item,indexStar) in item.starsArr" :key="indexStar" class="iconfont flex-center" :class="item.star"></i>
            <!--<i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-full fc-ffc939"></i>
            <i class="iconfont icon-star-half fc-ffc939"></i>
            <i class="iconfont icon-star-none fc-aaa"></i>-->
          </div>
          <i class="delete iconfont icon-lajitong fc-aaa fz32" @click="deleteFN(item,index)"></i>
        </div>
        <div class="content">
          <p class="ellipsis4 fz28 fc-666">{{item.Details}}<!--喝了几次口感良好，对茶不算有太多接触，但觉得这款茶不算，香味独特明显，好喝。--></p>
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
  data () {
    return {
      url:this.$url,
      curpage:1,
      pagesize:15,
      commentArr:[]
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
    this.getCommentList();
  },
  mounted(){
    this.$nextTick(function () {
      
    });
  },
  onShow(){
    /*let setIval = setInterval(()=>{
      if(this.$refs.refresh != undefined){
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
      this.curpage=1;
      this.commentArr=[];
      this.getCommentList();
    },
    getCommentList(){
      //我的评论列表
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'myCommentList',
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.starsArr = stars(element.Score);//评价星星
          });
          this.commentArr = this.commentArr.concat(data);
          this.$refs.refresh.hide();
        }else if(res.data.msg == 0){
          this.$refs.refresh.hide();
          this.$refs.refresh.notMore();
        }else if(res.data.msg == 2){
          this.$refs.refresh.hide();
          this.$alert();//数据获取失败
        }
      });
    },
    async deleteFN(item,index){
      //item.ID   删除评论 参数 openID ,CID
      let flag = await this.$modal('你确定要删除这条评论内容吗？');
      if(flag == false)return;
      var urlData = {
        'ActionName':'deleteCommentByID',
        'CID':item.ID
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.commentArr.splice(index,1);//删除
        }else if(res.data.msg == 0){
          
        }else if(res.data.msg == 2){
          this.$alert('删除成功');//数据获取失败
        }
      });
    }
  }
}
</script>


<style lang='scss' scoped>
/**局部css----原因加了：scoped**/
.container{
  overflow: hidden;
  .margin-btm{
    margin-bottom: 20rpx;
  }
  ul{
    margin-top: 20rpx;
    @at-root .list{
      @at-root .head{
        height: 120rpx;
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 50rpx;
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
          margin-left: 60rpx;
          .iconfont{
            margin-left:6rpx;
          }
        }
        @at-root .delete{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          padding: 5rpx;
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



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





