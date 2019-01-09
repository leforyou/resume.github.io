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
	//手机端菜单
	$(".header .phone-menu").click(function(){
		var flag = $(this).hasClass('active');
		if(flag){
			$(this).removeClass('active');
			$(".header .nav").removeClass('active');
		}else{
			$(this).addClass('active');
			$(".header .nav").addClass('active');
		}
	});
});

$(function(){
	//手机端菜单--搜索
	$(".header .search .ico-search").click(function(){
		$(this).parent().addClass('active');
	});
	$(".header .search .close").click(function(){
		$(this).parent().removeClass('active');
	});
});