function ImageViewer(obj){
	
	var ImageViewer = document.querySelector(obj.el);
	var imgviewGroup = document.createElement('div');
	
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	var lctnNum = (obj.lctnNum - 1) || 0; //图片是从1开始数起，不是0
	obj.isNumShow = obj.isNumShow || false;
	//lctnNum = 0 ;
	var images = obj.images;
	var len = images.length;
	
	ImageViewer.className = 'imgage-viewer';
	imgviewGroup.className = 'imgview-group';
	
	
	ImageViewer.setAttribute('style','background:#000;overflow:hidden;position:fixed;top:0;left:0;right:0;bottom:0;');
	imgviewGroup.innerHTML = '';//清空存在的图片
	imgviewGroup.style.width = (len * 100) + "%";
	transition();
	duration(0);
	translate3d(-lctnNum * w);
	/*imgviewGroup.style.transform = 'translate3d(' + (lctnNum * w) + 'px, 0px, 0px) translateZ(0px)';
	imgviewGroup.style.webkitTransform = 'translate3d(' + (lctnNum * w) + 'px, 0px, 0px) translateZ(0px)';*/
	
	
	//生成图片
	for(var i = 0 ; i < len ; i ++){
		var item = document.createElement('div');
		var img = document.createElement('img');
		item.className = 'imgview-item';
		item.style.width = w + 'px';
		item.style.height = h + 'px';
		item.style.textAlign = 'center';
		item.style.overflow = 'hidden';
		
		img.setAttribute('onload','fitImgView(this)');//图片在加载时执行
		//img.style.width = '100%';
		img.src = images[i];
		
		item.appendChild(img);
		imgviewGroup.appendChild(item);
		
	}
	var pDOM = document.createElement('p');
	pDOM.style.clear = 'both';
	imgviewGroup.appendChild(pDOM);
	ImageViewer.appendChild(imgviewGroup);
	//导航点与导航数字
	var navSpotNum = document.createElement('div');
	if(obj.isNumShow == true){
		navSpotNum.className = 'imgview-num';
		navSpotNum.innerHTML = '<span></span>';
	}else{
		navSpotNum.className = 'imgview-spot';
		var strSpot = '';
		for (var i = 0 ; i < len ; i ++) {
			strSpot += '<i></i>';
		}
		navSpotNum.innerHTML = strSpot;
		var iDots = navSpotNum.getElementsByTagName('i');
	}
	ImageViewer.appendChild(navSpotNum);
	setDotClass(lctnNum);
	
	var imgviewItem = imgviewGroup.getElementsByClassName('imgview-item');
	for (var i = 0 ; i < imgviewItem.length ; i ++) {//
		fitImgView(imgviewItem[i].firstChild);//图片加载时并没执行onload事件函数，这个方法则起到替换的作用
	}
	
	
	
	var ow = ImageViewer.offsetWidth;
	var startX = 0 , endX = 0 , startY=0, endY=0,startTime,endTime,dVal = 0 , timeTran = 500,swipeX,swipeY ;
	ImageViewer.addEventListener('touchstart', start, false);
	ImageViewer.addEventListener('mousedown', start, false);
	ImageViewer.addEventListener('touchend', end, false);
	ImageViewer.addEventListener('mouseup', end, false);
	
	function start(event) {
		var e = event || window.event;
		startX = e.screenX || e.targetTouches[0].screenX;
		startY = e.screenY || e.targetTouches[0].screenY;
		swipeX = true;
     	swipeY = true ;
		startTime = new Date();
		ImageViewer.addEventListener('touchmove',move, false);//添加侦听器
		ImageViewer.addEventListener('mousemove',move, false);//添加侦听器
		/*document.ontouchmove = function() { //图片区域禁止浏览左右滑动
			return false;
		}*/
		
	}
	function end(event){
		ImageViewer.removeEventListener('touchmove',move, false);//删除侦听器
		ImageViewer.removeEventListener('mousemove',move, false);//删除侦听器
		//document.ontouchmove = null; //图片区域恢复浏览左右滑动
		endTime = new Date() - startTime;
		if(30<endTime && endTime < 280 && swipeX == true){
			timeD();
		}else if(endTime >= 280 && swipeX == true){
			endUp();
		}
		dVal = 0;
	}
	
	function move(event){
		var e = event || window.event;
		endX = e.screenX || e.targetTouches[0].screenX;
		endY = e.screenY || e.targetTouches[0].screenY;
		dVal = endX - startX;//两点间的距离，也可以判断正负
		var x3d = lctnNum * ow - dVal;
		duration(0);
		
		if(swipeX == true && Math.abs(endX-startX)-Math.abs(endY-startY)>0) {//左右滑动
	        swipeY = false ;
	        event.stopPropagation();//阻止冒泡
	        event.preventDefault();//阻止浏览器默认事件
	        translate3d(-x3d);
	    }else if(swipeY == true && Math.abs(endX-startX)-Math.abs(endY-startY)<0){  //上下滑动
	        swipeX = false ;//上下滑动，使用浏览器默认的上下滑动
	        //document.ontouchmove = null; //图片区域恢复浏览左右滑动
	    }
		
	}
	
	function timeD(){
		if(dVal<0 && dVal != 0){
			lctnNum ++;
			if(lctnNum == len){//第一张(临界值)
				lctnNum = len - 1;
			}
			transition();
			duration(timeTran);
			translate3d(- lctnNum * ow);
			
			
		}else if(dVal>0 && dVal != 0){
			lctnNum -- ;
			if(lctnNum == -1){//最后一张(临界值)
				lctnNum = 0;
			}
			duration(timeTran);
			translate3d(- lctnNum * ow);
			
		}
		setDotClass(lctnNum);
	}
	
	
	function endUp(){
		transition();
		duration(timeTran);
		
		var X3D = imgviewGroup.style.transform.match(/\([\S]+,/g) + "";
		X3D = parseInt(X3D.replace(/\-|\(|px|\,/g,""));
		if((X3D - lctnNum * ow)>(ow/2)){//正方向
			lctnNum ++;
			if(lctnNum == len){
				lctnNum = len - 1;
			}
			if(dVal > 0){
				lctnNum = 0;
			}
			translate3d(- lctnNum * ow);
			
		}else if((X3D - lctnNum * ow)<(-ow/2)){//负方向
			lctnNum -- ;
			if(lctnNum == -1){
				lctnNum = 0;
			}
			translate3d(- lctnNum * ow);
		}else if(Math.abs(X3D - lctnNum * ow)<(ow/2)){
			translate3d(- lctnNum * ow);
		}
		setDotClass(lctnNum);
	}
	function transition(){
		imgviewGroup.style.transitionProperty = 'transform';
		imgviewGroup.style.msTransitionProperty = 'transform';
		imgviewGroup.style.mozTransitionProperty = 'transform';
		imgviewGroup.style.webkitTransitionProperty = 'transform';
		
		imgviewGroup.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		imgviewGroup.style.msTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		imgviewGroup.style.mozTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		imgviewGroup.style.webkitTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
	}
	function duration(t){
		//动画过渡的时间
		imgviewGroup.style.transitionDuration = t + 'ms';
		imgviewGroup.style.msTransitionDuration = t + 'ms';
		imgviewGroup.style.mozTransitionDuration = t + 'ms';
		imgviewGroup.style.webkitTransitionDuration = t + 'ms';
	}
	function translate3d(n){
		//滑动的距离(显示图片)
		imgviewGroup.style.transform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		imgviewGroup.style.msTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		imgviewGroup.style.mozTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		imgviewGroup.style.webkitTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
	}
	function setDotClass(n){
		if(!obj.isNumShow){
			clearDotClass();
			iDots[n].className = 'active-imgview-spot';
		}else{
			navSpotNum.getElementsByTagName('span')[0].innerHTML = (n+1) + '/' + len;
		}
	}
	function clearDotClass(){
		if(!obj.isNumShow){
			for(var i = 0 ; i < iDots.length ; i ++){
				iDots[i].className = '';
			}
		}
	}
	imgviewGroup.ondragstart = function(){//禁止拖动
		return false;
	}
	imgviewGroup.ontouchmove = function(){//禁止拖动
		return false;
	}
}

function fitImgView(objImg) {
	var liWidth = objImg.parentNode.offsetWidth; //容器li的宽
	var liHeight = objImg.parentNode.offsetHeight; //容器li的高			
	
	var imge = new Image();
	imge.src = objImg.src;
	var imgWidth = imge.width; //图片的宽
	var imgHeight = imge.height; //图片的高
	if(imgWidth == 0 || imgHeight == 0){
		return;
	}
	if(imgWidth < liWidth && imgHeight < liHeight){
		objImg.style.marginTop = (liHeight - imgHeight)/2 + 'px';
	}else if(imgWidth >= liWidth && imgHeight < liHeight){
		objImg.style.width = liWidth + 'px';
		objImg.style.marginTop = (liHeight - imgHeight * liWidth / imgWidth)/2 + 'px';
	}else if(imgWidth < liWidth && imgHeight >= liHeight){
		objImg.style.width = 'auto';
		objImg.style.height = liHeight + 'px';
	}else if(imgWidth > liWidth && imgHeight > liHeight){
		var liRatio = (liWidth / liHeight);
		var imgRatio = (imgWidth / imgHeight);
		if(liRatio >= imgRatio) {
			objImg.style.width = 'auto';
			objImg.style.height = liHeight + 'px';
		} else{
			objImg.style.width = liWidth + 'px';
			objImg.style.marginTop = (liHeight - imgHeight * liWidth / imgWidth)/2 + 'px';
		}
	}
}
