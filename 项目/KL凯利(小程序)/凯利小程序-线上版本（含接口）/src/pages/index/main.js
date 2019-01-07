import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '瀛橘天香',
        navigationBarBackgroundColor: '#414d28',
        enablePullDownRefresh: true,
        backgroundColor: "#ddd"
    }
}