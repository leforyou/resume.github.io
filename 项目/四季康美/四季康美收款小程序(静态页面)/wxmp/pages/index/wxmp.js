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
        //liNum1:'1',
        productName:'',
        productCode:'',
        buyDate:'',
        userName:'',
        phone:'',
        address:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        for(var i = 1 ; i <= 2 ; i ++){
            this.setData({
                 ['liNum'+i]:0
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
    onShareAppMessage: function(res) {
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
    },
    updown(e){
        //收起与放下
        var num = e.target.dataset.num;
        var liNum = 'liNum'+num;
        if(num == this.data[liNum]){
            this.setData({
                [liNum]:'0'
            });
        }else{
            this.setData({
                [liNum]:num
            });
        }
        
    },
    bindDateChange(e) {
        this.setData({
            buyDate: e.detail.value
        })
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    modelData(event){
        //input的数据绑定
        var val = event.detail.value;
        var key = event.target.dataset.key;
        this.setData({
            [key]:val
        });
    },
    submit(){
        //马上提交
        console.log(this.data.productName,this.data.productCode,this.data.buyDate,this.data.userName,this.data.phone,this.data.address);
        this.data.productName
        this.data.productCode
        this.data.buyDate
        this.data.userName
        this.data.phone
        this.data.address
    }
});