//分享(转发)与分销---二维码图片的参数[oid]必须与这里的相同
import store from '@/store/store.js'
import config from '@/utils/config.js'
import fly from '@/utils/flyio.js' //引入flyio对象
let memberid = wx.getStorageSync('memberid');
let msg = {
    title: '我在这里发现一款靓茶，好香很好喝！',
    path: `pages/index/main?oid=${memberid}`,
    imageUrl: `${config.url}img/share1.jpg`,
    shareIdName: 'oid'
};
let distribution = async(options) => {
    if (options.oid) {
        console.log('distribution-----options:', options);
        wx.setStorageSync('memberid', options.oid); //保存oid分享者id
        wx.setStorageSync('loginDate', ''); //清空日期-解禁每天只登录一次-只要从分享链接进来都会让他登录一次
        await store.dispatch('login'); //登录
    }

    /*return;
    
    return new Promise((resolve, reject) => {
        //分销处理
        if (options.oid) {
            var urlData = {
                'ActionName': 'shareManage',
                //'productid': '',
                'shareopenid': options.oid,
                'readopenid': store.state.login.openid
            };
            fly.get('post/postMemberData.ashx', urlData).then((res) => {
                if (res.data.msg === 0) {
                    //没数据，请添加
                    console.log('res.data.msg:', res.data);
                    resolve(null);
                } else if (res.data.msg === 1) {
                    console.log('share.js分销urlData:', urlData);
                    resolve('分销数据提交成功');
                } else if (res.data.msg === 2) {
                    console.log('res.data.msg:', res.data);
                    resolve(null);
                }
            });
        }
    });*/
};

let shareToFriend = () => {
    //每天分享仅获取一次积分
    return new Promise((resolve, reject) => {
        let urlData = {
            'ActionName': 'ShareProduct'
        };
        fly.get('post/postMemberData.ashx', urlData).then((res) => {
            console.log(res.data);
            if (res.data.msg === 0) {
                console.log('分享失败msg=0:', res.data);
                this.$alert(res.data.msgbox);
                resolve(false);
            } else if (res.data.msg === 1) {
                console.log('分享成功msg=1:', res.data);
                resolve(true);
            } else if (res.data.msg === 2) {
                console.log('分享失败msg=2:', res.data);
                this.$alert(res.data.msgbox);
                resolve(false);
            }
        });
    });
}

export { msg, distribution, shareToFriend };
//获取  import * as share from '@/utils/share.js'