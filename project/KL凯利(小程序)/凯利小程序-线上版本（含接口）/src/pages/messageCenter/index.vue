<template>
  <div class="container">
    <!--消息中心-->
    <div class="message-center">
      <ul>
        <li class="list main-padding-lr bg-fff" v-for="(item,index) in messageArr" :key="index">
          <div class="head">
            <p class="fz30 name fc-999">{{item.Title}}<!--公告--></p>
            <p class="fz24 time fc-999">{{item.CreateTime}}<!--2018-05-08--></p>
          </div>
          <div class="content fz30">
            <wxParses :articleHTML="item.Details"><!--富文本解析组件--></wxParses>
            <!--最新橘红普洱，橘红普洱是一种由橘子皮与普洱茶组成的饮品，用于暖胃、减肥、润肠通便、降脂降压。快了解吧！-->
          </div>
        </li>
      </ul>
    </div>
    <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
import wxParses from '@/components/wxParses'
export default {
  data () {
    return {
      url:this.$url,
      curpage:1,
      pagesize:10,
      messageArr:[]
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh,wxParses
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    this.curpage += 1;
    this.getMessageList();
  },
  onPullDownRefresh: function(){
    //头部下拉刷新
    this.init();
    let setTime = setTimeout(()=>{
      wx.stopPullDownRefresh();
      clearTimeout(setTime);
    },1e3);
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
      this.messageArr = [];
      this.curpage = 1;
      this.getMessageList();
    },
    getMessageList(){
      //我的收藏列表
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'myMessageList',
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.CreateTime = element.CreateTime.replace(/\//g,"-").split(" ")[0];
          });
          this.messageArr = this.messageArr.concat(data);
          this.$refs.refresh.hide();
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
/**局部css----原因加了：scoped**/
.container{
  margin-bottom: 20rpx;
  @at-root .message-center{
    ul{
      @at-root .list{
        margin-top: 20rpx;
        overflow: hidden;
        .head{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100rpx;
        }
        .content{
          line-height: 1.5;
          margin-bottom: 28rpx;
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





