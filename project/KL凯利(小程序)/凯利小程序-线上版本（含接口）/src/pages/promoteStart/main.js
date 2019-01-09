import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '开始推广',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
    }
}