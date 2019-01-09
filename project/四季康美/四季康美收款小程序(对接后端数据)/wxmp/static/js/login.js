import config from './config.js'; //引入配置文件

//var openid = null;
var login = {
    wxCheckSession(){
        return new Promise((resolve, reject) => {
            wx.checkSession({
                success: () => {
                    //session_key 未过期，并且在本生命周期一直有效
                    var openid = wx.getStorageSync('openid');
                    //本地不存在openid(被清除或其它原因)，继续执行登录
                    if (openid == '') {
                        this.wxlogin().then((openid) => {
                            resolve(openid);
                        });
                    } else {
                        resolve(openid);
                    }
                },
                fail: () => {
                    // 重新登录：session_key 已经失效，需要重新执行登录流程
                    this.wxlogin().then((openid) => {
                        resolve(openid);
                    });
                }
            });
        });
    },
    wxlogin(){
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        //登录--发起网络请求
                        wx.request({
                            url: `${config.url}api/submit_ajax.ashx`,//修改---接口
                            method: 'get',
                            data: {
                                'action': 'wechat_login',//修改---参数
                                'code': res.code,
                                'token':config.token
                            },
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success: (res) => {
                                let openid = res.data.openid;
                                wx.setStorageSync('openid', openid);
                                resolve(openid);
                                /*if (res.data.msg === 1) {
                                    
                                } else if (res.data.msg === 2) {
                                    
                                }*/
                            }
                        });
                    } else {
                        reject(res.errMsg);
                        console.log('登录失败:' + res.errMsg)
                    }
                }
            });
        });
    }
};


//login.wxCheckSession();

module.exports = { login };