var app = (function(){
	function alert(txt){
		var LayerSty = 'position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.5);z-index:2147483647;transition:opacity 0.38s;-webkit-transition:opacity 0.38s;opacity:0;';
		var ModuleSty = 'margin:0;padding:0;position:absolute;top:50%;left:50%;background:#fff;width:80%;max-width:300px;border-radius:4px;text-align:center;';
		var HeadSty = 'margin:0;padding:18px 6px 6px;font-size:20px;';
		var BodySty = 'margin:0;padding:18px 6px;font-size:16px;color:#666';
		var SureSty = 'margin:0;padding:18px 6px;color:#24a2ff;font-size:18px;cursor:pointer;';
		var LineSty = 'margin:0;padding:0;display:block;height:1px;background:#DDDDDD;transform:scaleY(.5);-webkit-transform:scaleY(.5);';
		
		var maskLayer = document.createElement('div');
		maskLayer.id = 'maskLayerAlert';
		var maskModule = document.createElement('div');
		var maskHead = document.createElement('p');
		var maskBody = document.createElement('p');
		var alertSure = document.createElement('p');
		var grayLine = document.createElement('i');
		
		maskLayer.setAttribute('style',LayerSty);
		maskModule.setAttribute('style',ModuleSty);
		maskHead.setAttribute('style',HeadSty);
		maskBody.setAttribute('style',BodySty);
		alertSure.setAttribute('style',SureSty);
		grayLine.setAttribute('style',LineSty);
		
		
		maskHead.innerHTML = '温馨提示';
		maskBody.innerHTML = txt;
		alertSure.innerHTML = '确定';
		maskModule.appendChild(maskHead);
		maskModule.appendChild(maskBody);
		maskModule.appendChild(grayLine);
		maskModule.appendChild(alertSure);
		maskLayer.appendChild(maskModule);
		document.body.appendChild(maskLayer);
		
		//弹窗居中：定位加margin是最好居中的方式
		var h = maskModule.offsetHeight;
		var w = maskModule.offsetWidth;
		maskModule.style.marginTop = -(h/2 + 50) + 'px';
		maskModule.style.marginLeft = -(w/2) + 'px';
		
		var setTime = setTimeout(function(){//透明(0-1)过渡的动画实现
			//setTimeout()定时器是全局函数，所以创建的div(maskLayerAlert)元素的作用域在alert(txt)内，所以必须声明maskLayer.id = 'maskLayer';
			document.getElementById('maskLayerAlert').style.opacity = 1;
			clearTimeout(setTime);
		},1);
		
		alertSure.onclick = function(){
			maskLayer.style.opacity = 0;
			var setTime = setTimeout(function(){
				var maskLayer = document.getElementById('maskLayerAlert');
				maskLayer.parentNode.removeChild(maskLayer);
				clearTimeout(setTime);
			},386);
		}
	
	}
	return{
		alert:alert
	}
})();
//app.alert("大前端世界");