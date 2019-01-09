import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '退换管理',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: true,
        backgroundColor: "#ddd"
    }
}