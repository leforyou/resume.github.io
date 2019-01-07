<template>
<!--最新资讯-详情-->
<div>
  <div class="container" v-if="newsDetail">
    <div class="head main-padding-lr">
      <p class="title fz38">{{newsDetail.NvrFd1}}<!--普洱茶“挂杯香”能否评判茶叶好坏？--></p>
      <p class="time fz28 fc-999">发布时间：{{newsDetail.TimeFd3}}<!--2018-13-18--></p>
    </div>

    <div class="content main-padding-lr">
      <wxParses :articleHTML="articleHTML"><!--富文本解析组件--></wxParses>
      <!--<i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">在茶界，顾名思义，“挂杯香”又称“挂杯”，俗称“杯底留香”，就是留存于杯子的香气。即洗茶第一泡从公道杯倒掉后，趁热在杯口闻一下，然后等公道杯稍冷或晃几下再闻的香气或香味。</p>
      <i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">而在品饮普洱茶时，所说的“挂杯”，并非指的是茶汤挂在杯壁上的时间，而是指茶香气留在杯壁上的时间。普洱茶的挂杯香有两种，公道杯香和品茗杯香，而公道杯香又可分为热杯香和冷杯香。</p>
      <i style="height:80rpx;"></i>
      <p class="fz30 fc-666" style="line-height:2;">挂杯时间越长，留香时间越是持久浓郁，越能说明茶的品质上佳。但不同茶品，其挂杯香浓淡是完全不一样的，有些茶可能热杯香比较明显，杯子冷了香气倒不在了；有的茶可能热杯香、冷杯香都比较浓烈。</p>-->
    </div>

    <div class="foot main-padding-lr fz28">
      <div class="box border-top">
        <a :href="'../newsDetail/main?NewID='+PreID" open-type="redirect" hover-class="none">
          <span class="prev-next main-color">上一篇：</span>
          <span class="fc-666 ellipsis1">{{PreTitle}}</span>
        </a>
        <a :href="'../newsDetail/main?NewID='+NextID" open-type="redirect" hover-class="none">
          <span class="prev-next main-color">下一篇：</span>
          <span class="fc-666 ellipsis1">{{NextTitle}}</span>
        </a>
      </div>
    </div>
  </div>
  <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
</div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
import wxParses from '@/components/wxParses'
import store from '@/store/store.js'
import * as share from '@/utils/share.js'
export default {
  data () {
    return {
      url:this.$url,
      NewID:'',
      articleHTML:'',
      newsDetail:null,
      PreID:'',
      NextID:'',
      PreTitle:'',
      NextTitle:''
    }
  },
  onLoad: function(options) {
    //console.log('页面传参：',options)
    if(options.NewID){
      this.NewID = options.NewID;
    }
    share.distribution(options);
    
      this.newsDetail = null;
      this.articleHTML = '  ';
      this.PreID = '';
      this.NextID = '';
      this.PreTitle = '';
      this.NextTitle = '';
  },
  onShow(){
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  onShareAppMessage: function (res) {
    //转发与分销  import store from '@/store/store.js'
    //import * as share from '@/utils/share.js'
    return {
      title: share.msg.title,
      path: `pages/newsDetail/main?${share.msg.shareIdName}=${store.state.login.memberid}&NewID=${this.NewID}`,
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
  components: {
    wxParses,DropDownRefresh
  },
  methods: {
    init(){
      this.getNewsDetail();
    },
    getNewsDetail(){
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'getNewsByID',
        'NewID':this.NewID
      };
      this.$http.get('get/getProductData.aspx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh.hide();
        }else if(res.data.msg == 1){
          this.$refs.refresh.hide();
          res.data.rows[0].TimeFd3 = res.data.rows[0].TimeFd3.split(" ")[0];
          if(res.data.PreTitle == ""){
            res.data.PreTitle = "没有了"
            res.data.PreID = this.NewID;
          }
          if(res.data.NextTitle == ""){
            res.data.NextTitle = "没有了"
            res.data.NextID = this.NewID;
          }
          this.PreID = res.data.PreID;
          this.NextID = res.data.NextID;
          this.PreTitle = res.data.PreTitle;
          this.NextTitle = res.data.NextTitle;
          this.newsDetail = res.data.rows[0];
          this.articleHTML = this.newsDetail.TextFd3;
        }else if(res.data.msg == 2){
          this.$alert(res.data.msgbox);//数据获取失败
          this.$refs.refresh.hide();
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
    .title{
      margin-bottom: 10rpx;
    }
  }
  .content{
    padding-top: 60rpx;
    padding-bottom: 90rpx;
  }
  .foot{
    .box{
      height: 188rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      a{
        display: flex;
        align-items: center;
        margin: 12rpx 0;
        .prev-next{
          white-space: nowrap;
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
  background-color: #fff;
}
</style>





