var app = getApp();
var common = require('../../common/js/common.js');
var config = require('../../common/js/config.js');
var fly = require('../../common/js/flyio');
var share = require('../../common/js/share.js');

Page({
    data: {
        url: config.url,
        imgUrl: config.imgUrl,
        serveType: ['定制开发', '官网展示', '商城购物', '互动功能', '会员系统', '微信支付', '社区', '分销', '营销'],
        curpage: 1,
        curpagenum: 8,
        cardList: [],
        isCard: 1,
        cardWay: 2,
        opzq: 0,
        isMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            serveType: common.serveType(this.data.serveType)
        });
        wx.setStorageSync('isCard', '');
        this.getCase();
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
    loadMore() {
        let num = this.data.curpage + 1;
        //console.log(num, this.data.curpage)
        this.setData({
            curpage: num,
            isMore: true
        });
        this.getCase();
    },
    getCase() {
        //小程序开发列表数据
        let urlData = {
            'op': '4',
            'sitetype': '003004',
            'curpage': this.data.curpage,
            'curpagenum': this.data.curpagenum
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    //common.alert(res.data.msbox);
                    this.setData({
                        isMore: false
                    });
                } else if (res.data.msg == 1) {
                    let data = res.data.rows;
                    data = this.data.cardList.concat(data);
                    this.setData({
                        cardList: data
                    });
                }
            })
            .catch(function(error) {
                //一般情况是：断网连接失败
                console.log(error);
                common.alert('获取数据失败');
            });
    }
})