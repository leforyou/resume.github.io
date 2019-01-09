<template>
<!--我的收藏-->
  <div class="container">
    <ul class="margin-btm">
      <li class="list main-padding-lr bg-fff margin-top" v-for="(item,index) in collectionArr" :key="index">
        <a class="left" :href="'../productDetail/main?PID='+item.Aid" hover-class="none">
          <img class="img" v-if="url" :src="url+item.Img" mode="aspectFill">
        </a>
        <div class="right">
          <p class="title fz28 ellipsis2">{{item.Title}}<!--瀛橘天香  橘红普洱--></p>
          <p class="num fz26 fc-999">{{item.NvrFd15}}g/{{item.SpecificationName}}<!--280g/盒--></p>
          <span class="price main-color fz36">￥{{item.price}}<!--￥318.00--></span>
          <i class="delete iconfont icon-lajitong fc-aaa fz32" @click="deleteFN(item,index)"></i>
        </div>
      </li>
    </ul>
    <DropDownRefresh  ref="refresh"><!--下拉刷新动画--></DropDownRefresh>
  </div>
</template>

<script>
import DropDownRefresh from '@/components/DropDownRefresh'
export default {
  data () {
    return {
      url:this.$url,
      curpage:1,
      pagesize:10,
      collectionArr:[]
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
    this.getCollectionList();
  },
  mounted(){
    this.$nextTick(function () {
      
    });
  },
  onShow(){
    this.$checkRefs(this.$refs,()=>{
      this.init();
    });
  },
  methods: {
    init(){
      this.curpage = 1;
      this.collectionArr=[];
      this.getCollectionList();
    },
    getCollectionList(){
      //我的收藏列表
      this.$refs.refresh.show();
      var urlData = {
        'ActionName':'myCollectionList',
        'curpage':this.curpage,
        'pagesize':this.pagesize
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          let data = res.data.rows;
          data.forEach(element => {
            element.price = element.price.toFixed(2);
          });
          this.collectionArr = this.collectionArr.concat(data);
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
      //删除
      let flag = await this.$modal('你确定要删除该收藏产品吗？');
      if(flag == false)return;
      var urlData = {
        'ActionName':'deleteCollentionByID',
        'CID':item.ID
      };
      this.$http.get('/get/getMemberData.ashx',urlData).then((res)=>{
        if(res.data.msg == 1){
          this.collectionArr.splice(index,1);//删除
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
$mainColor: #7fb414;
.container{
  @at-root .list{
    padding-top: 28rpx;
    padding-bottom: 28rpx;
    display: flex;
    @at-root .left{
      $val:210rpx;
      min-width: $val;
      height: $val;
      img{
        width: $val;
        height: $val;
        border-radius: 10rpx;
      }
    }
    @at-root .right{
      width: 100%;
      margin-left: 30rpx;
      margin-top: 10rpx;
      margin-bottom: 10rpx;
      position: relative;
      .title{
        padding-right: 50rpx;
        
      }
      .num{
        margin-top: 6rpx
      }
      @at-root .price{
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @at-root .delete{
        position: absolute;
        top: 0rpx;
        right: 0;
        padding: 5rpx;
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





