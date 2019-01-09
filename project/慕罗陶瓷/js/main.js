//首页的新品推荐
function newProductTuiJian(obj){
	var time = obj.time || 3000;
	var newProductItem = document.getElementById('newProductItem');//tab的父级---瓷砖、艺术墙、卫浴
	var productTitle = newProductItem.getElementsByClassName('product-title');//tab的子类
	var wrappContent = document.getElementById('wrap-pContent');//CSS3动画滑动的对象
	var pContent = wrappContent.getElementsByClassName('pContent');//所有内容子块
	var ow = document.getElementById('index1NewProduct').parentNode.offsetWidth;
	
	var lctnNum = 0;
	var lastHTML = pContent[0].outerHTML;
	//var fristHTML = pContent[pContent.length-1].outerHTML;
	var oldHTML = wrappContent.innerHTML;
	wrappContent.innerHTML = /*fristHTML +*/ oldHTML + lastHTML;//第一个位置与最后一个位置插入
	pContent = wrappContent.getElementsByClassName('pContent');
	var tallw = wrappContent.offsetWidth;//总长度
	var space = (tallw - ow * pContent.length)/pContent.length;//间隔
	var timeToLeft = 1000 ,isCanMove = true;
	transitionTime(0);
	transform3dX(-(lctnNum * ow + lctnNum*space));
	
	for(var i = 0 ; i < productTitle.length ; i ++){
		productTitle[i].index = i;
		productTitle[i].onclick = function(){
			if(isCanMove){
				clearInterval(setIval);//清除定时器
				lctnNum = this.index;
				clearTabTitle(lctnNum);
				transitionTime(timeToLeft);
				transform3dX(-(lctnNum * ow + lctnNum*space));
				setIvalF();//激活定时器
			}
		}
	}
	wrappContent.onmouseenter = function(){
		clearInterval(setIval);//清除定时器
	}
	wrappContent.onmouseleave = function(){
		setIvalF();//激活定时器
	}
	var setIval;
	setIvalF();//激活定时器
	function setIvalF(){
		setIval = setInterval(function(){
			lctnNum ++;
			transitionTime(timeToLeft);
			transform3dX(-(lctnNum * ow + lctnNum*space));
			if(lctnNum != pContent.length-1){
				clearTabTitle(lctnNum);
			}
			if(lctnNum == pContent.length-1){
				isCanMove = false;
				lctnNum = 0;
				clearTabTitle(lctnNum);
				var setTime = setTimeout(function(){
					transitionTime(0);
					transform3dX(-(lctnNum * ow + lctnNum*space));
					isCanMove = true;
					clearTimeout(setTime);
				},timeToLeft);
			}
			
		},time);
	}
	
	function transitionTime(n){
		wrappContent.style.transitionDuration = n + 'ms';
		wrappContent.style.msTransitionDuration = n + 'ms';
		wrappContent.style.mozTransitionDuration = n + 'ms';
		wrappContent.style.webkitTransitionDuration = n + 'ms';
	}
	
	function transform3dX(n){
		var a = 'translate3d(',b = 'px, 0px, 0px) translateZ(0px)';
		wrappContent.style.transform = a + n + b;
		wrappContent.style.msTransform = a + n + b;
		wrappContent.style.mozTransform = a + n + b;
		wrappContent.style.webkitTransform = a + n + b;
	}
	transition();
	function transition(){
		var a = 'transform',b = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		wrappContent.style.transitionProperty = a;
		wrappContent.style.msTransitionProperty = a;
		wrappContent.style.mozTransitionProperty = a;
		wrappContent.style.webkitTransitionProperty = a;
		
		wrappContent.style.transitionTimingFunction = b;
		wrappContent.style.msTransitionTimingFunction = b;
		wrappContent.style.mozTransitionTimingFunction = b;
		wrappContent.style.webkitTransitionTimingFunction = b;
	}
	function clearTabTitle(n){
		for(var i = 0 ; i < productTitle.length ; i ++){
			productTitle[i].className = productTitle[i].className.replace(/(tActive)/g,"").trim();
		}
		productTitle[n].className += " tActive";
	}
}
window.addEventListener('DOMContentLoaded',function(){
	if(document.getElementById('newProductItem')){
		new newProductTuiJian({
			"time":4000
		});
	}
},false);

//首页的新品推荐end

