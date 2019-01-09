function slider(obj) {
	var sliderDOM = document.querySelector(obj.id);
	var GroupDOM = sliderDOM.getElementsByTagName('div')[0];
	var ItemDOM = GroupDOM.getElementsByClassName('slider-item');
	var htm1 = ItemDOM[0].cloneNode(true);//克隆
	var htm2 = ItemDOM[ItemDOM.length-1].cloneNode(true);
	GroupDOM.appendChild(htm1);
	GroupDOM.insertBefore(htm2,GroupDOM.childNodes[0]);
	var aDOM = sliderDOM.getElementsByTagName('a');
	var imgDom = sliderDOM.getElementsByTagName('img');
	var ow = sliderDOM.offsetWidth;
	var oh = ow * 0.58;
	sliderDOM.style.height = oh + 'px';
	transform3dX(- ow);
	
	for(var i = 0; i < aDOM.length; i++) {
		aDOM[i].style.width = ow + 'px';
		aDOM[i].style.height = oh + 'px';
		imgDom[i].setAttribute('onload','fitImage(this.parentNode, this)');
		fitImage(imgDom[i].parentNode, imgDom[i]);
	}
	//导航点
	var sliderDots = document.createElement('div');
	sliderDots.className = 'silder-dots';
	var iStr = '';
	for(var i = 0 ; i < aDOM.length-2; i ++){
		iStr += '<i></i>';
	}
	sliderDots.innerHTML = iStr;
	sliderDOM.appendChild(sliderDots);
	var iDots = sliderDots.getElementsByTagName('i');
	setDotClass(0);
	//定时器
	var num = 1,timeToLeft = 500, setIval = obj.id.replace(/\#/g,"Ival");
	var seTimeGroup = setTimeout(function(){//webkit
		var a = 'transform',b = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		GroupDOM.style.transitionProperty = a;
		GroupDOM.style.transitionTimingFunction = b;
		
		GroupDOM.style.webkitTransitionProperty = a;
		GroupDOM.style.webkitTransitionTimingFunction = b;
		
		transitionTime(2);
		clearTimeout(seTimeGroup);
	},1);
	function Ival(){
		setIval = setInterval(function(){
			num ++;
			transitionTime(2);
			transform3dX(- num * ow);
			clearDotsClass();
			if(num < (ItemDOM.length - 1)){
				setDotClass(num-1);
			}
			if(num == (ItemDOM.length - 1)){
				setDotClass(0);
				var setTime = setTimeout(function(){
					num = 1;
					transitionTime(0);
					transform3dX(- ow);
					clearTimeout(setTime);
				},(2 * timeToLeft + 1));
			}
		},Math.max(obj.time,1200));
	}
	Ival();

	window.addEventListener('resize', function() {
		//窗口改变事件
		if(ow != sliderDOM.offsetWidth){
			num = 1;
			ow = sliderDOM.offsetWidth;
			oh = ow * 0.58;
			sliderDOM.style.height = oh + 'px';
			for(var i = 0; i < aDOM.length; i++) {
				aDOM[i].style.width = ow + 'px';
				aDOM[i].style.height = oh + 'px';
				fitImage(imgDom[i].parentNode, imgDom[i]);
			}
			clearDotsClass();
			setDotClass(0);
			sliderDOM.style.height = oh + 'px';
			transform3dX(- ow);
		}
	}, false);
	var startX = 0,startTime,endTime,dVal = 0;
	sliderDOM.addEventListener('touchstart', start, false);
	sliderDOM.addEventListener('mousedown', start, false);
	function start() {
		clearInterval(setIval);//清除定时器
		var e = event || window.event;
		startX = e.screenX || e.targetTouches[0].screenX;
		startTime = new Date();
		sliderDOM.addEventListener('touchmove',move, false);//添加侦听器
		document.ontouchmove = function() { //图片区域禁止浏览左右滑动
			return false;
		}
		sliderDOM.addEventListener('mousemove',move, false);//添加侦听器
		document.onmousemove = function() { //图片区域禁止浏览左右滑动
			return false;
		}
		clearTimeout(setTimeD);//必须清除这个定时器才能执行下面的判断条件，否则引发bug
		var x3D1 = getX3d();//声明x3D1和x3D2两个变量的原因，使用gulp压缩后，判断条件会简写成一个条件另一个是其它所有，这样另一个条件的准确度就失效了,将出现一个bug
		if(x3D1 == ow * (ItemDOM.length - 1)){//判断条件不能用num(num == (ItemDOM.length - 1))，不知为何用它会导致条件的内容不执行
			setDotClass(0);
			num = 1;
			transitionTime(0);
			transform3dX(-ow);
		}
		var x3D2 = getX3d();
		if(x3D2 == 0){
			num = ItemDOM.length - 2;
			clearDotsClass();
			setDotClass(num-1);
			transitionTime(0);
			transform3dX(- num * ow);
		}
	}
	sliderDOM.addEventListener('touchend',end, false);
	sliderDOM.addEventListener('mouseup',end, false);
	function end() {
		clearInterval(setIval);//复活定时器前，必有清除之前存在的定时器，否则定时器会叠加，从而引发bug(num数字大于ItemDOM.length - 1)
		Ival();//复活定时器
		sliderDOM.removeEventListener('touchmove',move, false);//删除侦听器
		document.ontouchmove = null; //图片区域恢复浏览左右滑动
		sliderDOM.removeEventListener('mousemove',move, false);//删除侦听器
		document.onmousemove = null; //图片区域恢复浏览左右滑动
		endTime = new Date() - startTime;
		if(30<endTime && endTime < 280){
			timeD();
		}else if(endTime >= 280){
			endUp();
		}
		dVal = 0;
	}
	
	var setTimeD;
	function timeD(){
		if(dVal<0 && dVal != 0){
			num ++;
			transitionTime(1);
			transform3dX(-num * ow);
			clearDotsClass();
			if(num < (ItemDOM.length - 1)){
				setDotClass(num-1);
			}
			if(num == (ItemDOM.length - 1)){
				setDotClass(0);
				num = 1;
				setTimeD = setTimeout(function(){
					transitionTime(0);
					transform3dX(-num * ow);
					clearTimeout(setTimeD);
				},timeToLeft + 1);
			}
		}else if(dVal>0 && dVal != 0){
			num -- ;
			transitionTime(1);
			transform3dX(-num * ow);
			clearDotsClass();
			if(0<num && num< (ItemDOM.length - 1)){
				setDotClass(num-1);
			}
			if(num == (ItemDOM.length - 1)){
				setDotClass(0);
			}
			if(num == 0){
				num = ItemDOM.length - 2;
				clearDotsClass();
				setDotClass(num-1);
				setTimeD = setTimeout(function(){
					transitionTime(0);
					transform3dX(-num * ow);
					clearTimeout(setTimeD);
				},(timeToLeft + 1));
			}
		}
	}
	function move(){
		var e = event || window.event;
		dVal =( e.screenX || e.targetTouches[0].screenX) - startX;//两点间的距离，也可以判断正负。
		var x3d = Math.min((num * ow - dVal),(ow * (ItemDOM.length-1)));
		transitionTime(0);
		transform3dX(-x3d);
	}
	function endUp(){
		transitionTime(1);
		var x3D = getX3d();
		if((x3D - num * ow)>(ow/2)){//正方向
			num ++;
			transform3dX(- num * ow);
			clearDotsClass();
			if(num < (ItemDOM.length - 1)){
				setDotClass(num-1);
			}
			if(num == (ItemDOM.length - 1)){
				setDotClass(0);
			}
			//console.log(num)
		}else if((x3D - num * ow)<(-ow/2)){//负方向
			num -- ;
			
			transform3dX(- num * ow);
			clearDotsClass();
			
			if(0<num && num< (ItemDOM.length - 1)){
				setDotClass(num-1);
			}
			if(num == (ItemDOM.length - 1)){
				setDotClass(0);
			}
			if(num == 0){
				num = ItemDOM.length - 2;
				clearDotsClass();
				setDotClass(num-1);
				var setTime = setTimeout(function(){
					transitionTime(0);
					transform3dX(- num * ow);
					clearTimeout(setTime);
				},(timeToLeft + 1));
			}
		}else if(Math.abs(x3D - num * ow)<(ow/2)){
			transitionTime(1);
			transform3dX(- num * ow);
		}
		if(num == (ItemDOM.length - 1)){
			setDotClass(0);
			var setTime = setTimeout(function(){
				num = 1;
				transitionTime(0);
				transform3dX(-ow);
				clearTimeout(setTime);
			},(timeToLeft + 1));
		}else if(num == 0){
			setDotClass(ItemDOM.length - 2);
			var setTime = setTimeout(function(){
				num = ItemDOM.length - 2;
				transitionTime(0);
				transform3dX(-num*ow);
				clearTimeout(setTime);
			},(timeToLeft + 1));
		}
	}
	sliderDOM.ondragstart = function(){
		return false;
	}
	
	function transitionTime(n){
		GroupDOM.style.transitionDuration = n*timeToLeft + 'ms';
		GroupDOM.style.webkitTransitionDuration = n*timeToLeft + 'ms';
	}
	
	function transform3dX(n){
		var a = 'translate3d(',b = 'px, 0px, 0px) translateZ(0px)';
		GroupDOM.style.transform = a + n + b;
		GroupDOM.style.webkitTransform = a + n + b;
	}
	function getX3d(){
		return parseInt((GroupDOM.style.transform.match(/\([\S]+,/g) + "").replace(/\-|\(|px|\,/g,""));
	}
	function setDotClass(n){
		iDots[n].className = 'active-dots';
	}
	function clearDotsClass(){
		for(var i = 0 ; i < iDots.length ; i ++){
			iDots[i].className = '';
		}
	}
}


function fitImage(objDiv, objImg) {
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









