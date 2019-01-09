<template>
<!--全部订单-->
<div class="container">
  <orderPayment><!--待付款--></orderPayment>
  <orderSend><!--待发货--></orderSend>
  <orderReceive><!--待收货--></orderReceive>
  <orderEvaluation><!--待评价--></orderEvaluation>
  <orderReturn><!--退货中--></orderReturn>
</div>
</template>

<script>
import orderPayment from '@/components/orderPayment'
import orderSend from '@/components/orderSend'
import orderReceive from '@/components/orderReceive'
import orderEvaluation from '@/components/orderEvaluation'
import orderReturn from '@/components/orderReturn'
export default {
  props: ['all'],
  data(){
    return{
      url:this.$url
    }
  },
  computed:{
    
  },
  components: {
    orderPayment,orderSend,orderReceive,orderEvaluation,orderReturn
  },
  methods:{
    
  }
}
</script>

<style lang='scss' scoped>
$mainColor: #7fb414;

</style>
<style lang='scss'>

</style>