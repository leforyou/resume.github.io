﻿/****
 *配置flyio
 * 
 * */
var config = require('config.js');
var Fly = require("flyio.min.js");
var fly = new Fly(); //创建fly实例
//添加请求拦截器
fly.interceptors.request.use((config) => {
    //fly.lock(); //锁定请求
    //fly.unlock(); //解除所有锁定
    //给所有请求添加自定义header
    config.headers["X-Tag"] = "flyio";
    config.headers["TOKEN"] = "TOKEN";
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
fly.config.baseURL = `${config.url}data/`; //ajax数据请求地址https://www.cenbel.com/data/


module.exports = fly;