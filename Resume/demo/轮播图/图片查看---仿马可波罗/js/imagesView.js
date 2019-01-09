function ImageViewer(obj){
	//return;
	var imgArray = obj.images;//图片数组
	var lctnNum = obj.lctnNum || 0;
	var showNum = obj.showNum || false;
	var len = imgArray.length;
	var imgViewer = document.querySelector(obj.id);
	
	//图片的四列布局
	var viewGroup = document.createElement('ul');
	viewGroup.className = 'imgview-group';
	var itemStr = '' , checkItemStr = '';
	for (var i = 0 ; i < len ; i++) {
		itemStr += '<li class="imgview-item"><a href="javascript:void(0)"><img src="'+ imgArray[i].img +'" onload="fitImgViewWrap(this.parentNode,this)"/></a></li>';
		checkItemStr += '<li class="check-imgs-item"><div class="check-imgs-title">' + (imgArray[i].title || '') + '</div><a href="javascript:void(0)"><img src="' + imgArray[i].img + '" onload="fitImgCheck(this.parentNode,this)"/></a></li>';
	}
	viewGroup.innerHTML = itemStr;
	imgViewer.appendChild(viewGroup);
	var itemImg = viewGroup.getElementsByTagName('img');
	for (var i = 0 ; i < itemImg.length ; i++) {
		fitImgViewWrap(itemImg[i].parentNode,itemImg[i]);
	}
	
	//图片查看
	var wrapCheck = document.createElement('div');
	wrapCheck.className = 'wrap-check-imgs';
	var leftBtn = document.createElement('i');
	var rightBtn = document.createElement('i');
	var closeBtn = document.createElement('i');
	var wrapDot = document.createElement('div');
	var viewNum = document.createElement('div');
	var checkImgs = document.createElement('div');
	var checkImgsBox = document.createElement('ul');
	checkImgsBox.innerHTML = checkItemStr;
	
	leftBtn.className = 'left-btn';
	rightBtn.className = 'right-btn';
	closeBtn.className = 'close-btn';
	wrapDot.className = 'view-img-dot';
	viewNum.className = 'view-num';
	checkImgs.className = 'check-imgs';
	checkImgsBox.className = 'check-imgs-box';
	var dotStr = '';
	for (var i = 0 ; i < len ; i ++) {
		dotStr += '<i></i>';
	}
	wrapDot.innerHTML = dotStr;
	viewNum.innerHTML = '<span></span>';
	checkImgs.appendChild(checkImgsBox);
	
	var dFrag = document.createDocumentFragment();
	dFrag.appendChild(leftBtn);
	dFrag.appendChild(rightBtn);
	dFrag.appendChild(closeBtn);
	dFrag.appendChild(wrapDot);
	dFrag.appendChild(viewNum);
	dFrag.appendChild(checkImgs);
	wrapCheck.appendChild(dFrag);
	imgViewer.appendChild(wrapCheck);//dom全部插入
	
	wrapDot.style.marginLeft = -(wrapDot.offsetWidth)/2 + 'px';
	setDotClass(lctnNum);
	
	//设置图片居中
	var ow = document.documentElement.clientWidth;
	var checkImgsA = checkImgsBox.getElementsByTagName('a');
	var checkImg = checkImgsBox.getElementsByTagName('img');
	for (var i = 0 ; i < checkImgsA.length ; i ++) {
		checkImgsA[i].parentNode.style.width = ow + 'px';
		fitImgCheck(checkImg[i].parentNode, checkImg[i]);
	}
	
	if(showNum == true){//是否显示导航数字，隐藏导航圆点
		wrapDot.style.display = 'none';
		viewNum.style.display = 'block';
	}
	var time = 500 , springBack = 80;
	transition();
	duration(0);
	translate3d(0);
	
	//四列图片的点击事件
	var itemLi = viewGroup.getElementsByTagName('li');
	for (var i = 0 ; i < itemLi.length ; i ++) {
		itemLi[i].index = i;
		itemLi[i].onclick = function(){
			lctnNum = this.index;
			duration(0);
			translate3d(-lctnNum*ow);
			
			wrapCheck.style.top = '0%';
		}
	}
	//红色关闭按钮
	closeBtn.onclick = function(){
		wrapCheck.style.top = '100%';
	}
	
	//上一张点击按钮
	leftBtn.onclick = function(){
		lctnNum --;
		duration(time);
		if(lctnNum<0){
			lctnNum = 0;
			translate3d(springBack);
			var setTime = setTimeout(function(){
				translate3d(0);
				clearTimeout(setTime);
			},(time/2));
		}else{
			translate3d(-lctnNum*ow);
		}
			
	}
	
	//下一张点击按钮
	rightBtn.onclick = function(){
		lctnNum ++;
		duration(time);
		if(lctnNum == len){
			lctnNum = len - 1;
			translate3d(-lctnNum*ow - springBack);
			var setTime = setTimeout(function(){
				translate3d(-lctnNum*ow);
				clearTimeout(setTime);
			},(time/2));
		}else{
			translate3d(-lctnNum*ow);
		}
	}
	//导航圆点的点击事件
	var IDot = wrapDot.getElementsByTagName('i');
	for (var i = 0 ; i < IDot.length ; i ++) {
		IDot[i].index = i;
		IDot[i].onclick = function(){
			lctnNum = this.index;
			duration(time);
			translate3d(-lctnNum*ow);
		}
	}
	
	//触屏或鼠标滑动
	var startX ,endX, startY, endY, startTime, endTime,ratioXY;
	checkImgs.addEventListener('touchstart', start, false);
	checkImgs.addEventListener('mousedown', start, false);
	document.addEventListener('touchend', end, false);
	document.addEventListener('mouseup', end, false);
	
	function start(e){
		var e = e || window.event;
		startX = e.pageX || e.targetTouches[0].pageX;//记录X轴开始的位置
		startY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		startTime = new Date();
		
		document.addEventListener('touchmove',move, false);//添加侦听器
		document.addEventListener('mousemove',move, false);//添加侦听器
		document.ontouchmove = function() { //图片区域禁止浏览左右滑动
			return false;
		}
		document.onmousemove = function() { //图片区域禁止浏览左右滑动
			return false;
		}
	}
	
	function end(e){
		
		var e = e || window.event;
		endX = e.pageX || e.changedTouches[0].pageX;//记录X轴结束的位置
		startY = e.clientY || e.changedTouches[0].clientY;//记录Y轴开始的位置
		endTime = new Date();
		ratioXY = Math.abs(endX-startX)/Math.abs(endY-startY);
		var dTime = endTime-startTime;
		
		if(ratioXY>3){
			if(dTime > 30 && dTime < 280){
				shortTime();
			}else if(dTime > 280 && dTime < 666888999){
				longTime();
			}
		}
		
		document.removeEventListener('touchmove',move, false);//添加侦听器
		document.removeEventListener('mousemove',move, false);//添加侦听器
		document.ontouchmove = null;
		document.onmousemove = null;
		
		startX = endX = startY = endY = startTime = endTime = ratioXY = 0;
	}
	
	function move(e){
		sate = false;
		var e = e || window.event;
		endX = e.pageX || e.targetTouches[0].pageX;//记录Y轴结束的位置
		endY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		ratioXY = Math.abs(endX-startX)/Math.abs(endY-startY);
		if(ratioXY>3){
			duration(0);
			var x3d = - (ow*lctnNum) + (endX - startX);
			translate3d(x3d);
		}
	}
	function shortTime(){
		var val = endX - startX;
		duration(time);
		if(val < -1){
			lctnNum ++;
			if(lctnNum == len){
				lctnNum = len - 1;
			}
			translate3d(-ow*lctnNum);
		}else if(val > 1){
			lctnNum --;
			if(lctnNum == -1){
				lctnNum = 0;
			}
			translate3d(-ow*lctnNum);
		}
	}
	function longTime(){
		var val = endX - startX;
		var dw = ow/2;//滑动是否超过一半
		duration(time);
		if(val>dw){
			lctnNum --;
			if(lctnNum == -1){
				lctnNum = 0;
			}
			translate3d(-ow*lctnNum);
		}else if(val < -dw){
			lctnNum ++;
			if(lctnNum == len){
				lctnNum = len - 1;
			}
			translate3d(-ow*lctnNum);
		}else if(Math.abs(val)<dw){
			translate3d(-ow*lctnNum);
		}
	}
	function transition(){
		checkImgsBox.style.transitionProperty = 'transform';
		checkImgsBox.style.msTransitionProperty = 'transform';
		checkImgsBox.style.mozTransitionProperty = 'transform';
		checkImgsBox.style.webkitTransitionProperty = 'transform';
		
		checkImgsBox.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		checkImgsBox.style.msTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		checkImgsBox.style.mozTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		checkImgsBox.style.webkitTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
	}
	function duration(t){
		//动画过渡的时间
		checkImgsBox.style.transitionDuration = t + 'ms';
		checkImgsBox.style.msTransitionDuration = t + 'ms';
		checkImgsBox.style.mozTransitionDuration = t + 'ms';
		checkImgsBox.style.webkitTransitionDuration = t + 'ms';
	}
	function translate3d(n){
		//滑动的距离(显示图片)
		checkImgsBox.style.transform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		checkImgsBox.style.msTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		checkImgsBox.style.mozTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		checkImgsBox.style.webkitTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		
		setDotClass(lctnNum);//设置导航圆点的样式
	}
	
	function setDotClass(n){
		var iDom = wrapDot.getElementsByTagName('i');
		for (var i = 0 ; i < iDom.length ; i ++) {
			iDom[i].className = iDom[i].className.replace(/(viewDotActive)/g,"").trim();
		}
		iDom[n].className = ' viewDotActive';
		viewNum.getElementsByTagName('span')[0].innerHTML = (lctnNum + 1) + '/' + len;
	}
	
	window.addEventListener('resize',function(){
		ow = document.documentElement.clientWidth;
		for (var i = 0 ; i < checkImg.length ; i ++) {
			checkImgsA[i].parentNode.style.width = ow + 'px';
			fitImgCheck(checkImg[i].parentNode, checkImg[i]);
		}
	},false);
	wrapCheck.ondragstart = function(){//禁止拖动
		return false;
	}
}

