/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function() {
	//菜单栏
	$(".ico-menu").click(function(){
		$(".mn-nav").addClass('active');
	});
	$(".mn-nav,.mn-close").click(function(){
		$(".mn-nav").removeClass('active');
	});
	$(".mn-nav ul").click(function(){
		event.stopPropagation();
	});
	
	$(".mn-one-level>a").click(function(){
		var $twoLevel = $(this).parent().find('.mn-two-level-box');
		var val = $twoLevel.css('display');
		if(val == 'none'){
			$twoLevel.slideDown();
		}else if(val == 'block'){
			$twoLevel.slideUp();
		}
	});
});

