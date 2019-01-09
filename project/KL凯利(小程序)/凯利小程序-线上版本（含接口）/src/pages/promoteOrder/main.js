import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '推广订单',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}