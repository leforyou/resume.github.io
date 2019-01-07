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
        this.get_product_list();
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
        /*this.setData({
            productName:'',
            productCode:'',
            buyDate:'',
            userName:'',
            phone:'',
            address:'',
            year:'',
            productID:''
        });
        this.get_product_list();*/
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
        wx.showModal({
            title:'信息提示',
            content:'刷新会清空输入框的值，是否清空？',
            cancelText:'否',
            confirmText:'是',
            success:(res)=>{
                //console.log(res)
                if(res.confirm){
                    this.downRefresh();
                }
            }
        });
        

        var setTime = setTimeout(()=>{
            wx.stopPullDownRefresh();
            clearTimeout(setTime);
        },1e3);
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
    downRefresh(){
        //下拉刷新执行的函数-清空输入框的值与请求数据
        this.setData({
            productName:'',
            productCode:'',
            buyDate:'',
            userName:'',
            phone:'',
            address:'',
            year:'',
            productID:''
        });
        this.get_product_list();
    },
    updown(e){
        //收起与放下
        var num = e.target.dataset.num;
        num = parseInt(num);
        var arr = this.data.productList;
        var str = `productList[${num}].liNum`;
        if(num == arr[num].liNum){
            this.setData({
                [str]:-1
            });
        }else{
            this.setData({
                [str]:num
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
        var arr = e.detail.value.split(',');
        this.setData({
            productID: arr[0],
            year: arr[1],
            price:arr[2]
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
            /*获取的数据
            res.data.data = {
                "data": [
                    {
                        "ID": "2",
                        "Title": "光子腰带",
                        "Sort": "99",
                        "Status": "1",
                        "AddTime": "2018/8/28 14:27:02",
                        "YearList": {
                            "Year1": 0.1,
                            "Year2": 0.2,
                            "Year3": 0.3,
                            "Year4": 0,
                            "Year5": 0
                        }
                    },
                    {
                        "ID": "1",
                        "Title": "光子单人床",
                        "Sort": "99",
                        "Status": "1",
                        "AddTime": "2018/8/28 14:24:54",
                        "YearList": {
                            "Year1": 0.01,
                            "Year2": 589,
                            "Year3": 897,
                            "Year4": 0,
                            "Year5": 0
                        }
                    }
                ],
                "pages": 1
            }*/
            var arr = res.data.data;
            arr.forEach((element,index) => {
                element.liNum = -1;
                var array = [];
                for(let key in element.YearList){
                    /*var obj = {};
                    obj[key] = key;
                    arr.push(obj);
                    arr.push({'checked':false});*/
                    array.push({
                        'checked':false,
                        'price':element.YearList[key]
                        //[key]:element.YearList[key]
                    });
                }
                element.YearList = array;
            });
            //console.log(arr)
            this.setData({
                productList:arr
            });
        });
    },
    submit(){
        //马上提交-下单
        
        if(this.data.productName==''){
            wx.showToast({title: '产品名称不能为空',icon:'none'});
            return;
        }
        if(this.data.productCode==''){
            wx.showToast({title: '产品编码不能为空',icon:'none'});
            return;
        }
        if(this.data.buyDate==''){
            wx.showToast({title: '购买日期不能为空',icon:'none'});
            return;
        }
        if(this.data.userName==''){
            wx.showToast({title: '姓名不能为空',icon:'none'});
            return;
        }
        if(this.data.phone==''){
            wx.showToast({title: '手机号码不能为空',icon:'none'});
            return;
        }
        if(this.data.address==''){
            wx.showToast({title: '地址不能为空',icon:'none'});
            return;
        }
        if(this.data.year=='' || this.data.productID == ''){
            wx.showToast({title: '请选择服务类型',icon:'none'});
            return;
        }




        /*wx.navigateTo({
            url:'../paymentSuccess/wxmp'
        });
        return;*/




        wx.showLoading({
            title: '正在提交订单',
            mask:true
        });
        var urlData = {
            action:'add_info_and_payment',
            openid:wx.getStorageSync('openid'),
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
            if(res.data.status==0){
                wx.hideLoading();
                wx.showToast({title: res.data.msg || '下单失败',icon:'none'});
            }else{
                wx.showLoading({
                    title: '发起支付请求',
                    mask:true
                });
                this.pay(res.data.data);
            }
        });
    },
    pay(obj){
        //支付
        var _this = this;
        //console.log(obj);
        /*var obj = {
            "appid": "wx2b3f78ba64037992",
            "nonce_str": "DBE272BAB69F8E13F14B405E038DEB64",
            "package": "prepay_id=wx31185738951081fcd2b8b8562725340302",
            "pay_sign": "AFD3F25D620B93B05C04CE568F5E1C34",
            "sign_type": "MD5",
            "time_stamp": "1535713059"
        }*/
        wx.requestPayment({
            timeStamp:obj.time_stamp,
            nonceStr:obj.nonce_str,
            package:obj.package,
            signType:obj.sign_type,
            paySign:obj.pay_sign,
            success:(res)=>{
                //console.log(res)
                var price = NP.tonum(this.data.price).toFixed(2);
                wx.hideLoading();
                wx.navigateTo({
                    url:'../paymentSuccess/wxmp?price='+price
                });
            },
            fail:(res)=>{
                wx.hideLoading();
                wx.showToast({title: '支付失败',icon:'none'});
                //console.log(res)
            }
        });
        
    }
});