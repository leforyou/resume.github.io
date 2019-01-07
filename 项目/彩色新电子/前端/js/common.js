/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function() {
	//菜单栏
	$('.mobile-menu').click(function() {
		var flag = $(this).hasClass('active');
		if(flag) {
			$(this).removeClass('active');
			$("#mobile-nav").slideUp();
		} else {
			$(this).addClass('active');
			$("#mobile-nav").slideDown();
		}
	});
	var $mobileNavLi = $("#mobile-nav ul li");
	$mobileNavLi.click(function() {
		$mobileNavLi.removeClass('active');
		$(this).addClass('active');
		var width = $(window).width();
		if(width<768){
			$("#mobile-nav").slideUp();
			$('.mobile-menu').removeClass('active');
		}
	});
	$(window).resize(function() { 
		var width = $(window).width();
		if(width>=768){
			$("#mobile-nav").show();
		}
	});
});


$(function(){
	$("#productAppSwiper .swiper-slide").click(function(){
		$("#productAppSwiper .swiper-slide").removeClass('active');
		$(this).addClass('active');
	});
});