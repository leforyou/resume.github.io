<template>
<!--最新资讯-->
  <div class="container">
    <div class="margin-top">
      <news-list :newsListArr="newsListArr"><!--资讯列表--></news-list>
      
      <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
    </div>

  </div>
</template>

<script>
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
import newsList from '@/components/newsList'
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      curpage:1,
      pagesize:10,
      newsListArr:[]
    }
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    this.curpage += 1;
    this.getNewsListFn();
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
      path: `pages/newsList/main?${share.msg.shareIdName}=${store.state.login.memberid}`,
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
  computed:{
    
  },
  components: {
    newsList,DropDownRefresh
  },
  onShow(){
    /*this.$checkRefs(this.$refs,()=>{
      
    });*/
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.init();
    });
  },
  methods: {
    init(){
      this.curpage = 1;
      this.newsListArr = [];
      this.getNewsListFn();
    },
    getNewsListFn(){
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'getNewsList',
        'curpage':this.curpage,
        'pagesize':this.pagesize,
        'orderby':'asc'
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          this.newsListArr = this.newsListArr.concat(data);
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
/**局部css----原因加了：scoped**/
$mainColor: #7fb414;
.container{
  
}


</style>



<style>
/**能设置本页面与组件的样式**/
page{
  height:100%;
  background-color: #ededed;
}
</style>