//首页的创新前沿
window.addEventListener('DOMContentLoaded',function(){
	//ul2ItemActive
	
	var index2Ul = document.getElementById('index2-ul');
	var index2ContentWrap = document.getElementById('index2-content-wrap');
	if(!index2Ul || !index2ContentWrap){
		return;
	}
	var liItem = index2Ul.getElementsByClassName('ul2-item');
	var contentItem = index2ContentWrap.getElementsByClassName('index2-citem');
	var space = (liItem[0].offsetWidth - liItem[0].getElementsByTagName('a')[0].offsetWidth)/2;
	var wrapOw = index2Ul.parentNode.parentNode.offsetWidth;
	var ow = liItem[0].offsetWidth;
	var num = 0 , toTimeX = 300 ;
	
	for (var i = 0 ; i < liItem.length ; i ++) {
		//选项卡
		liItem[i].index = i;
		liItem[i].onclick = function(e){
			
			var e = e||window.event;
			e.preventDefault();
			e.stopPropagation();
			var index = this.index;
			for (var i = 0 ; i < liItem.length ; i ++) {//index2CitemActive
				liItem[i].className = liItem[i].className.replace(/(ul2ItemActive)/g,"").trim();
				contentItem[i].className = contentItem[i].className.replace(/(index2CitemActive)/g,"").trim();
			}
			liItem[index].className += ' ul2ItemActive';
			contentItem[index].className += ' index2CitemActive';
			
		};
		liItem[i].getElementsByTagName('a')[0].onclick = function(e){
			var e = e||window.event;
			e.preventDefault();
		}
	}
	
	index2Ul.addEventListener('mouseenter',showImg,false);
	index2Ul.addEventListener('touchstart',showImg,false);
	function showImg(){
		//图片懒加载，只显示第一张图片，当鼠标放上去时，加载其它图片
		var c2img = index2ContentWrap.getElementsByClassName('c2-img');
		for (var i = 0 ; i < c2img.length ; i ++) {
			var img = c2img[i].getElementsByTagName('img')[0];
			if(!img.src){
				img.src = img.getAttribute('data-src');
			}
		}
	}
	var startX , endX, startY , endY , ratioXY , lctnX;
	transition();
	transitionTime(0);
	transform3dX(-space);
	index2Ul.addEventListener('touchstart',start,false);
	index2Ul.addEventListener('mousedown',start,false);
	index2Ul.ondragstart = function(){
		return false;
	}
	document.addEventListener('touchend',end,false);
	document.addEventListener('mouseup',end,false);
	function start(e){
		var e = e || window.event;
		startX = e.pageX || e.targetTouches[0].pageX;//记录X轴开始的位置
		startY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		lctnX = getX3d();
		document.addEventListener('touchmove',move,false);
		document.addEventListener('mousemove',move,false);
		document.ontouchmove = null;
	}
	function end(e){
		var e = e || window.event;
		endX = e.pageX || e.changedTouches[0].pageX;//记录X轴结束的位置
		
		var x3d = -getX3d();
		num = Math.round(x3d/ow);//四舍五入
		if(-x3d>-space){
			num = 0;
			transitionTime(toTimeX);
			transform3dX(-space);
		}
		var val = ow*num + space;
		if(val > (ow*liItem.length - wrapOw)){
			val = ow*liItem.length - wrapOw;
			transitionTime(toTimeX);
			transform3dX(-val);
		}
		
		document.removeEventListener('touchmove',move,false);
		document.removeEventListener('mousemove',move,false);
		document.removeEventListener('touchmove',noUpDownMove,false);//恢复浏览器上下滑动
	}
	function move(e){
		
		var e = e || window.event;
		endX = e.pageX || e.targetTouches[0].pageX;//记录Y轴结束的位置
		endY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		ratioXY = Math.abs(endX-startX)/Math.abs(endY-startY);
		
		if(ratioXY>3){
			var x3d = lctnX + endX - startX;
			transitionTime(0);
			transform3dX(x3d);
			document.addEventListener('touchmove',noUpDownMove,false);//禁止浏览器上下滑动
		}
	}
	
	function noUpDownMove(e){
		//var e = e || window.event;
		//禁止网页上下滑动
		e.preventDefault();
	}
	function transition(){
		//设置过渡属性和规定过渡效果的时间曲线
		var aaa = 'transform',bbb = 'ease';
		index2Ul.style.transitionProperty = aaa;
		index2Ul.style.webkitTransitionProperty = aaa;
		
		index2Ul.style.transitionTimingFunction = bbb;
		index2Ul.style.webkitTransitionTimingFunction = bbb;
	}
	function transitionTime(n){
		//定义过渡效果花费的时间
		index2Ul.style.transitionDuration = n + 'ms';
		index2Ul.style.webkitTransitionDuration = n + 'ms';
		index2Ul.style.mozTransitionDuration = n + 'ms';
		index2Ul.style.msTransitionDuration = n + 'ms';
	}
	
	function transform3dX(n){
		//Y轴方向的距离
		var a = 'translate3d(',b = 'px,0px,0px) translateZ(0px)';
		index2Ul.style.transform = a + n + b;
		index2Ul.style.msTransform = a + n + b;
		index2Ul.style.mozTransform = a + n + b;
		index2Ul.style.webkitTransform = a + n + b;
	}
	
	function getX3d(){
		return parseInt((index2Ul.style.transform.match(/\([\S]+,/g) + "").replace(/\(|px|\,/g,""));
	}
	
	document.getElementById('preTitle2List').onclick = function(){
		num--;
		if(num<0){
			num = 0;
			transitionTime(toTimeX);
			transform3dX(space);
			var setTime = setTimeout(function(){
				transform3dX(-space);
				clearTimeout(setTime);
			},toTimeX+1);
		}else{
			var val = ow*num + space;
			transitionTime(toTimeX);
			transform3dX(-val);
		}
			
	}
	document.getElementById('nextTitle2List').onclick = function(){
		num++;
		var val = ow*num + space;
		if(val > (ow*liItem.length - wrapOw)){
			num --;
			val = ow*liItem.length - wrapOw + space*2;
			transitionTime(toTimeX);
			transform3dX(-val);
			var setTime = setTimeout(function(){
				transform3dX(-(val-space*2));
				clearTimeout(setTime);
			},toTimeX+1);
		}else{
			transitionTime(toTimeX);
			transform3dX(-val);
		}
	}
	
},false);

//首页的创新前沿end

//首页的加盟店
window.addEventListener('DOMContentLoaded',function(){
	var preBtn = document.getElementById('shopJoinPreBtn');
	var nextBtn = document.getElementById('shopJoinNextBtn');
	var wrap = document.getElementById('shopJoin');
	if(!wrap){
		return;
	}
	var item = shopJoin.getElementsByTagName('li');
	
	var l1 = item[0].outerHTML;
	var l2 = item[1].outerHTML;
	var l3 = item[2].outerHTML;
	var f1 = item[item.length-3].outerHTML;
	var f2 = item[item.length-2].outerHTML;
	var f3 = item[item.length-1].outerHTML;
	wrap.innerHTML = f1 + f2 + f3 + wrap.innerHTML + l1 + l2 + l3;
	
	var ow = item[0].offsetWidth , lctnNum = 3 , timeX = 500 , isCanMove = true;
	transition();
	transitionTime(0);
	transform3dX(-ow*lctnNum);
	
	wrap.onmouseenter = function(){
		clearInterval(setIval);//清除定时器
	}
	wrap.onmouseleave = function(){
		setIvalF();//激活定时器
	}
	preBtn.onclick = function(){
		//上一个加盟店
		if(isCanMove){
			clearInterval(setIval);//清除定时器
			lctnNum --;
			transitionTime(timeX);
			transform3dX(-ow*lctnNum);
			if(lctnNum==0){
				isCanMove = false;
				var setTime = setTimeout(function(){
					lctnNum = item.length-6;
					transitionTime(0);
					transform3dX(-ow*lctnNum);
					isCanMove = true;
				},timeX+1);
			}
			setIvalF();//激活定时器
		}
	}
	nextBtn.onclick = function(){
		//下一个加盟店
		if(isCanMove){
			clearInterval(setIval);//清除定时器
			lctnNum ++;
			transitionTime(timeX);
			transform3dX(-ow*lctnNum);
			if(lctnNum==item.length-3){
				isCanMove = false;
				var setTime = setTimeout(function(){
					lctnNum = 3;
					transitionTime(0);
					transform3dX(-ow*lctnNum);
					isCanMove = true;
				},timeX+1);
			}
			setIvalF();//激活定时器
		}
	}
	var setIval,timeIval=3000;
	setIvalF();//激活定时器
	function setIvalF(){
		setIval = setInterval(function(){
			lctnNum ++;
			transitionTime(timeX);
			transform3dX(-ow*lctnNum);
			if(lctnNum==item.length-3){
				isCanMove = false;
				var setTime = setTimeout(function(){
					lctnNum = 3;
					transitionTime(0);
					transform3dX(-ow*lctnNum);
					isCanMove = true;
				},timeX+1);
			}
		},timeIval);
	}
	function transition(){
		//设置过渡属性和规定过渡效果的时间曲线
		var aaa = 'transform',bbb = 'ease';
		wrap.style.transitionProperty = aaa;
		wrap.style.webkitTransitionProperty = aaa;
		
		wrap.style.transitionTimingFunction = bbb;
		wrap.style.webkitTransitionTimingFunction = bbb;
	}
	function transitionTime(n){
		//定义过渡效果花费的时间
		wrap.style.transitionDuration = n + 'ms';
		wrap.style.webkitTransitionDuration = n + 'ms';
		wrap.style.mozTransitionDuration = n + 'ms';
		wrap.style.msTransitionDuration = n + 'ms';
	}
	
	function transform3dX(n){
		//Y轴方向的距离
		var a = 'translate3d(',b = 'px,0px,0px) translateZ(0px)';
		wrap.style.transform = a + n + b;
		wrap.style.msTransform = a + n + b;
		wrap.style.mozTransform = a + n + b;
		wrap.style.webkitTransform = a + n + b;
	}
	
	function getX3d(){
		return parseInt((wrap.style.transform.match(/\([\S]+,/g) + "").replace(/\(|px|\,/g,""));
	}
},false);

//首页的加盟店end

//底部微信、QQ、电话的联系方式---已用css hover伪类解决
/*$(function(){
	$(".contact-ico").mouseenter(function(){
		$(".popover-box").addClass('hide').removeClass('show');
		$(this).find('.hide').addClass('show').removeClass('hide');
	});
	$(".contact-ico").mouseleave(function(){
		$(".popover-box").addClass('hide').removeClass('show');
	});
});*/
//底部微信、QQ、电话的联系方式end
