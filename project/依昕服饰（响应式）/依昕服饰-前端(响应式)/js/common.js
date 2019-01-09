/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function() {
	//菜单栏
	$('.mobile-menu').click(function() {
		var flag = $(this).hasClass('active');
		if(flag) {
			$(this).removeClass('active');
			$("#mobile-nav").slideUp();
		} else {
			$(this).addClass('active');
			$("#mobile-nav").slideDown();
		}
	});
	var $mobileNavLi = $("#mobile-nav .first-level-list");
	$mobileNavLi.click(function() {
		var flag = $(this).hasClass('active');
		if(flag) {
			$(this).removeClass('active');
			$(this).find('.second-level').slideUp();
		} else {
			$(this).addClass('active');
			$(this).find('.second-level').slideDown();
		}
	});
	$("#mobile-nav .first-level-list>a,.second-level").click(function() {
		event.stopPropagation(); //阻止冒泡
	})
});
$(function(){
	//clothing-列表页面
	$(".screen-info .title").click(function(){
		var $scfncon = $(this).parent().find('.scfncon');
		var val = $scfncon.css('display');
		if(val !== 'none'){
			$(this).find('.title').addClass('active');
			$scfncon.slideUp();
		}else{
			$(this).find('.title').removeClass('active');
			$scfncon.slideDown();
		}
		
	});
});



$(function() {
	//快速购买与收藏的点击后，禁止父级a标签的链接跳转
	$(".collection-quick").click(function() {
		event.preventDefault();
	});
});

function PriceSection(options) {
	//价格区间
	var el = document.querySelector(options.el);
	var bar = el.querySelector('.price-bar');
	var barL = el.querySelector('.price-bar-left');
	var barR = el.querySelector('.price-bar-right');
	var barLine = el.querySelector('.price-bar-line');
	var minDom = el.querySelector('#price-min');
	var maxDom = el.querySelector('#price-max');
	var dataMin = el.querySelector('.price-num-min').getAttribute('data-min-num');
	var dataMax = el.querySelector('.price-num-max').getAttribute('data-max-num');
	dataMin = Number(dataMin);
	dataMax = Number(dataMax);

	var width, startX, endX, currentDom, percentLeft, percentRight, beforeMinVal, beforeMaxVal, afterMinVal, afterMaxVal, chage, self = this;

	barL.addEventListener('touchstart', start, false);
	barL.addEventListener('mousedown', start, false);

	barR.addEventListener('touchstart', start, false);
	barR.addEventListener('mousedown', start, false);

	document.addEventListener('touchstart', getBeforeVal, false);
	document.addEventListener('mousedown', getBeforeVal, false);

	document.addEventListener('touchend', end, false);
	document.addEventListener('mouseup', end, false);

	barR.addEventListener('touchstart', function() {
		document.body.style.overflow = 'hidden'; //禁止内容上下滑动
	}, false);
	document.addEventListener('touchend', function() {
		document.body.style.overflow = 'visible'; //恢复内容上下滑动
	}, false);
	bar.ontouchstart = function(e) {
		//长按press事件会导致浏览器弹出菜单，苹果用-webkit-touch-callout: none;来禁止，但是安卓用e.preventDefault(); 
		e.preventDefault();
	}
	el.ondragstart = function() { //禁止拖动
		return false;
	}

	function start() {
		var e = event || window.event;
		currentDom = e.target;
		startX = e.screenX || e.targetTouches[0].screenX;
		width = bar.clientWidth; //初始化宽度
		percentLeft = barL.style.left.replace(/\%/g, "");
		percentRight = barR.style.right.replace(/\%/g, "");
		percentLeft = Number(percentLeft);
		percentRight = Number(percentRight);

		document.addEventListener('touchmove', move, false); //添加侦听器
		document.addEventListener('mousemove', move, false); //添加侦听器

		document.ontouchmove = function() { //图片区域禁止浏览左右滑动
			return false;
		}
	}

	function move() {
		var e = event || window.event;
		endX = e.screenX || e.targetTouches[0].screenX;
		barLR();
	}

	function end() {
		document.removeEventListener('touchmove', move, false); //删除侦听器
		document.removeEventListener('mousemove', move, false); //删除侦听器
		document.ontouchmove = null; //图片区域恢复浏览左右滑动

		afterMinVal = Number(minDom.innerHTML);
		afterMaxVal = Number(maxDom.innerHTML);
		//console.log(beforeMinVal, afterMinVal, beforeMaxVal, afterMaxVal);
		if(beforeMinVal == afterMinVal && beforeMaxVal == afterMaxVal) {
			chage = false;
		} else {
			chage = true;
		}
		var obj = {
			'change': chage,
			'min': Number(minDom.innerHTML),
			'max': Number(maxDom.innerHTML)
		};
		if(options.cb !== undefined) {
			options.cb(obj);
		}
		if(self.cb !== undefined) {
			self.cb(obj);
		}
	}

	function barLR() {
		var betweenVal = endX - startX; //两点间的距离，也可以判断正负。

		if(barL == currentDom) {

			var ratio = (betweenVal * 100) / width;
			var valid = ratio + percentLeft;
			valid = Math.max(valid, 0)

			var price = (dataMax - dataMin) * (valid / 100);
			price = dataMin + Math.ceil(price);

			valid = Math.min(valid, (100 - percentRight))
			price = Math.min(price, Number(maxDom.innerHTML));

			currentDom.style.left = valid + '%';
			minDom.innerHTML = price;
			barLine.style.left = valid + '%';
		} else if(barR == currentDom) {
			var ratio = (-betweenVal * 100) / width;
			var valid = ratio + percentRight;
			valid = Math.max(valid, 0);

			var price = (dataMax - dataMin) * (valid / 100);
			price = dataMax - Math.ceil(price);

			valid = Math.min(valid, (100 - percentLeft))
			price = Math.max(price, Number(minDom.innerHTML));

			currentDom.style.right = valid + '%';
			maxDom.innerHTML = price;
			barLine.style.right = valid + '%';
		}
	}

	function getBeforeVal() {
		beforeMinVal = Number(minDom.innerHTML);
		beforeMaxVal = Number(maxDom.innerHTML);
	}
};