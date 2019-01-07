//import fly from '@/utils/flyio.js' //引入flyio对象getNowFormatDate
import config from '@/utils/config.js'; //引入配置文件
import getDateYYMMDD from '@/utils/date.js'; //引入配置文件

const login = {
    state: {
        openid: null,
        memberid: null
    },
    mutations: {
        handleId(state, { openid, memberid }) {
            state.openid = openid;
            state.memberid = memberid;
        }
    },
    actions: {
        login(context) {
            return new Promise(async(resolve, reject) => {
                /*await context.dispatch('wxlogin').then(({ openid, res, memberid }) => {
                    resolve(openid);
                });
                return; */

                //每天都登录一次
                var loginDate = wx.getStorageSync('loginDate');
                var today = getDateYYMMDD();
                if (today != loginDate) {
                    await context.dispatch('wxlogin').then(({ openid, res, memberid }) => {
                        if (res.data.msgbox.indexOf('积分') > -1) {
                            wx.showToast({
                                title: res.data.msgbox,
                                icon: 'none',
                                duration: 2000
                            });
                        }
                        wx.setStorageSync('loginDate', today);
                        resolve(openid);
                    });
                }
                //将会储存在本地的数据保存到vuex中去
                var openid = wx.getStorageSync('openid');
                var memberid = wx.getStorageSync('memberid');
                if (openid != '' && memberid != '') {
                    context.commit('handleId', { openid, memberid });
                }
                //登录失效或openid不存在本地-继续执行登录
                await context.dispatch('wxCheckSession').then((openid) => {
                    resolve(openid);
                });
                resolve(openid); //注意：不能删除这行，promise必须保证有resolve处理，才能继续向下执行
            });
        },
        wxCheckSession(context) {
            //检查登录状态
            return new Promise((resolve, reject) => {
                wx.checkSession({
                    success: () => {
                        //session_key 未过期，并且在本生命周期一直有效
                        try {
                            var openid = wx.getStorageSync('openid');
                            var memberid = wx.getStorageSync('memberid');
                        } catch (error) {
                            var openid = '';
                            var memberid = '';
                        }
                        //本地不存在openid(被清除或其它原因)，继续执行登录
                        if (openid == '' || memberid == '') {
                            context.dispatch('wxlogin').then(({ openid, res, memberid }) => {
                                resolve(openid);
                            });
                        } else {
                            resolve(openid);
                        }
                    },
                    fail: () => {
                        // session_key 已经失效，需要重新执行登录流程
                        //重新登录
                        context.dispatch('wxlogin').then(({ openid, res, memberid }) => {
                            //console.log('手机测试openid:没登录', openid);
                            resolve(openid);
                        });
                    }
                });
            });
        },
        wxlogin({ dispatch, commit }) {
            let oid = wx.getStorageSync('memberid');
            console.log('oid:---wxlogin  ', new Date(), 'memberid:', oid)
            return new Promise((resolve, reject) => {
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            //登录--发起网络请求
                            wx.request({
                                url: `${config.url}data/post/postMemberData.ashx`,
                                method: 'get',
                                data: {
                                    'ActionName': 'wxLogin',
                                    'js_code': res.code,
                                    'oid': oid
                                },
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                success: (res) => {
                                    if (res.data.msg === 1) {
                                        let openid = res.data.openid;
                                        let memberid = res.data.memberid;
                                        wx.setStorageSync('openid', openid);
                                        wx.setStorageSync('memberid', memberid);
                                        commit('handleId', { openid, memberid });
                                        resolve({ 'openid': openid, 'res': res, 'memberid': memberid });
                                    } else if (res.data.msg === 2) {
                                        Vue.prototype.$alert('登录失败');
                                        console.log('res.data.msg:', res.data);
                                    }
                                }
                            });
                            /*结合拦截器来用，就会形成递归回调
                            fly.get('post/postMemberData.ashx', { 'ActionName': 'wxLogin', 'js_code': res.code }).then((res) => {
                                if (res.data.msg === 1) {
                                    let openid = res.data.openid;
                                    commit('handleId', openid);
                                    wx.setStorageSync('openid', openid);
                                    resolve(openid);
                                } else if (res.data.msg === 2) {
                                    Vue.prototype.$alert('登录失败');
                                    console.log('res.data.msg:', res.data);
                                }
                            });*/
                        } else {
                            Vue.prototype.$alert('登录失败');
                            reject(res.errMsg);
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            });
        }
    }
}

export default login; //导出并在store.js中引入


/*外部使用
import store from '@/store/store.js'

store.dispatch('login');//登录方法一：异步 --可以使用 async await

store.dispatch('login').then((openid)=>{//登录方法二：同步（结合的是Promise）
    //在then内调用一些方法
    console.log('openid-personceterThen:',openid);
});

let openid = wx.getStorageSync('openid');//获取本地的openid

store.state.login.openid //获取变量的方法
 * 
 */


















/*下面登录是没有分销功能的
 //import fly from '@/utils/flyio.js' //引入flyio对象
import config from '@/utils/config.js'; //引入配置文件
const login = {
    state: {
        openid: null
    },
    mutations: {
        handleId(state, openid) {
            state.openid = openid;
        }
    },
    actions: {
        login(context) {
            return new Promise((resolve, reject) => {
                try {
                    var openid = wx.getStorageSync('openid');
                } catch (error) {
                    var openid = '';
                }
                if (openid != '') {
                    context.commit('handleId', openid);
                    resolve(openid);
                    //console.log('手机测试openid:---已登录', openid);
                } else {
                    context.dispatch('wxCheckSession').then((openid) => {
                        //console.log('手机测试openid:---已登录22222222222', openid);
                        resolve(openid);
                    });
                }
            });
        },
        wxCheckSession(context) {
            //检查登录状态
            return new Promise((resolve, reject) => {
                wx.checkSession({
                    success: async() => {
                        //session_key 未过期，并且在本生命周期一直有效
                        try {
                            var openid = wx.getStorageSync('openid');
                        } catch (error) {
                            var openid = '';
                        }
                        //console.log('手机测试openid:在有效期内11111111111', openid);
                        if (openid == '') {
                            //console.log('手机测试openid:在有效期内22222222222', openid);
                            await context.dispatch('wxlogin').then((openid) => {
                                resolve(openid);
                                //console.log('手机测试openid:在有效期内', openid);
                            });
                        }
                    },
                    fail: () => {
                        // session_key 已经失效，需要重新执行登录流程
                        //重新登录
                        context.dispatch('wxlogin').then((openid) => {
                            //console.log('手机测试openid:没登录', openid);
                            resolve(openid);
                        });
                    }
                });
            });
        },
        wxlogin({ dispatch, commit }) {
            return new Promise((resolve, reject) => {
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            //登录--发起网络请求
                            wx.request({
                                url: `${config.url}data/post/postMemberData.ashx`,
                                method: 'get',
                                data: {
                                    'ActionName': 'wxLogin',
                                    'js_code': res.code
                                },
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                success: (res) => {
                                    if (res.data.msg === 1) {
                                        let openid = res.data.openid;
                                        commit('handleId', openid);
                                        wx.setStorageSync('openid', openid);
                                        resolve(openid);
                                    } else if (res.data.msg === 2) {
                                        Vue.prototype.$alert('登录失败');
                                        console.log('res.data.msg:', res.data);
                                    }
                                }
                            });
                        } else {
                            Vue.prototype.$alert('登录失败');
                            reject(res.errMsg);
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            });
        }
    }
}

export default login; //导出并在store.js中引入

*/