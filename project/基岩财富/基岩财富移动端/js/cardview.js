function cardViewFn(obj){
	var cardViewer = document.querySelector(obj.el);
	var group = cardViewer.getElementsByClassName('card-group')[0];
	var item = cardViewer.getElementsByClassName('card-item');
	var width = cardViewer.clientWidth;
	
	obj.width = obj.width.indexOf('%') == -1 ? obj.width : width*parseInt(obj.width)/100+'px';
	obj.width = parseInt(obj.width.replace('px'));
	for (var i = 0 ; i < item.length ; i ++) {
		item[i].index = i;
		item[i].style.width = obj.width + 'px';
		//item[i].style.transform = 'scale('+ obj.scale +')';
	}
	
	
	
	var len = item.length;
	var lctnNum = parseInt(item.length/2);
	var half = (width - obj.width)/2;
	var num = - obj.width*lctnNum + half;
	translate3d(num);
	
	
	//导航点与导航数字
	var navSpotNum = document.createElement('div');
	if(obj.isNumShow == true){
		navSpotNum.className = 'card-num';
		navSpotNum.innerHTML = '<span></span>';
	}else{
		navSpotNum.className = 'card-spot';
		var strSpot = '';
		for (var i = 0 ; i < len ; i ++) {
			strSpot += '<i></i>';
		}
		navSpotNum.innerHTML = strSpot;
		var iDots = navSpotNum.getElementsByTagName('i');
	}
	cardViewer.appendChild(navSpotNum);
	setDotClass(lctnNum);
	
	
	//1111111111111111111111111111111111111111111111111111111
	var startX = 0 , endX = 0 , startY=0, endY=0,startTime,endTime,dVal = 0 , timeTran = 500,swipeX,swipeY ;
	cardViewer.addEventListener('touchstart', start, false);
	cardViewer.addEventListener('mousedown', start, false);
	cardViewer.addEventListener('touchend', end, false);
	cardViewer.addEventListener('mouseup', end, false);
	
	function start(event) {
		var e = event || window.event;
		startX = e.screenX || e.targetTouches[0].screenX;
		startY = e.screenY || e.targetTouches[0].screenY;
		swipeX = true;
     	swipeY = true ;
		startTime = new Date();
		cardViewer.addEventListener('touchmove',move, false);//添加侦听器
		cardViewer.addEventListener('mousemove',move, false);//添加侦听器
		/*document.ontouchmove = function() { //图片区域禁止浏览左右滑动
			return false;
		}*/
		
	}
	function end(event){
		cardViewer.removeEventListener('touchmove',move, false);//删除侦听器
		cardViewer.removeEventListener('mousemove',move, false);//删除侦听器
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
		var x3d = obj.width*lctnNum - half - dVal;
		x3d = parseInt(x3d);
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
			translate3d(- obj.width*lctnNum + half);
			
			
		}else if(dVal>0 && dVal != 0){
			lctnNum -- ;
			if(lctnNum == -1){//最后一张(临界值)
				lctnNum = 0;
			}
			duration(timeTran);
			translate3d(- obj.width*lctnNum + half);
			
		}
		setDotClass(lctnNum);
	}
	
	
	function endUp(){
		transition();
		duration(timeTran);
		
		var X3D = group.style.transform.match(/\([\S]+,/g) + "";
		X3D = parseInt(X3D.replace(/\-|\(|px|\,/g,""));
		if((X3D - (obj.width*lctnNum - half))>(obj.width/2)){//正方向
			lctnNum ++;
			if(lctnNum == len){
				lctnNum = len - 1;
			}
			if(dVal > 0){
				lctnNum = 0;
			}
			translate3d(- obj.width*lctnNum + half);
			
		}else if((X3D - (obj.width*lctnNum - half))<(-obj.width/2)){//负方向
			lctnNum -- ;
			if(lctnNum == -1){
				lctnNum = 0;
			}
			translate3d(- obj.width*lctnNum + half);
		}else if(Math.abs(X3D - (obj.width*lctnNum - half))<(obj.width/2)){
			translate3d(- obj.width*lctnNum + half);
		}
		setDotClass(lctnNum);
	}
	//1111111111111111111111111111111111111111111111111111111
	function translate3d(n){
		//滑动的距离(显示图片)
		group.style.transform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		group.style.msTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		group.style.mozTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
		group.style.webkitTransform = 'translate3d(' + n + 'px, 0px, 0px) translateZ(0px)';
	}
	function transition(){
		group.style.transitionProperty = 'transform';
		group.style.msTransitionProperty = 'transform';
		group.style.mozTransitionProperty = 'transform';
		group.style.webkitTransitionProperty = 'transform';
		
		group.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		group.style.msTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		group.style.mozTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
		group.style.webkitTransitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
	}
	function duration(t){
		//动画过渡的时间
		group.style.transitionDuration = t + 'ms';
		group.style.msTransitionDuration = t + 'ms';
		group.style.mozTransitionDuration = t + 'ms';
		group.style.webkitTransitionDuration = t + 'ms';
	}
	
	
	function setDotClass(n){
		clearDotClass();
		if(!obj.isNumShow){
			iDots[n].classList.add('active-card-spot');
		}else{
			navSpotNum.getElementsByTagName('span')[0].innerHTML = (n+1) + '/' + len;
		}
		item[n].classList.add('card-item-active');
	}
	function clearDotClass(){
		if(!obj.isNumShow){
			for(var i = 0 ; i < iDots.length ; i ++){
				iDots[i].classList.remove('active-card-spot');
			}
		}
		for(var i = 0 ; i < item.length ; i ++){
			item[i].classList.remove('card-item-active');
		}
	}
	
}








window.addEventListener('DOMContentLoaded',function(){
	cardViewFn({
		el:"#cardViewer",
		width:'60%',//百分比或像素
		isNumShow:true
	});
});