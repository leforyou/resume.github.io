var common = require('../../common/js/common.js');
Component({
    behaviors: [],

    properties: {

    },
    data: {
        isActive: false
    }, // 私有数据，可用于模版渲染
    relations: {},
    externalClasses: [],
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    created: function() {
        this.setData({
            isActive: false
        });
    },
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {},

    methods: {
        navTab: function() {
            /** 公有方法--外部调用*/
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
                isActive: !this.data.isActive
            });
        },
        _myPrivateMethod: function() {
            // 内部方法建议以下划线开头
            this.setData({
                isActive: !this.data.isActive
            });
        }
    }
});