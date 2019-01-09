import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '填写退货信息',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}