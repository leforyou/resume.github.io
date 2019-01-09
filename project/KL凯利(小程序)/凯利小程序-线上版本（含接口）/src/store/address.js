import fly from '@/utils/flyio.js' //引入flyio对象
const address = {
    state: {
        addressArr: []
    },
    mutations: {
        handleAddressArr(state, addressArr) {
            state.addressArr = addressArr;
        }
    },
    actions: {
        getAddress(context) {
            return new Promise((resolve, reject) => {
                //获取收货地址信息
                var urlData = {
                    'ActionName': 'ReceivingAddressList'
                };
                fly.get('get/getMemberData.ashx', urlData).then((res) => {
                    if (res.data.msg === 0) {
                        //没数据，请添加
                        //context.commit('handleAddressArr', []);
                        //resolve([]);
                    } else if (res.data.msg === 1) {
                        let addressArr = res.data.rows;
                        context.commit('handleAddressArr', addressArr);
                        resolve(addressArr);
                    } else if (res.data.msg === 2) {
                        console.log('res.data.msg:', res.data);
                        resolve([]);
                    }
                });
            });
        }
    }
}

export default address; //导出并在store.js中引入


/*外部使用
import store from '@/store/store.js'

store.dispatch('getAddress');//获取地址方法一：异步  --可以使用 async await

store.dispatch('getAddress').then((addressArr)=>{//获取地址方法二：同步（结合的是Promise）
    //在then内调用一些方法
    console.log(addressArr);
});


store.state.address.addressArr //获取变量的方法
 * 
 */