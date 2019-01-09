// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

import login from './login.js' //import login from '@/store/login.js'
import address from './address.js' //import address from '@/store/address.js'
import coupons from './coupons.js' //import coupons from '@/store/coupons.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        login: login,
        address: address,
        coupons: coupons
    }
})

export default store

/*import login from './login.js' //import login from '@/store/login.js'
import address from './address.js' //import address from '@/store/address.js'
const modules = {
    login: login,
    address: address
};

export default modules*/