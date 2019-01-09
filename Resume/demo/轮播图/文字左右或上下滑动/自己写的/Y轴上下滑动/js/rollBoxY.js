function forEachRollBoxY(rollBox){
	var ph = rollBox.parentNode.offsetHeight;
	var oh = rollBox.offsetHeight;
	var owY = oh - ph;
	
	transitionTime(0);
	transform3dY(0);
	
	var startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0, lctnY = 0,ratioYX=0,speedY=0, timeY = 800;
	 
	rollBox.parentNode.addEventListener('touchstart',start,false);
	rollBox.parentNode.addEventListener('mousedown',start,false);
	
	document.addEventListener('touchend',end,false);
	document.addEventListener('mouseup',end,false);
	
	function start(e){
		var e = e || window.event;
		startX = e.pageX || e.targetTouches[0].pageX;//记录X轴开始的位置
		startY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		startTime = new Date();//记录开始时间
		lctnY = getY3d();//获取translate3d的Y水平轴的位置
		
		transitionTime(0);
		transform3dY(lctnY);
		document.addEventListener('touchmove',move,false);
		document.addEventListener('mousemove',move,false);
		document.ontouchmove = null;
	}
	function end(e){
		var e = e || window.event;
		endY = e.pageY || e.changedTouches[0].pageY;//记录Y轴结束的位置
		endTime = new Date() - startTime;//记录结束时间---时间差
		ratioYX = Math.abs(endY-startY)/Math.abs(endX-startX);
		if(ratioYX>3){
			speedY = (endY-startY)/endTime;//滑动速度:滑动距离除以滑动时间
			
			lctnY = getY3d();//获取translate3d的Y水平轴的位置
			
			speedY = Math.min(speedY/1.8,1);//优化滑动距离1---值不能大于1，因为反正弦、exp的指数的值不能大于1
			var exp = Math.exp(Math.abs(speedY));//优化滑动距离2---指数
			speedY = Math.asin(speedY);//优化滑动距离3---反正弦
			
			if(endTime > 200){//滑动时间大于200，将不触发css3动画
				var val = lctnY;
			}else{
				var val = lctnY + speedY*exp*460;//滑动的距离与速度 约等于 高中数学的指数函数
			}
			
			if(val>0){
				val = 0;
			}else if(val<-owY){
				val = -owY;
			}
			transitionTime(timeY);
			transform3dY(val);
		}
		document.removeEventListener('touchmove',move,false);
		document.removeEventListener('mousemove',move,false);
		startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0, lctnY = 0,ratioYX=0,speedY=0;
	}
	function move(e){
		//指定的区域，随鼠标或手指滑动而滑动
		var e = e || window.event;
		endX = e.pageX || e.targetTouches[0].pageX;//记录X轴结束的位置
		endY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		ratioYX = Math.abs(endY-startY)/Math.abs(endX-startX);
		
		if(ratioYX>3){
			transitionTime(0);
			var y3d = lctnY + endY - startY;
			if(y3d > 28){
				y3d = 28;
			}else if(y3d < -(owY + 28)){
				y3d = -(owY + 28);
			}
			transform3dY(y3d);
		}
	}
	document.addEventListener('touchmove', function(e) {
		//禁止网页上下滑动--微信
    	e.preventDefault();
	});
	document.addEventListener('touchstart', function(e) {
		//禁止网页上下滑动--微信
	    e.preventDefault();
	});
	function transitionTime(n){
		//定义过渡效果花费的时间
		rollBox.style.transitionDuration = n + 'ms';
		rollBox.style.webkitTransitionDuration = n + 'ms';
		rollBox.style.mozTransitionDuration = n + 'ms';
		rollBox.style.msTransitionDuration = n + 'ms';
	}
	
	function transform3dY(n){
		//Y轴方向的距离
		var a = 'translate3d(0px,',b = 'px,0px) translateZ(0px)';
		rollBox.style.transform = a + n + b;
		rollBox.style.msTransform = a + n + b;
		rollBox.style.mozTransform = a + n + b;
		rollBox.style.webkitTransform = a + n + b;
	}
	
	function getY3d(){
		return parseInt(rollBox.style.transform.split(",")[1].replace(/(px)/g,""));
	}
	document.ondragstart = function(){
		//禁止PC端图片拖动
		return false;
	}
}
