import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '发表评价',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}