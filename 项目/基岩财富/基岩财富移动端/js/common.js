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
	//头部菜单
	$(".header .ico-menu").click(function(){
		var flag = $(this).hasClass('active');
		if(flag){
			$(this).removeClass('active');
			$(".header .menu").removeClass('active');
		}else{
			$(this).addClass('active');
			$(".header .menu").addClass('active');
		}
	});
	$(".header .menu ul,.header .menu *").click(function(){
		//阻止冒泡
		event.stopPropagation();
	});
	$(".header .menu").click(function(){
		$(".header .ico-menu").removeClass('active');
		$(this).removeClass('active');
	});
	$(".header .menu .big-title").click(function(){
		var flag = $(this).parent().hasClass('active');
		if(flag){
			$(".header .menu li").removeClass('active');
		}else{
			$(".header .menu li").removeClass('active');
			$(this).parent().addClass('active');
		}
	});
});




