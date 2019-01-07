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
	$("#menuIco").click(function(){
		var flag = $(this).hasClass('active');
		if(flag){
			$(this).removeClass('active');
			$content.removeClass('active');
		}else{
			$(this).addClass('active');
			$content.addClass('active');
		}
	});
	$content.find('li').click(function(){
		var $second = $(this).find('.second');
		$second.css({'height':'auto'});
		var h = $second.height();
		$content.find('li').find('.second').css({'height':'0px'});
		
		var flag = $(this).hasClass('active');
		if(flag){
			$content.find('li').removeClass('active');
		}else{
			$content.find('li').removeClass('active');
			$(this).addClass('active');
			var setTime = setTimeout(function(){
				$second.css({'height':h+'px'});
				clearTimeout(setTime);
			},50);
		}
	});
});



