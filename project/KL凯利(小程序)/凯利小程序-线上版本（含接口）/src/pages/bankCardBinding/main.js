import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '银行卡绑定',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}