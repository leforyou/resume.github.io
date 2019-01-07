var app = getApp();
var common = require('../../static/js/common.js');
var config = require('../../static/js/config.js');
var fly = require('../../static/js/flyio');
var share = require('../../static/js/share.js');



import NP from '../../static/js/NumberPrecision.js';



Page({
    data: {
        url: config.url,
        imgUrl: config.imgUrl,
        price:'0.00'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(Object.keys(options),options);//["price"] {price: "0.01"}
        if(Object.keys(options).length != 0){
            this.setData({
                price:options.price
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: share.title,
            path: share.path,
            imageUrl: share.imageUrl,
            success: function(res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    //分享成功
                }
            },
            fail: function() {
                // 转发失败之后的回调
            },
            complete: function() {
                // 转发结束之后的回调（转发成不成功都会执行）
            }
        }
    }
});