var app = getApp();
var common = require('../../common/js/common.js');
var config = require('../../common/js/config.js');
var fly = require('../../common/js/flyio');
var share = require('../../common/js/share.js');

Page({
    data: {
        url: config.url,
        imgUrl: config.imgUrl,
        curpage: 1,
        newsList: [],
        isNews: 1,
        newsWay: 2,
        isMore: true,
        develop: [{
                time: '2017',
                content: '通过国家高新企业认定！'
            },
            {
                time: '2016',
                content: '成为高新培育入库企业！'
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
    onLoad: function(options) {
        wx.setStorageSync('isNews', '');
        this.setData({
            isNews: 1,
            curpage: 1,
            newsList: [],
            isMore: true
        });
        this.getNews();
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
        let isNews = wx.getStorageSync('isNews');
        if (isNews != '') {
            this.setData({
                isNews: isNews,
                curpage: 1,
                newsList: [],
                isMore: true
            });
            this.getNews();
        }
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
        //console.log(event.currentTarget.dataset.num);
        this.setData({
            isNews: event.currentTarget.dataset.num,
            newsList: [],
            curpage: 1,
            isMore: true
        });
        this.getNews();
    },
    loadMore() {
        let num = this.data.curpage + 1;
        //console.log(num, this.data.curpage)
        this.setData({
            curpage: num,
            isMore: true
        });
        this.getNews();
    },
    getNews() {
        //新闻列表数据
        //console.log(this.data.isNews)
        let classcode = '';
        if (this.data.isNews == 1) {
            classcode = '005001';
        } else if (this.data.isNews == 2) {
            classcode = '005002';
        } else if (this.data.isNews == 3) {
            classcode = '005003';
        }
        let urlData = {
            'op': '2',
            'classcode': classcode,
            'curpage': this.data.curpage,
            'curpagenum': 8
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
                    data = this.data.newsList.concat(data);
                    this.setData({
                        newsList: data
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