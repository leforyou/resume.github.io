function newsSlider(obj){
	obj.dot = obj.dot || false;
	obj.time = obj.time || 2000;
	obj.time = Math.max(obj.time,2000);
	
	var idTag = document.querySelector(obj.id);
	var GroupDOM = idTag.getElementsByClassName('news-slider-group')[0];
	var ItemDOM = GroupDOM.getElementsByClassName('news-slider-item');
	var len = ItemDOM.length;
	var htm1 = ItemDOM[0].cloneNode(true);//克隆
	var htm2 = ItemDOM[len-1].cloneNode(true);
	GroupDOM.appendChild(htm1);
	GroupDOM.insertBefore(htm2,GroupDOM.childNodes[0]);
	
	//左右按钮
	var preBtn = document.createElement('i');
	var nextBtn = document.createElement('i');
	preBtn.className = 'ico-news-pre';
	nextBtn.className = 'ico-news-next';
	idTag.appendChild(preBtn);
	idTag.appendChild(nextBtn);
	
	//导航点
	var dotTag = document.createElement('div');
	if(obj.dot == true){
		dotTag.style.display = 'block';
	}else{
		dotTag.style.display = 'none';
	}
	dotTag.className = 'news-slider-dot';
	var iStr = '';
	for(var i = 0 ; i < len; i ++){
		iStr += '<i></i>';
	}
	dotTag.innerHTML = iStr;
	idTag.appendChild(dotTag);
	
	var iDots = dotTag.getElementsByTagName('i');
	setDotClass(0);
	
	var ow = idTag.offsetWidth;
	transition();
	transform3dX(- ow);
	transitionTime(0);
	
	var num = 1,timeToLeft = 500, setIval, slidering = true;
	function Ival(){ 
		//定时器
		setIval = setInterval(function(){
			num ++;
			transitionTime(timeToLeft);
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
				},(timeToLeft + 10));
			}
		},obj.time);
	}
	Ival();
	
	//左右切换
	idTag.querySelector('.ico-news-pre').onclick = function(){
		//向前切换
		if(getState()){
			clearInterval(setIval);
			num --;
			transitionTime(timeToLeft);
			transform3dX(- num * ow);
			clearDotsClass();
			if(num < (ItemDOM.length - 1) && num > 0){
				setDotClass(num-1);
			}
			if(num == 0){
				setDotClass(ItemDOM.length - 3);
				var setTime = setTimeout(function(){
					num = ItemDOM.length - 2;
					transitionTime(0);
					transform3dX(- num * ow);
					clearTimeout(setTime);
				},(timeToLeft + 5));
			}
			Ival();
			setState();
		}
	}
	idTag.querySelector('.ico-news-next').onclick = function(){
		//向后切换
		if(getState()){
			clearInterval(setIval);
			num ++;
			transitionTime(timeToLeft);
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
				},(timeToLeft + 5));
			}
			Ival();
			setState();
		}
	}
	
	//导航点的点击事件
	for(var i = 0 ; i < iDots.length ; i ++){
		iDots[i].index = i;
		iDots[i].onclick = function(){
			num = this.index+1;
			clearInterval(setIval);
			transitionTime(timeToLeft);
			transform3dX(- num * ow);
			clearDotsClass();
			setDotClass(num-1);
			Ival();
		}
	}
	
	function transition(){
		//设置过渡属性和规定过渡效果的时间曲线
		var aaa = 'transform',bbb = 'ease';
		GroupDOM.style.transitionProperty = aaa;
		GroupDOM.style.webkitTransitionProperty = aaa;
		
		GroupDOM.style.transitionTimingFunction = bbb;
		GroupDOM.style.webkitTransitionTimingFunction = bbb;
	}
	function transform3dX(n){
		var a = 'translate3d(',b = 'px, 0px, 0px) translateZ(0px)';
		GroupDOM.style.transform = a + n + b;
		GroupDOM.style.webkitTransform = a + n + b;
	}
	function transitionTime(n){
		//定义过渡效果花费的时间
		GroupDOM.style.transitionDuration = n + 'ms';
		GroupDOM.style.webkitTransitionDuration = n + 'ms';
	}
	
	function setState(){
		//滑动没有完成过渡，禁止下一个滑动
		slidering = false;
		var setTime = setTimeout(function(){
			slidering = true;
			clearTimeout(setTime);
		},timeToLeft+8);
	}
	function getState(){
		return slidering;
	}
	function setDotClass(n){
		iDots[n].className = 'newsDotActive';
	}
	function clearDotsClass(){
		for(var i = 0 ; i < iDots.length ; i ++){
			iDots[i].className = '';
		}
	}
	
}







