function fullScreenScroll(obj) {
	var wrapFullPage = document.querySelector(obj.id); 
	var pageGroup = wrapFullPage.getElementsByClassName('page-group')[0];
	var pageItem = wrapFullPage.getElementsByClassName('page-item');
	var pageProgress = wrapFullPage.getElementsByClassName('page-progress')[0];
	
	//var bgColorArr = obj.bgColor;//颜色
	var ch = document.documentElement.clientHeight;//可视区域的高度
	var timeToDown = 398;//过渡效果花费的时间
	var isMoving = true;
	var total = pageItem.length;
	
	wrapFullPage.style.display = 'block';
	wrapFullPage.style.height = ch + 'px';
	
	//如果颜色数量少于列表项，就重复增加颜色
	/*if(pageItem.length > bgColorArr.length){
		var pLen = Math.ceil(pageItem.length/bgColorArr.length);
		for (var i = 0 ; i < pLen ; i ++) {
			bgColorArr = bgColorArr.concat(bgColorArr);
		}
	}*/
	//每个页面都设置高度
	for(var i = 0 ; i < pageItem.length ; i ++){
		//pageItem[i].style.background = bgColorArr[i];
		pageItem[i].style.height = ch + 'px';
	}
	//增加首页和尾页
	pageGroup.innerHTML = pageItem[pageItem.length-1].outerHTML + pageGroup.innerHTML + pageItem[0].outerHTML;
	transition();
	transitionTime(0);
	transform3dY(-ch);
	
	
	pageGroup.addEventListener('touchstart',start,false);
	pageGroup.addEventListener('mousedown',start,false);
	
	pageGroup.addEventListener('touchend',end,false);
	pageGroup.addEventListener('mouseup',end,false);
	
	var startX=0 ,endX=0, startY = 0 ,endY = 0 ,startTime = 0,endTime = 0 , lctnNum = 1 ,swipeX,swipeY ;
	setProgress();
	function start(e){
		if(isMoving){
			swipeX = true;
     		swipeY = true ;
     		
			var e = e || window.event;
			startX = e.screenX || e.targetTouches[0].screenX;
			startY = e.screenY || e.changedTouches[0].screenY;//记录Y轴开始的位置
			startTime = new Date();//记录开始时间
			pageGroup.addEventListener('touchmove',move,false);
			pageGroup.addEventListener('mousemove',move,false);
		}
	}
	function move(e){
		transitionTime(0);
		var e = e || window.event;
		endX = e.screenX || e.targetTouches[0].screenX;
		endY = e.screenY || e.changedTouches[0].screenY;//记录Y轴结束的位置
		if(swipeX && Math.abs(endX-startX)-Math.abs(endY-startY)>0) {//左右滑动
	        swipeY = false ;
	        
	          
	    }else if(swipeY && Math.abs(endX-startX)-Math.abs(endY-startY)<0){  //上下滑动
	        swipeX = false ;//上下滑动，使用浏览器默认的上下滑动
	        event.stopPropagation();//阻止冒泡
	        event.preventDefault();//阻止浏览器默认事件
	        transform3dY(-(lctnNum * ch) + (endY - startY));
	    }
	    
		
	}
	function end(e){
		if(isMoving){
			var e = e || window.event;
			endY = e.screenY || e.changedTouches[0].screenY;//记录Y轴结束的位置
			endTime = new Date();//记录结束时间
			transitionTime(timeToDown);
				
			if((endTime - startTime)> 30 && (endTime - startTime) < 280 && swipeY){
				shortTimeSlide();
			}else if((endTime - startTime) > 280 && swipeY){
				longTimeSlide();
			}
			setProgress();
			pageGroup.removeEventListener('touchmove',move,false);
			pageGroup.removeEventListener('mousemove',move,false);
			
			timeAfter();
			/*isMoving = true;//能连续滑动
			if(lctnNum == 0 || lctnNum == (pageItem.length - 1)){
				timeAfter();
			}*/
		}
	}
	
	function transition(){
		//设置过渡属性和规定过渡效果的时间曲线
		var aaa = 'transform',bbb = 'ease';
		pageGroup.style.transitionProperty = aaa;
		pageGroup.style.webkitTransitionProperty = aaa;
		
		pageGroup.style.transitionTimingFunction = bbb;
		pageGroup.style.webkitTransitionTimingFunction = bbb;
	}
	function transitionTime(n){
		//定义过渡效果花费的时间
		pageGroup.style.transitionDuration = n + 'ms';
		pageGroup.style.webkitTransitionDuration = n + 'ms';
	}
	
	function transform3dY(n){
		//Y轴方向的距离
		var a = 'translate3d(0px,',b = 'px, 0px) translateZ(0px)';
		pageGroup.style.transform = a + n + b;
		pageGroup.style.webkitTransform = a + n + b;
	}
	function shortTimeSlide(){
		if((endY - startY)<0){
			lctnNum ++;
			transform3dY(-lctnNum*ch);
			pos();
		}else if((endY - startY)>0){
			lctnNum --;
			transform3dY(-lctnNum*ch);
			neg();
		}
	}
	function longTimeSlide(){
		var px = ch/2 - 50;
		if((endY - startY) < -px){
			lctnNum ++;
			transform3dY(-lctnNum*ch);
			pos();
		}else if((endY - startY) > px){
			lctnNum --;
			transform3dY(-lctnNum*ch);
			neg();
		}else if((endY - startY) < px  && (endY - startY) > -px){
			transform3dY(-lctnNum*ch);
		}
	}
	function pos(){
		//++ 向上滑动
		if(lctnNum == (pageItem.length - 1)){
			var setTime = setTimeout(function(){
				lctnNum = 1;
				transitionTime(0);
				transform3dY(-lctnNum*ch);
				clearTimeout(setTime);
			},timeToDown);
		}
	}
	function neg(){
		// -- 向下滑动
		if(lctnNum == 0){
			var setTime = setTimeout(function(){
				lctnNum = pageItem.length - 2;
				transitionTime(0);
				transform3dY(-lctnNum*ch);
				clearTimeout(setTime);
			},timeToDown);
		}
	}
	
	function timeAfter(){
		//每个页动画完成过渡才激活isMoving，才能滑动到下一个页面
		isMoving = false;
		var setTimeMoving = setTimeout(function(){
			isMoving = true;
			clearTimeout(setTimeMoving);
		},timeToDown+1);//timeToDown
	}
	
	function setProgress(){
		//设置进度条、位置数、页面激活的pageActive类
		var num = lctnNum;
		if(num == 0){
			num = pageItem.length-2;
		}else if(num == (pageItem.length-1)){
			num = 1;
		}
		var w = num/total * 100;
		pageProgress.getElementsByTagName('i')[0].style.width = w + "%";
		pageProgress.getElementsByTagName('p')[0].innerHTML = num  + "/" + total;
		
		for(var i = 0 ; i < pageItem.length ; i ++){
			pageItem[i].className = pageItem[i].className.replace(/(pageActive)/g,"").trim();
		}
		
		pageItem[num].className = pageItem[num].className + " pageActive";
	}
	
	document.addEventListener('touchmove', function(e) {
		//微信浏览器禁止iPhone手机上下滑动网页
	    e.preventDefault();
	});
}










