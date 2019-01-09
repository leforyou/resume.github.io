var app = getApp();
var common = require('../../common/js/common.js');

Page({
    data: {
        app: app,
        bannerList: [
            "../../static/slider2.jpg",
            "../../static/slider2.jpg",
            "../../static/slider2.jpg"
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        common.initNav(app);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    navTab() {
        //导航栏
        app.isNav = !app.isNav;
        this.setData({
            app: app
        });
    },
    callPhone(e) {
        //拔打电话
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.tel
        });
    },
    copyMail(e) {
        //复制邮箱
        wx.showModal({
            title: '邮箱',
            confirmText: '复制',
            content: e.target.dataset.mail,
            success: function (res) {
                if (res.confirm) {
                    //console.log('用户点击确定')
                    copy();
                } else if (res.cancel) {
                    //console.log('用户点击取消')
                }
            }
        });

        var copy = function () {
            wx.setClipboardData({
                data: e.target.dataset.mail,
                success: function (res) {
                    wx.showToast({
                        title: '复制成功',
                        icon: 'success',
                        duration: 2000
                    });
                }
            });
        }
    },
    openLocation() {
        //微信内置地图查看位置
        wx.openLocation({
            longitude: app.longitude,
            latitude: app.latitude,
            scale: 28,
            name: app.companyName,
            address: app.companyAdress
        });
    }
})