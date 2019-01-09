/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function(){
	// 返回顶部
	$(window).scroll(function(){
	    if($(this).scrollTop() > 200){
	        $('.go-top').fadeIn();
	    }else{
	        $('.go-top').fadeOut();
	    }
	});
	$('.go-top').bind('click',function(){
	    $("body,html").animate({scrollTop:0},500);
	    // $(window).scrollTop(0,300 );
	    return false;
	});
});

$(function(){
	//语言选择
	var $select = $(".header .container .box .top .t-box .language .select");
	var flag = false;
	$(".header .container .box .top .t-box .language").click(function(){
		var event = window.event || arguments.callee.caller.arguments[0];//兼容火狐/IE
		event.stopPropagation();//阻止冒泡
		flag = $select.hasClass('active');
		if(flag){
			$select.removeClass('active');
		}else{
			$select.addClass('active');
		}
	});
	$("body").click(function(){
		if(!flag){
			$select.removeClass('active');
		}
	});
});

$(function(){
	//搜索
	$(".header .container .box .top .t-box .search").click(function(){
		$(".header .search-layer").addClass('active');
	});
	$(".header .search-layer .box .close .icon").click(function(){
		$(".header .search-layer").removeClass('active');
	});
});

$(function(){
	//菜单
	var flag = false;
	$(".header .container .box .navbar .n-box .menu .first-list .nav-list").click(function(){
		var event = window.event || arguments.callee.caller.arguments[0];//兼容火狐/IE
		event.stopPropagation();//阻止冒泡
		var $parent = $(this).parent();
		flag = $parent.hasClass('active');
		$(".header .container .box .navbar .n-box .menu .first-list").removeClass('active');
		if(flag){
			$parent.removeClass('active');
		}else{
			$parent.addClass('active');
		}
	});
	$("body").click(function(){
		if(!flag){
			$(".header .container .box .navbar .n-box .menu .first-list").removeClass('active');
		}
	});
	
	
	//手机菜单显示
	var $navbar = $(".header .container .box .navbar");
	$(".header .container .box .top .t-box .ico-menu").click(function(){
		var flag = $navbar.hasClass('active');
		//var clientWidth = document.body.clientWidth;//991为分界点
		//if(clientWidth>991)return;
		if(flag){
			$navbar.removeClass('active');
		}else{
			$navbar.addClass('active');
		}
	});
});

$(function(){
	//tab分类
	var $tabLi = $(".tab-label .box .head-sort ul li");
	$tabLi.click(function(){
		$tabLi.removeClass('active');
		$(this).addClass('active');
	});
	
	
	//滚动条
	var Scrollbar = window.Scrollbar;
	if(Scrollbar){
		Scrollbar.initAll({
			alwaysShowTracks:false //默认值：false 。保持滚动条轨道总是可见的
		});
	}
});

$(function(){
	
});


