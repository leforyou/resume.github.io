(function($) {
	$.fn.movebg = function(options) {
		var defaults = {
			width: 120,
			/*移动块的大小*/
			extra: 50,
			/*反弹的距离*/
			speed: 300,
			/*块移动的速度*/
			rebound_speed: 300 /*块反弹的速度*/
		};
		var defaultser = $.extend(defaults, options);
		return this.each(function() {
			var _this = $(this);
			var _item = _this.children("ul").children("li").children("a"); /*找到触发滑块滑动的元素	*/
			var origin = _this.children("ul").children("li.cur").index(); /*获得当前导航的索引*/
			var _mover = _this.find(".move-bg"); /*找到滑块*/
			var hidden; /*设置一个变量当html中没有规定cur时在鼠标移出导航后消失*/
			if(origin == -1) {
				origin = 0;
				hidden = "1"
			} else { _mover.show() }; /*如果没有定义cur,则默认从第一个滑动出来*/
			var cur = prev = origin; /*初始化当前的索引值等于上一个及初始值;*/
			var extra = defaultser.extra; /*声明一个变量表示额外滑动的距离*/
			_mover.css({ left: "" + defaultser.width * origin + "px" }); /*设置滑块当前显示的位置*/

			//设置鼠标经过事件
			_item.each(function(index, it) {
				$(it).mouseover(function() {
					cur = index; /*对当前滑块值进行赋值*/
					move();
					prev = cur; /*滑动完成对上个滑块值进行赋值*/
				});
			});
			_this.mouseleave(function() {
				cur = origin; /*鼠标离开导航时当前滑动值等于最初滑块值*/
				move();
				if(hidden == 1) { _mover.stop().fadeOut(); } /*当html中没有规定cur时在鼠标移出导航后消失*/
			});

			//滑动方法
			function move() {
				_mover.clearQueue();
				if(cur < prev) { extra = -Math.abs(defaultser.extra); } /*当当前值小于上个滑块值时，额外滑动值为负数*/
				else { extra = Math.abs(defaultser.extra) }; /*当当前值大于上个滑块值时，滑动值为正数*/
				_mover.queue(
					function() {
						$(this).show().stop(true, true).animate({ left: "" + Number(cur * defaultser.width + extra) + "" }, defaultser.speed),
							function() { $(this).dequeue() }
					}
				);
				_mover.queue(
					function() {
						$(this).stop(true, true).animate({ left: "" + cur * defaultser.width + "" }, defaultser.rebound_speed),
							function() { $(this).dequeue() }
					}
				);
			};
		})
	}
})(jQuery);

/*$(function() {
	$(".nav").movebg({
		width: 120,
		extra: 40,
		speed: 300,
		rebound_speed: 400
	});
});*/



/*
  * 随滚动条固定导航到顶部代码
*/
$(function() { 
	$.fn.NavFixed = function(obj) { 
		var $selfNav = $(this),
		objTop = obj.top || 0,
		objScrollTop = obj.scrollTop || 200,
		objZIndex = obj.zIndex || "auto";
		
		$(window).scroll(function() {
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//这行代码主要兼容谷歌、火狐、IE浏览器
			if(scrollTop >= objScrollTop) {
				$selfNav.css({
					"position":"fixed",
					"top":(objTop+"px"),
					"left":"0px",
					"right":"0px",
					"zIndex":objZIndex
				});
			} else if(scrollTop < objScrollTop) {
				$selfNav.css({"position":"static"});
			}
		});
	} 
	var h = $(".head-top").height() + $(".head-middle").height();
	$('.head-bottom').NavFixed({
		"top":0,
		"scrollTop":h,
		"zIndex":9999
	});
	//第一个值： 你期望导航在距离顶部多少的位置浮动
	//第二人值：浏览器滚动条到达的位置
	//第三个值： 导航z-index
});

