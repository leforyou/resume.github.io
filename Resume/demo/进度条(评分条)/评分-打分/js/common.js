



window.addEventListener('load',function(){
	
},false);
window.addEventListener('DOMContentLoaded',function(){
	var rate = document.getElementsByClassName('rate-section');
	for (var i = 0 ; i < rate.length ; i ++) {
		new rateScore({
			'el':rate[i],
			'value':50 //[0-100]
		});
	}
},false);

function rateScore(options){
	this.el = options.el;
	this.barL = this.el.querySelector('.rate-barL');//左边颜色条控制
	this.barR = this.el.querySelector('.rate-barR');//右边颜色条控制
	this.buttonWrapper = this.el.querySelector('.rate-button-wrapper');//圆形控制块
	this.tooltip = this.el.querySelector('.rate-tooltip');//数字提示
	this.className = 'rate-active';//激活的类，能控制圆形块变大/数字提示显示
	this.value = options.value || 0;//圆形块的初始位置,数字区间[0-100]
	this.startX = 0;//记录事件按下的初始值
	this.endX = 0;//记录事件弹起的结束值
	this.moveState = false;//move事件的滑动状态
	this.clientWidth = 0;
	this.init();
	this.countFn();
}
rateScore.prototype.init = function(){
	var self = this;
	
	this.el.addEventListener('click', self.gotoFn.bind(this), false);
	
	this.buttonWrapper.addEventListener('touchstart', self.startFn.bind(this), false);
	this.buttonWrapper.addEventListener('mousedown', self.startFn.bind(this), false);
	
	document.addEventListener('touchmove', self.moveFn.bind(this), false); //添加侦听器
	document.addEventListener('mousemove', self.moveFn.bind(this), false); //添加侦听器
	
	document.addEventListener('touchend', self.endFn.bind(this), false);
	document.addEventListener('mouseup', self.endFn.bind(this), false);
	
	this.el.ontouchstart = function(e) {
		//长按press事件会导致浏览器弹出菜单，苹果用-webkit-touch-callout: none;来禁止，但是安卓用e.preventDefault(); 
		e.preventDefault();
	}
	this.el.ondragstart = function() { //禁止拖动
		return false;
	}
}
rateScore.prototype.gotoFn = function(){
	//鼠标按下或触屏按下--位置跳转定位
	var self = this;
	var e = event || window.event;//e.target;
	this.startX = 0;
	this.endX = 0;
	this.clientWidth = this.el.clientWidth;
	var screenX = e.screenX || e.targetTouches[0].screenX;
	this.value = (screenX - this.el.offsetLeft)/this.clientWidth;
	this.value = this.value * 100;
	if(this.value>99.1)this.value = 100;
	this.countFn();
}
rateScore.prototype.startFn = function(){
	//鼠标按下或触屏按下
	var self = this;
	var e = event || window.event;//e.target;
	this.moveState = true;
	this.startX = e.screenX || e.targetTouches[0].screenX;
	this.clientWidth = this.el.clientWidth; //宽度
	
	this.el.classList.add(this.className);
	this.value = this.barL.style.width;
	this.value = this.strToNum(this.value);
	
	document.ontouchmove = function() { //图片区域禁止浏览左右滑动
		return false;
	}
}

rateScore.prototype.moveFn = function (){
	//左右滑动
	if(this.moveState == false)return;
	var e = event || window.event;
	this.endX = e.screenX || e.targetTouches[0].screenX;
	this.countFn();
}

rateScore.prototype.endFn = function (){
	//鼠标弹起或触屏弹起
	var self = this;
	this.moveState = false;
	this.el.classList.remove(this.className);
	document.ontouchmove = null; //图片区域恢复浏览左右滑动
}
rateScore.prototype.countFn = function (){
	//计算位置
	var between = this.endX - this.startX; //两点间的距离，也可以判断正负。
	
	if(between == 0 ){
		var w = this.value;
	}else{
		//w的值范围是【0-100】
		var w = (between * 100) / this.clientWidth + this.value;
	}
	//console.log(this.endX , this.startX,between,w)
	w = Math.max(w, 0);//取最大值
	w = Math.min(w,100);//取最小值
	this.barL.style.width = w + '%';//左边颜色
	this.barR.style.width = (100 - w) + '%';//右边颜色
	this.buttonWrapper.style.left = w + '%';//圆形块的位置
	this.tooltip.innerHTML = parseInt(w);//提示数字
}



rateScore.prototype.strToNum = function(num) {
  //字符串转数字
  num = num.toString().replace(/[^0-9\.]/g, "");
  if (num.indexOf('.') > -1) {
    var l = num.split('.')[1].length;
    num = Number(num.replace('.', '')) / Math.pow(10, l);
  } else {
    num = Number(num);
  }
  return num;

}



