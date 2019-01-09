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
	// 菜单
	
	//显示
	$(".header .container .box .section .ico-menu").click(function(){
		$(".header .wrap-menu").addClass('active');
	});
	
	//关闭
	$(".header .wrap-menu .box .right,.header .wrap-menu .box .right .ico-close").click(function(){
		$(".header .wrap-menu").removeClass('active');
	});
	
	var $li = $(".header .wrap-menu .box .left ul li");
	$li.find('.first').click(function(){
		var $parent = $(this).parent();
		var flag = $parent.hasClass('active');
		if(flag){
			$parent.removeClass('active');
			$parent.find('.second').slideUp();
		}else{
			$parent.addClass('active');
			$parent.find('.second').slideDown();
		}
		
	});
	
	
});



