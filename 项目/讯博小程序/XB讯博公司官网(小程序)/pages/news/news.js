var app = getApp();
var common = require('../../common/js/common.js');

Page({
    data: {
        app: app,
        develop: [
            {
                time: '2016',
                content: '推出讯博自电商系统，商城、众筹、社区、分销一体！'
            },
            {
                time: '2015',
                content: '成立深圳分公司、中山分公司！'
            },
            {
                time: '2014',
                content: '推出网站建设三网合一概念，并推出相关产品！'
            },
            {
                time: '2013',
                content: '推出适合中小企业使用的ERP系统，引入微站制作！'
            },
            {
                time: '2012',
                content: '公司股东大变更！'
            },
            {
                time: '2010',
                content: '推出企业网站、商城两套产品系统！'
            },
            {
                time: '2008',
                content: '公司移址，正式成立广州讯博网络科技有限公司！'
            },
            {
                time: '2005',
                content: '成立广州亚博特公司！'
            },
            {
                time: '2002',
                content: '成立工作室，正式进军互联网行业！'
            }
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