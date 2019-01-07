<template>
<!--我的团队-->
  <div class="container">
    <div class="team">
      <ul class="margin-btm">
        <li class="main-padding-lr bg-fff margin-top" v-for="(item,index) in arr1" :key="index">
          <img class="person-pic pic-bg" v-if="url" :src="item.Headimgurl" mode="aspectFill">
          <p class="name fz28">{{item.NickName}}<!--刘小姐--></p>
        </li>
      </ul>
    </div>
    <DropDownRefresh  ref="refresh1"><!--下拉刷新动画--></DropDownRefresh>
  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      curpage1:1,
      pagesize1:30,
      arr1:[]
    }
  },
  computed:{
    
  },
  components: {
    DropDownRefresh
  },
  onReachBottom(){
    //小程序函数----页面上拉触底事件的处理函数
    this.arr1=[];
    this.curpage1 += 1;
    this.myTeam();
  },
  mounted () {
    // 调用应用实例的方法获取全局数据
    this.$nextTick(function () {
      this.arr1=[];
      this.curpage1 = 1;
      this.myTeam();
    });
  },
  methods: {
    myTeam(){
      this.$refs.refresh1.show();
      var urlData = {
        'ActionName':'myTeam',
        'pagesize':this.pagesize1,
        'curpage':this.curpage1
      };
      this.$http.get('get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 0){
          this.$refs.refresh1.hide();
          this.$refs.refresh1.notMore();
        }else if(res.data.msg == 1){
          let data = res.data.rows;
          this.arr1 = this.arr1.concat(data);
          this.$refs.refresh1.hide();
        }else if(res.data.msg == 2){
          this.$refs.refresh1.hide();
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
  .team{
    ul{
      li{
        height: 110rpx;
        display: flex;
        align-items: center;
        .person-pic{
          width: 70rpx;
          height: 70rpx;
          margin-right: 40rpx;
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





