import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '等待买家付款',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}