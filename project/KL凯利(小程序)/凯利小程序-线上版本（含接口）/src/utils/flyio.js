/*
 *MPVUE中用的ajax插件
 *1.安装 npm install flyio --save-dev
 *
 */
import config from '@/utils/config.js'; //引入配置文件
import store from '@/store/store.js'
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly(); //创建fly实例
//添加请求拦截器
fly.interceptors.request.use(async(config) => {
    //给所有请求添加自定义header
    //console.log(config.body, config.url, config.baseURL)

    fly.lock(); //锁定请求
    await store.dispatch('login'); //登录方法(同步)-调用接口会自动检测有没openid，没就加载，有就跳过，所以不用if的判断条件
    fly.unlock(); //解除所有锁定
    config.body.openid = store.state.login.openid; //所有请求都会加openid
    config.headers["X-Tag"] = "flyio";
    config.headers["TOKEN"] = "TOKEN";
    /*if (store.state.login.openid == null) {
      //这个方法会全部锁定
        fly.lock();
        await store.dispatch('login'); //登录方法
    } else {
        fly.unlock();
        config.body.openid = store.state.login.openid; //所有请求都会加openid
        config.headers["X-Tag"] = "flyio";
        config.headers["TOKEN"] = "TOKEN";
    }*/

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
fly.config.baseURL = `${config.url}data/`; //ajax数据请求地址http://192.168.123.117/data/

export default fly;