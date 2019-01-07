//var common = require('../../common/js/common.js');
Component({
    behaviors: [],

    properties: {

    },
    data: {
        tel1: '020-61136292',
        tel2: '400-6633-949',
        tel3: '87569708',
        copyright: `版权所有 © 2002-${(new Date()).getFullYear()} 广州讯博网络科技有限公司`,
        companyName: '广州讯博网络科技有限公司',
        companyAdress: '广州市天河区龙口西路 77 号天信大厦 16 楼',
        mail: 'dennis@cenbel.com',
        longitude: 113.3359714576721,
        latitude: 23.136974396537887
    },
    relations: {},
    externalClasses: [],
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {},

    methods: {
        common: function() {
            /** 公有方法--外部调用*/

        },
        _callPhone(e) {
            //拔打电话
            wx.makePhoneCall({
                phoneNumber: e.target.dataset.tel
            });
        },
        _copyMail(e) {
            //复制邮箱
            wx.showModal({
                title: '邮箱',
                confirmText: '复制',
                content: e.target.dataset.mail,
                success: function(res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')
                        copy();
                    } else if (res.cancel) {
                        //console.log('用户点击取消')
                    }
                }
            });

            var copy = function() {
                wx.setClipboardData({
                    data: e.target.dataset.mail,
                    success: function(res) {
                        wx.showToast({
                            title: '复制成功',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                });
            }
        },
        _openLocation() {
            //微信内置地图查看位置
            wx.openLocation({
                longitude: this.data.longitude,
                latitude: this.data.latitude,
                scale: 28,
                name: this.data.companyName,
                address: this.data.companyAdress
            });
        }
    }
});