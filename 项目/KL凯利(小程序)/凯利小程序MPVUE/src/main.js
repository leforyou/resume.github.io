import Vue from 'vue'
import App from './App'

/*
 *MPVUE中用的ajax插件
 *1.安装 npm install flyio --save-dev
 *
 */
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly(); //创建fly实例

//添加请求拦截器
fly.interceptors.request.use((config) => {
    //给所有请求添加自定义header
    config.headers["X-Tag"] = "flyio";
    config.headers["TOKEN"] = "TOKEN";
    //return config;
    /*if (true) {
        //console.log(fly);
        //console.log(fly.lock);
        //console.log(fly.interceptors.request.lock);
        fly.lock(); //fly.interceptors.request.lock();
    } else {
        fly.unlock();//fly.interceptors.request.unlock();
    }*/
    return config;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response, promise) => {
        //只将请求结果的data字段返回
        //console.log(response)
        //return response.data
    },
    (err, promise) => {
        //发生网络错误后会走到这里
        //promise.resolve("ssss")
    }
);
//配置请求基地址
fly.config.baseURL = "https://www.leleweb8.com/"; //ajax数据请求地址
Vue.prototype.$http = fly; //将fly实例挂在vue原型上


Vue.prototype.$url = 'http://192.168.123.139/'; //静态资源图片、视频的请求链接
//Vue.prototype.$url = 'https://www.leleweb8.com/'; //静态资源图片、视频的请求链接




Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();








export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: [
            '^pages/index/main', //首页
            'pages/sort/main', //分类
            'pages/productDetail/main', //产品详情
            'pages/productList/main', //产品列表
            'pages/personalCenter/main', //个人中心
            'pages/orderAll/main', //全部订单
            'pages/orderDetailPayment/main', //订单详情  等待买家付款
            'pages/orderDetailSend/main', //订单详情  等待商家发货
            'pages/orderDetailReceive/main', //订单详情  等待买家收货
            'pages/orderDetailComplete/main', //订单详情  交易完成
            'pages/messageCenter/main', //消息中心
            'pages/myCoupons/main', //我的优惠券
            'pages/returnedManage/main', //退换管理
            'pages/returnedReason/main', //申请退换货-退换原因填写
            'pages/orderReturnedApplying/main', //订单详情  退换货-申请中
            'pages/orderReturnedIng/main', //订单详情  退换货-退换中
            'pages/orderReturnedComplete/main', //订单详情  退换货-交易完成
            'pages/sendEvaluation/main', //发表评价
            'pages/ourBuy/main', //我的团购
            'pages/productDetailOurBuy/main', //商品详情-团购商品
            'pages/myEvaluate/main', //我的评论
            'pages/myCollection/main', //我的收藏
            'pages/cart/main', //购物车
            'pages/sureOrder/main', //结算-确认订单
            'pages/useCoupons/main', //使用优惠券-下单时用
            'pages/paymentSuccess/main', //付款成功
            'pages/myMoney/main', //我的钱包-我的余额
            'pages/putForward/main', //提现申请
            'pages/myIntegral/main', //我的积分
            'pages/integralMall/main', //积分商城
            'pages/productDetailIntegral/main', //商品详情-积分商品
            'pages/addressReceive/main', //收货地址
            'pages/addressAdd/main', //新增地址
            'pages/addressChange/main', //修改地址
            'pages/personalInfo/main', //个人信息
            'pages/bankCardBinding/main', //银行卡绑定
            'pages/myDistribution/main', //我的分销
            'pages/promoteOrder/main', //推广订单
            'pages/myTeam/main', //我的团队
            'pages/promoteStart/main', //开始推广
            'pages/newsList/main', //最新资讯
            'pages/newsDetail/main', //最新资讯-详情
            'pages/helpCenter/main', //帮助中心
            'pages/helpDetail/main', //帮助中心-详情
            'pages/search/main', //搜索页面
            /*'pages/productList/main',//
            'pages/productList/main',//
            'pages/productList/main',//
            'pages/productList/main',//
              */
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '瀛橘天香',
            navigationBarTextStyle: '#333'
        },
        tabBar: {
            color: '#414d28',
            selectedColor: '#414d28',
            backgroundColor: '#fff',
            borderStyle: '#fff',
            position: 'bottom',
            list: [{
                pagePath: "pages/index/main",
                text: "首页",
                iconPath: 'static/img/ico-nav-home1.png',
                selectedIconPath: 'static/img/ico-nav-home2.png'
            }, {
                pagePath: "pages/sort/main",
                text: "分类",
                iconPath: 'static/img/ico-nav-sort1.png',
                selectedIconPath: 'static/img/ico-nav-sort2.png'
            }, {
                pagePath: "pages/cart/main",
                text: "购物车",
                iconPath: 'static/img/ico-nav-cart1.png',
                selectedIconPath: 'static/img/ico-nav-cart2.png'
            }, {
                pagePath: "pages/personalCenter/main",
                text: "我的",
                iconPath: 'static/img/ico-nav-me1.png',
                selectedIconPath: 'static/img/ico-nav-me2.png'
            }]
        }
    }
}