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
        isCard: 1,
        isCardOriginal: null,
        id: 0,
        cardWay: '',
        opzq: 0,
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
        if (options.isCard) {
            this.setData({
                isCard: options.isCard,
                isCardOriginal: options.isCard,
                id: options.id,
                cardWay: options.cardWay,
                opzq: options.opzq
            });
            this.getCardDetail();
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
        wx.setStorageSync('isCard', '');
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
    tabCardNum(event) {
        let num = event.currentTarget.dataset.num;
        if (this.data.opzq == 1) {
            //化妆品专区
            wx.navigateBack();
            return;
        }
        if (this.data.cardWay == '1') {
            //跳转方式1--首页点击进入新闻详情
            wx.redirectTo({
                url: '../projectCase/projectCase?isCard=' + this.data.isCard
            });
        } else if (this.data.cardWay == '2') {
            //跳转方式2--新闻列表点击进入新闻详情
            if (this.data.isCardOriginal == num) {
                this.setData({
                    isCard: this.data.isCardOriginal
                });
                wx.setStorageSync('isCard', '');
            } else {
                this.setData({
                    isCard: num
                });
                wx.setStorageSync('isCard', this.data.isCard);
            }
            wx.navigateBack();
        }
    },
    getCardDetail() {
        //项目案例详情数据
        wx.showLoading();
        let urlData = {
            'op': '5',
            'id': this.data.id,
            'opzq': this.data.opzq
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    wx.hideLoading();
                    common.alert(res.data.msbox);
                } else if (res.data.msg == 1) {
                    wx.hideLoading();
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
                wx.hideLoading();
                console.log(error);
                common.alert('获取数据失败');
            });
    }
})