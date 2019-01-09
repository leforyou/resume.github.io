var app = getApp();
var common = require('../../common/js/common.js');
var config = require('../../common/js/config.js');
var fly = require('../../common/js/flyio');
var share = require('../../common/js/share.js');

var WxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        url: config.url,
        imgUrl: config.imgUrl,
        isNews: 1,
        isNewsOriginal: null,
        id: 0,
        newsWay: '',
        pre: '',
        pretitle: '',
        next: '',
        nexttitle: '',
        row: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.isNews) {
            this.setData({
                isNews: options.isNews,
                isNewsOriginal: options.isNews,
                id: options.id,
                newsWay: options.newsWay
            });
            this.getNewsDetail();
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
        wx.setStorageSync('isNews', '');
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
            path: null,
            imageUrl: null,
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
    },
    tabNewsNum(event) {
        let num = event.currentTarget.dataset.num;
        if (this.data.newsWay == '1') {
            //跳转方式1--首页点击进入新闻详情
            wx.redirectTo({
                url: '../news/news?isNews=' + this.data.isNews
            });
        } else if (this.data.newsWay == '2') {
            //跳转方式2--新闻列表点击进入新闻详情
            if (this.data.isNewsOriginal == num) {
                this.setData({
                    isNews: this.data.isNewsOriginal
                });
                wx.setStorageSync('isNews', '');
            } else {
                this.setData({
                    isNews: num
                });
                wx.setStorageSync('isNews', this.data.isNews);
            }
            wx.navigateBack();
        }
    },
    getNewsDetail() {
        //新闻内容详情数据
        let urlData = {
            'op': '3',
            'id': this.data.id
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    common.alert(res.data.msbox);
                } else if (res.data.msg == 1) {
                    this.setData({
                        pre: res.data.pre,
                        pretitle: res.data.pretitle == '' ? '没有了' : res.data.pretitle,
                        next: res.data.next,
                        nexttitle: res.data.nexttitle == '' ? '没有了' : res.data.nexttitle,
                        row: res.data.rows[0]
                    });
                    var that = this;
                    WxParse.wxParse('article', 'html', that.data.row.details, that, 5);
                }
            })
            .catch(function(error) {
                //一般情况是：断网连接失败
                console.log(error);
                common.alert('获取数据失败');
            });
    }
});