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
	//搜索切换
	$("#searchBtn").click(function(){
		$(".header .block1").hide();
		$(".header .block2").show();
	});
	$("#searchCancel").click(function(){
		$(".header .block1").show();
		$(".header .block2").hide();
	});
});



