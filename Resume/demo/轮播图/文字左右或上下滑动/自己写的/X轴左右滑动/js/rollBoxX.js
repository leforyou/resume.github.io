function forEachRollBoxX(rollBox){
	rollBox.style.width = 'auto';
	var ow = rollBox.offsetWidth;
	var owX = ow - rollBox.parentNode.offsetWidth;
	rollBox.style.width = ow + 'px';
	
	transitionTime(0);
	transform3dX(0);
	
	var startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0, lctnX = 0,ratioXY=0,speedX=0, timeX = 800;
	 
	rollBox.parentNode.addEventListener('touchstart',start,false);
	rollBox.parentNode.addEventListener('mousedown',start,false);
	
	document.addEventListener('touchend',end,false);
	document.addEventListener('mouseup',end,false);
	
	function start(e){
		var e = e || window.event;
		startX = e.pageX || e.targetTouches[0].pageX;//记录X轴开始的位置
		startY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		startTime = new Date();//记录开始时间
		lctnX = getX3d();//获取translate3d的X水平轴的位置
		
		transitionTime(0);
		transform3dX(lctnX);
		document.addEventListener('touchmove',move,false);
		document.addEventListener('mousemove',move,false);
		document.ontouchmove = null;
	}
	function end(e){
		var e = e || window.event;
		endX = e.pageX || e.changedTouches[0].pageX;//记录X轴结束的位置
		endTime = new Date() - startTime;//记录结束时间---时间差
		
		ratioXY = Math.abs(endX-startX)/Math.abs(endY-startY);
		if(ratioXY>3){
			speedX = (endX-startX)/endTime;//滑动速度:滑动距离除以滑动时间
			
			lctnX = getX3d();//获取translate3d的X水平轴的位置
			
			speedX = Math.min(speedX/1.8,1);//优化滑动距离1---值不能大于1，因为反正弦、exp的指数的值不能大于1
			var exp = Math.exp(Math.abs(speedX));//优化滑动距离2---指数
			speedX = Math.asin(speedX);//优化滑动距离3---反正弦
			
			if(endTime > 200){//滑动时间大于200，将不触发css3动画
				var val = lctnX;
			}else{
				var val = lctnX + speedX*exp*460;//滑动的距离与速度 约等于 高中数学的指数函数
			}
			
			if(val>0){
				val = 0;
			}else if(val<-owX){
				val = -owX;
			}
			transitionTime(timeX);
			transform3dX(val);
			
			
		}
		document.removeEventListener('touchmove',move,false);
		document.removeEventListener('mousemove',move,false);
		document.removeEventListener('touchmove',noUpDownMove,false);//恢复浏览器上下滑动
		startX=0 ,endX=0, startY=0, endY=0, startTime=0, endTime=0, lctnX = 0,ratioXY=0,speedX=0;
	}
	function move(e){
		//指定的区域，随鼠标或手指滑动而滑动
		var e = e || window.event;
		endX = e.pageX || e.targetTouches[0].pageX;//记录X轴结束的位置
		endY = e.clientY || e.targetTouches[0].clientY;//记录Y轴开始的位置
		ratioXY = Math.abs(endX-startX)/Math.abs(endY-startY);
		
		if(ratioXY>3){
			transitionTime(0);
			var x3d = lctnX + endX - startX;
			if(x3d > 28){
				x3d = 28;
			}else if(x3d < -(owX + 28)){
				x3d = -(owX + 28);
			}
			transform3dX(x3d);
			document.addEventListener('touchmove',noUpDownMove,false);//禁止浏览器上下滑动
		}
	}
	function noUpDownMove(e){
		var e = e || window.event;
		//禁止网页上下滑动
		e.preventDefault();
	}
	function transitionTime(n){
		//定义过渡效果花费的时间
		rollBox.style.transitionDuration = n + 'ms';
		rollBox.style.webkitTransitionDuration = n + 'ms';
		rollBox.style.mozTransitionDuration = n + 'ms';
		rollBox.style.msTransitionDuration = n + 'ms';
	}
	
	function transform3dX(n){
		//Y轴方向的距离
		var a = 'translate3d(',b = 'px,0px,0px) translateZ(0px)';
		rollBox.style.transform = a + n + b;
		rollBox.style.msTransform = a + n + b;
		rollBox.style.mozTransform = a + n + b;
		rollBox.style.webkitTransform = a + n + b;
	}
	
	function getX3d(){
		return parseInt((rollBox.style.transform.match(/\([\S]+,/g) + "").replace(/\(|px|\,/g,""));
	}
	document.ondragstart = function(){
		//禁止PC端图片拖动
		return false;
	}
}
