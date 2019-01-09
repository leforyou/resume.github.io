function slderImg(obj) {
	this.width = obj.width || "100%";//设置默认参数
	this.height = obj.height || 520;
	this.time = obj.time || 3800;
	var self = this;
	this.id = document.querySelector(obj.id);
	this.sliderItem = this.id.getElementsByClassName('slider-item');//li列表
	this.img = this.id.getElementsByTagName('ul')[0].getElementsByTagName('img');//轮播的图片
	this.sliderDot = this.id.getElementsByClassName('slider-dot')[0];
	this.id.style.height = this.height;
	this.id.style.width = this.width;
	//this.id.getElementsByTagName('ul')[0].style.width = this.width;
	this.id.getElementsByTagName('ul')[0].style.height = this.height;
	this.id.getElementsByTagName('ul')[0].style.minWidth = this.id.offsetWidth + 'px';
	
	sessionStorage.setItem('isReady','true');
	this.img[0].setAttribute('onload','fitImageMuluo(this.parentNode,this)');
	this.img[0].parentNode.parentNode.className += ' itemActive';
	fitImageMuluo(this.img[0].parentNode,this.img[0]);//预防图片加载完或本地有缓存，js没加载完，导致第一张图片不能修正
	var strDot = '';//class="dotActive"
	for (var i = 0; i < this.img.length ; i ++) {
		strDot += '<i></i>';
	}
	this.sliderDot.innerHTML = strDot;
	this.sliderDot.getElementsByTagName('i')[0].className = 'dotActive';
	this.sliderDot.style.marginLeft = - this.sliderDot.offsetWidth/2 + 'px';
	this.iDotBtn = this.sliderDot.getElementsByTagName('i');//圆点
	this.preIcoBtn = this.id.getElementsByClassName('pre-ico')[0];//上一页--箭头
	this.nextIcoBtn = this.id.getElementsByClassName('next-ico')[0];//下一页--箭头
	this.SetIval = false;
	
	this.preIcoBtn.onclick = function(){//上一张
		clearInterval(setIval);
		activeIval();
		switchImg(-1);
	}
	this.nextIcoBtn.onclick = function(){//下一张
		clearInterval(setIval);
		activeIval();
		switchImg(1);
	}
	for (var i = 0 ; i < this.iDotBtn.length ; i ++) {
		this.iDotBtn[i].index = i;
		this.iDotBtn[i].onmouseover = function(){//圆点
			if(this.SetIval == false){
				return;
			}
			clearInterval(setIval);
			activeIval();
			for (var j = 0 ; j < self.sliderItem.length ; j ++) {
				self.sliderItem[j].className = self.sliderItem[j].className.replace(/(itemActive)/g,"").trim();
				self.iDotBtn[j].className = self.iDotBtn[j].className.replace(/(dotActive)/g,"").trim();
			}
			self.sliderItem[this.index].className += ' itemActive';
			self.iDotBtn[this.index].className = ' dotActive';
		}
	}
	var setIval;
	activeIval();
	function activeIval(){
		//轮播图定时器
		setIval = setInterval(function(){
			if(sessionStorage.getItem('isSetIval')==null || self.SetIval){
				switchImg(1);
			}else{
				sessionStorage.removeItem('isSetIval');
				self.SetIval = true;
			}
		},self.time);
	}
	function switchImg(num){
		//切换轮播图--左右点击切换，定时器切换
		var index = 0;
		for (var i = 0 ; i < self.sliderItem.length ; i ++) {
			if(self.sliderItem[i].className.indexOf('itemActive')>-1){
				self.sliderItem[i].className = self.sliderItem[i].className.replace(/(itemActive)/g,"").trim();
				self.iDotBtn[i].className = self.iDotBtn[i].className.replace(/(dotActive)/g,"").trim();
				index = i + num;
				if(index == self.sliderItem.length){
					index = 0;
				}else if(index == -1){
					index = self.sliderItem.length - 1;
				}
			}
		}
		self.sliderItem[index].className += ' itemActive';
		self.iDotBtn[index].className = ' dotActive';
	}
}
function fitImageMuluo(objParentNode, objImg){
	
	/*var img = new Image();
	img.src = objImg.src;*/
	objImg.style.width = 'auto';
	objImg.style.height = 'auto';
	
	var liWidth = objParentNode.offsetWidth; //容器li的宽
	var liHeight = objParentNode.offsetHeight; //容器li的高	
	
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
	
	if(sessionStorage.getItem('isReady') != null){
		//确保显示第一张轮播图，再加载其它图片
		var images = objParentNode.parentNode.parentNode.getElementsByTagName('img');
		for (var i = 1 ; i < images.length ; i ++) {
			images[i].setAttribute('onload','fitImageMuluo(this.parentNode,this)');
			if(images[i].getAttribute('data-src')){
				images[i].src = images[i].getAttribute('data-src');
			}
		}
		sessionStorage.removeItem('isReady');
		sessionStorage.setItem('isSetIval','true');
	}
}

			