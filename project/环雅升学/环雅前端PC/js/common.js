/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */
//百度分享插件配置---来源百度官方
window._bd_share_config = {
	"common": {
		"bdSnsKey": {},
		"bdText": "",
		"bdMini": "2",
		"bdMiniList": false,
		"bdPic": "",
		"bdStyle": "0",
		"bdSize": "32"
	},
	"share": {},
	/*"image": {//配置这个参数后，页面的所有图片获取鼠标焦点后，都显示分享的浮动条
		"viewList": ["tsina", "tqq", "sqq", "weixin"],
		"viewText": "分享到：",
		"viewSize": "16"
	},
	"selectShare": {//划词分享
		"bdContainerClass": null,
		"bdSelectMiniList": ["tsina", "tqq", "sqq", "weixin"]
	}*/
};
//加载百度分享插件的js---来源百度官方
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];