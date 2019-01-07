import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '帮助中心',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}