import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '资讯详情',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}