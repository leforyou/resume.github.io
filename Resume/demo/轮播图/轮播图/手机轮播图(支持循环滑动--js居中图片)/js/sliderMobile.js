/*制作轮播图要求：
 *1.padding在css设置宽高比，防止js没加载渲染页面时，图片区域没固定
 *2.js设置滑动区域上下滑动时，左右不滑动
 *3.当只有一张图片，就不允许左右滑动 
 *4.允许设置是数字或点
*/
function sliderMobile(obj){
	obj.time = obj.time || 1500;
	obj.time = Math.max(obj.time,1500);
	obj.ratio = obj.ratio || '1:0.58';//宽高比
	obj.ratio = parseFloat(obj.ratio.split(":")[0])/parseFloat(obj.ratio.split(":")[1]);
	obj.isNumShow = obj.isNumShow || false;
	
	var idTag = document.querySelector(obj.id);
	var GroupDOM = idTag.getElementsByClassName('slider-group')[0];
	var ItemDOM = GroupDOM.getElementsByClassName('slider-item');
	
	var htm1 = ItemDOM[0].cloneNode(true);//克隆
	var htm2 = ItemDOM[ItemDOM.length-1].cloneNode(true);
	GroupDOM.appendChild(htm1);
	GroupDOM.insertBefore(htm2,GroupDOM.childNodes[0]);
	idTag.style.height = oh + 'px';
	
	
	var ow = idTag.offsetWidth;
	var oh = ow / obj.ratio;
	var aDOM = idTag.getElementsByTagName('a');
	var imgDom = idTag.getElementsByTagName('img');
	
	for(var i = 0; i < aDOM.length; i++) {
		aDOM[i].style.width = ow + 'px';
		aDOM[i].style.height = oh + 'px';
		imgDom[i].setAttribute('onload','fitImgSliderMobile(this)');
		fitImgSliderMobile(imgDom[i]);
	}
	//导航点
	var sliderDots = document.createElement('div');
	if(!obj.isNumShow){
		sliderDots.className = 'silder-dots';
		var iStr = '';
		for(var i = 0 ; i < aDOM.length-2; i ++){
			iStr += '<i></i>';
		}
		sliderDots.innerHTML = iStr;
		var iDots = sliderDots.getElementsByTagName('i');
	}else{
		sliderDots.className = 'silder-nums';
		var iStr = '<span>1/'+ (ItemDOM.length-2) +'</span>';
		sliderDots.innerHTML = iStr;
	}
	idTag.appendChild(sliderDots);
	transform3dX(- ow);
	setDotClass(0);
	
	var num = 1,timeToLeft = 350, setIval;
	var seTimeGroup = setTimeout(function(){//webkit
		var a = 'transform',b = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		GroupDOM.style.transitionProperty = a;
		GroupDOM.style.transitionTimingFunction = b;
		
		GroupDOM.style.webkitTransitionProperty = a;
		GroupDOM.style.webkitTransitionTimingFunction = b;
		
		transitionTime(2);
		clearTimeout(seTimeGroup);
	},1);
	if(aDOM.length==3){
		return;//当只有一张图片，就不允许左右滑动,不执行下面代码
	}
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
		},obj.time);
	}
	Ival();
	
	
	var startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0,  dVal = 0,swipeX,swipeY ;
	idTag.addEventListener('touchstart', start, false);
	idTag.addEventListener('mousedown', start, false);
	
	document.addEventListener('touchend',end, false);
	document.addEventListener('mouseup',end, false);
	
	function start() {
		clearInterval(setIval);//清除定时器
		var e = event || window.event;
		startX = e.screenX || e.targetTouches[0].screenX;
		startY = e.screenY || e.targetTouches[0].screenY;
		startTime = new Date();
		swipeX = true;
     	swipeY = true ;
		document.addEventListener('touchmove',move, false);//添加侦听器
		document.addEventListener('mousemove',move, false);//添加侦听器
		document.ontouchmove = function() { //图片区域禁止浏览左右滑动
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
	
	function move(event){
		var e = event || window.event;
		endX = e.screenX || e.targetTouches[0].screenX;
		endY = e.screenY || e.targetTouches[0].screenY;
		dVal = endX - startX;//两点间的距离，也可以判断正负。
		
		if(swipeX && Math.abs(endX-startX)-Math.abs(endY-startY)>0) {//左右滑动
	        swipeY = false ;
	        event.stopPropagation();//阻止冒泡
	        event.preventDefault();//阻止浏览器默认事件
	        var x3d = Math.min((num * ow - dVal),(ow * (ItemDOM.length-1)));
			transitionTime(0);
			transform3dX(-x3d);
	          
	    }else if(swipeY && Math.abs(endX-startX)-Math.abs(endY-startY)<0){  //上下滑动
	        swipeX = false ;//上下滑动，使用浏览器默认的上下滑动
	        document.ontouchmove = null; //图片区域恢复浏览左右滑动
	    }
	}
	function end(e) {
		clearInterval(setIval);//复活定时器前，必有清除之前存在的定时器，否则定时器会叠加，从而引发bug(num数字大于ItemDOM.length - 1)
		Ival();//复活定时器
		document.removeEventListener('touchmove',move, false);//删除侦听器
		document.removeEventListener('mousemove',move, false);//删除侦听器
		document.ontouchmove = null; //图片区域恢复浏览左右滑动
		endTime = new Date() - startTime;
		var e = event || window.event;
		endX = e.screenX || e.changedTouches[0].screenX;
		endY = e.screenY || e.changedTouches[0].screenY;
		if(30<endTime && endTime < 280 && swipeX){
			timeD();
		}else if(endTime >= 280){
			endUp();
		}
		startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0, dVal = 0;
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
	idTag.ondragstart = function(){//禁止拖动
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
		if(GroupDOM.style.transform){
			return parseInt((GroupDOM.style.transform.match(/\([\S]+,/g) + "").replace(/\-|\(|px|\,/g,""));
			//return parseInt(GroupDOM.style.transform.split(',')[0].split('(')[1].replace(/[^0-9]/g,""));
		}else{
			return parseInt((GroupDOM.style.webkitTransform.match(/\([\S]+,/g) + "").replace(/\-|\(|px|\,/g,""));
			//return parseInt(GroupDOM.style.webkitTransform.split(',')[0].split('(')[1].replace(/[^0-9]/g,""));
		}
	}
	function setDotClass(n){
		if(!obj.isNumShow){
			iDots[n].className = 'active-dots';
		}else{
			sliderDots.getElementsByTagName('span')[0].innerHTML = (n+1) + '/' + (ItemDOM.length-2);
		}
	}
	function clearDotsClass(){
		if(!obj.isNumShow){
			for(var i = 0 ; i < iDots.length ; i ++){
				iDots[i].className = '';
			}
		}
	}
	window.addEventListener('resize', function() {
		//窗口改变事件
		if(ow != idTag.offsetWidth){
			num = 1;
			ow = idTag.offsetWidth;
			oh = ow / obj.ratio;
			idTag.style.height = oh + 'px';
			for(var i = 0; i < aDOM.length; i++) {
				aDOM[i].style.width = ow + 'px';
				aDOM[i].style.height = oh + 'px';
				fitImgSliderMobile(imgDom[i]);
			}
			clearDotsClass();
			setDotClass(0);
			idTag.style.height = oh + 'px';
			transform3dX(- ow);
		}
	}, false);
}



function fitImgSliderMobile(objImg) {
	var liWidth = objImg.parentNode.offsetWidth; //容器li的宽
	var liHeight = objImg.parentNode.offsetHeight; //容器li的高			
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










