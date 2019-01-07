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
	//菜单
	var $content = $(".header .content");
	$("#menuIco,.home .logo-menu .menu").click(function(){
		$content.addClass('active');
	});
	$("#headerClose").click(function(){
		$content.removeClass('active');
	});
	
	$content.find('li').click(function(){
		var flag = $(this).hasClass('active');
		if(flag){
			$(this).removeClass('active');
			$(this).find('.second').slideUp();
		}else{
			$(this).addClass('active');
			$(this).find('.second').slideDown();
		}
	});
});
$(function(){
	//底部联系方式
	$(".contact-way li").click(function(){
		$(".contact-layer").addClass('acitve');
	});
	$(".contact-layer").click(function(){
		$(this).removeClass('acitve');
	});
});


$(function(){
	//发展历程
	new Swiper('.develop-container', {
		slidesPerView: 4,
		spaceBetween: 0
	});
	$(".develop-container .swiper-slide").eq(0).addClass('active');
	$(".develop-content ul li").eq(0).addClass('active');
	$(".develop-container .swiper-slide").click(function(){
		var index = $(this).index();
		$(".develop-container .swiper-slide").removeClass('active');
		$(this).addClass('active');
		$(".develop-content ul li").removeClass('active');
		$(".develop-content ul li").eq(index).addClass('active');
	});
});

$(function(){
	//视频--2.3 公司介绍-发展历程---3.1 项目介绍-项目简介
	var iframeVideo = $(".video-layer .content").html();
	$("#zbst-video").click(function(){
		$(".video-layer").addClass('acitve');
		$(".video-layer .content").html(iframeVideo);
	});
	$(".video-layer .close").click(function(){
		$(".video-layer").removeClass('acitve');
		$(".video-layer .content").html('');
	});
});


