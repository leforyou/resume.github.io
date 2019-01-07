function initNav(app) {
    app.isNav = false;
}

function serveType(args) {
    var arr = [];
    for (var i = 0; i < args.length; i++) {
        arr.push({ 'txt': args[i], 'width': '50%' });
    }
    if (args.length % 2 === 1) arr[0].width = '100%';
    return arr;
}


let alert = function(msg) {
    wx.showToast({
        title: msg || '数据获取失败',
        icon: 'none',
        duration: 2000
    });
}
let modal = function(msg) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: msg || '信息内容',
            success: function(res) {
                if (res.confirm) {
                    resolve(true);
                    //console.log('用户点击确定')
                } else if (res.cancel) {
                    resolve(false);
                    //console.log('用户点击取消')
                }
            }
        });
    });
}


module.exports = { serveType, initNav, alert, modal };