//订单中使用优惠券
import fly from '@/utils/flyio.js' //引入flyio对象
const coupons = {
    state: {
        voucherArrAble: [],
        voucherArrUnable: [],
        voucherID: '',
        Denomination: 0,
        total: 0
    },
    mutations: {
        handleAble(state, arr) {
            state.voucherArrAble = arr;
        },
        handleUnable(state, arr) {
            state.voucherArrUnable = arr;
        },
        handleTotal(state, total) {
            state.total = total;
        },
        handleDenomination(state) {
            state.Denomination = 0;
        },
        handleCoupons(state, { item, index }) {
            state.voucherID = item.ID;
            state.Denomination = item.Denomination;
            state.voucherArrAble.forEach(element => {
                element.useState = false;
            });
            state.voucherArrAble[index].useState = true;
            //console.log(state.voucherArrAble)
        },
        handleNotCoupons(state) {
            state.voucherID = '';
            state.Denomination = 0;
            state.voucherArrAble.forEach(element => {
                element.useState = false;
            });
        }
    },
    actions: {
        setTotal({ commit }, total) {
            //重置总金额
            commit('handleTotal', total);
        },
        setDenomination({ commit }) {
            //重置优惠券-面额
            commit('handleDenomination');
        },
        useCoupons({ commit }, obj) {
            //使用优惠券--- useCoupons.vue
            //console.log('使用优惠券', item, index);//obj = {'item':item,'index':index}
            commit('handleCoupons', obj);
        },
        notUseCoupons({ commit }) {
            //取消使用优惠券
            commit('handleNotCoupons');
        },
        getVoucherArrAble(context) {
            return new Promise((resolve, reject) => {
                //获取可用的优惠券
                var urlData = {
                    'ActionName': 'VoucherIsAvailable',
                    IsAvailable: 1,
                    total: context.state.total
                };
                fly.get('post/postMemberData.ashx', urlData).then((res) => {
                    if (res.data.msg === 0) {
                        //没数据
                        resolve([]);
                    } else if (res.data.msg === 1) {
                        let voucherArrAble = res.data.rows;
                        voucherArrAble.forEach(element => {
                            element.useState = false;
                            element.StartDate = element.StartDate.split(' ')[0].replace(/\//g, ".");
                            element.EndDate = element.EndDate.split(' ')[0].replace(/\//g, ".");
                        });
                        context.commit('handleAble', voucherArrAble);
                        resolve(voucherArrAble);
                    } else if (res.data.msg === 2) {
                        this.$alert();
                        console.log('res.data.msg:', res.data);
                        resolve([]);
                    }
                });
            });
        },
        getVoucherArrUnable(context) {
            return new Promise((resolve, reject) => {
                //获取不可用的优惠券
                var urlData = {
                    'ActionName': 'VoucherIsAvailable',
                    IsAvailable: 0,
                    total: context.state.total
                };
                fly.get('post/postMemberData.ashx', urlData).then((res) => {
                    if (res.data.msg === 0) {
                        //没数据
                        resolve([]);
                    } else if (res.data.msg === 1) {
                        let voucherArrUnable = res.data.rows;
                        voucherArrUnable.forEach(element => {
                            element.StartDate = element.StartDate.split(' ')[0].replace(/\//g, ".");
                            element.EndDate = element.EndDate.split(' ')[0].replace(/\//g, ".");
                        });
                        context.commit('handleUnable', voucherArrUnable);
                        resolve(voucherArrUnable);
                    } else if (res.data.msg === 2) {
                        this.$alert();
                        console.log('res.data.msg:', res.data);
                        resolve([]);
                    }
                });
            });
        }
    }
}

export default coupons; //导出并在store.js中引入


/*外部使用
import store from '@/store/store.js'

store.dispatch('getVoucherArrAble');//获取地址方法一：异步  --可以使用 async await

store.dispatch('getVoucherArrAble').then((voucherArrAble)=>{//获取地址方法二：同步（结合的是Promise）
    //在then内调用一些方法
    console.log(voucherArrAble);
});


store.state.coupons.voucherArrAble //获取变量的方法
 * 
 */