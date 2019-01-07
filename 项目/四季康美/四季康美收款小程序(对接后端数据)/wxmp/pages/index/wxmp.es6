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
        liNum:'0',
        productList:[],
        productName:'',
        productCode:'',
        buyDate:'',
        userName:'',
        phone:'',
        address:'',
        year:'',
        productID:''
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
        this.get_product_list();
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
        num = parseInt(num);
        var arr = this.data.productList;
        console.log(arr[num])
        if(num == arr[num].liNum){
            arr[num].liNum = -1;
            this.setData({
                productList:arr
            });
        }else{
            arr[num].liNum = num;
            this.setData({
                productList:arr
            });
        }
        
    },
    bindDateChange(e) {
        this.setData({
            buyDate: e.detail.value
        });
    },
    radioChange: function(e) {
        //单选
        //console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            year: e.detail.value.split(',')[0],
            productID: e.detail.value.split(',')[1]
        });
    },
    modelData(event){
        //input的数据绑定
        var val = event.detail.value;
        var key = event.target.dataset.key;
        this.setData({
            [key]:val
        });
    },
    get_product_list(){
        //获得产品列表
        var urlData = {
            action:'get_product_list'
        };
        fly.get('api/submit_ajax.ashx',urlData).then((res)=>{
            var arr = res.data.data;
            arr.forEach((element,index) => {
                element.liNum = -1;
                element.YearList;
            });
            this.setData({
                productList:arr
            });
            console.log(this.data.productList)
        });
    },
    submit(){
        //马上提交
        console.log(this.data.productName,this.data.productCode,this.data.buyDate,this.data.userName,this.data.phone,this.data.address,this.data.year,this.data.productID);
        
        
        
        var urlData = {
            action:'add_info_and_payment',
            openid:'openid',
            product_id:this.data.productID,
            product_name:this.data.productName,
            product_code:this.data.productCode,
            buy_time:this.data.buyDate,
            name:this.data.userName,
            mobile:this.data.phone,
            address:this.data.address,
            year:this.data.year,
        };
        fly.get('api/submit_ajax.ashx',urlData).then((res)=>{
            var arr = res.data.data;
            arr.forEach((element,index) => {
                element.liNum = -1;
                element.YearList;
            });
            this.setData({
                productList:arr
            });
            console.log(this.data.productList)
        });
    }
});