function fitImgCheck(objDiv, objImg) {
	var liWidth = objDiv.offsetWidth; //容器li的宽
	var liHeight = objDiv.offsetHeight; //容器li的高			
	
	var imge = new Image();
	imge.src = objImg.src;
	var imgWidth = imge.width;
	var imgHeight = imge.height;
	if(imgWidth == 0 || imgHeight == 0){
		return;
	}
	objImg.style.marginTop = '0px';
	if(imgWidth < liWidth && imgHeight < liHeight){
		objImg.style.width = 'auto';
		objImg.style.height = 'auto';
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

function fitImgViewWrap(objDiv, objImg) {
	var liWidth = objDiv.offsetWidth; //容器li的宽
	var liHeight = objDiv.offsetHeight; //容器li的高			
	var imgWidth = objImg.width; //图片的宽
	var imgHeight = objImg.height; //图片的高
	var imgScale = ''; //图片缩放倍数

	var liRatio = (liWidth / liHeight); //容器宽高比
	var imgRatio = (imgWidth / imgHeight); //图片宽高比

	if(liRatio >= imgRatio) {
		imgScale = liWidth / imgWidth;
	} else {
		imgScale = liHeight / imgHeight;
	}

	objImg.style.width = (imgWidth * imgScale) + 'px';
	objImg.style.height = (imgHeight * imgScale) + 'px';

	objImg.style.marginLeft = (liWidth - objImg.width) / 2 + 'px';
	objImg.style.marginTop = (liHeight - objImg.height) / 2 + 'px';
}
