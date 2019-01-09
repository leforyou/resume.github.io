//app.js
var common = require('/static/js/common.js');

App({
    onLaunch: function(options) {
        // 生命周期函数--监听小程序初始化。当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    },
    onShow: function(options) {
        // 生命周期函数--监听小程序显示。当小程序启动，或从后台进入前台显示，会触发 onShow
        //console.log(this.globalData)
    },
    onHide: function() {
        // 生命周期函数--监听小程序隐藏。当小程序从前台进入后台，会触发 onHide
    },
    onError: function(msg) {
        //错误监听函数。当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
        //console.log(msg)
    },
    onPageNotFound: function() {
        //当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见官网：https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html
    },
    globalData: 'I am global data，可以设置一些全局 常量 或 函数。建议在其它js文件内设置' //其他	Any。开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问App内的变量与函数

});