var app = getApp();
var common = require('../../common/js/common.js');
var config = require('../../common/js/config.js');
var fly = require('../../common/js/flyio');
var share = require('../../common/js/share.js');

Page({
    data: {
        url: config.url,
        imgUrl: config.imgUrl,
        bannerList: [],
        newsList: [],
        newsWay: 1,
        isNews: 1,
        cardList: [],
        isCard: 1,
        cardWay: 1,
        opzq: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBanner();
        this.getNews();
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
        this.setData({
            isNews: 1,
            isCard: 1
        });
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
    onShareAppMessage: function(res) {
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
    getBanner() {
        //获取轮播图数据
        let urlData = {
            'op': '1'
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    common.alert(res.data.msbox);
                } else if (res.data.msg == 1) {
                    this.setData({
                        bannerList: res.data.rows
                    });
                }
            })
            .catch(function(error) {
                //一般情况是：断网连接失败
                console.log(error);
                common.alert('获取数据失败');
            });
    },
    tabNewsNum(event) {
        //console.log(event.currentTarget.dataset.num);
        this.setData({
            isNews: event.currentTarget.dataset.num
        });
        wx.navigateTo({
            url: '../news/news?isNews=' + this.data.isNews
        });
    },
    getNews() {
        //新闻列表数据
        let urlData = {
            'op': '2',
            'classcode': '005001',
            'curpage': 1,
            'curpagenum': 3
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    common.alert(res.data.msbox);
                } else if (res.data.msg == 1) {
                    this.setData({
                        newsList: res.data.rows
                    });
                }
            })
            .catch(function(error) {
                //一般情况是：断网连接失败
                console.log(error);
                common.alert('获取数据失败');
            });
    },
    tabCardNum(event) {
        //console.log(event.currentTarget.dataset.num);
        this.setData({
            isCard: event.currentTarget.dataset.num
        });
        wx.navigateTo({
            url: '../projectCase/projectCase?isCard=' + this.data.isCard
        });
    },
    getCase() {
        //项目案例列表数据
        let urlData = {
            'op': '4',
            'classcode': '004001',
            'curpage': 1,
            'curpagenum': 4
        };
        fly.get('getdata_x.ashx', urlData)
            .then((res) => {
                if (res.data.msg == 0) {
                    common.alert(res.data.msbox);
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