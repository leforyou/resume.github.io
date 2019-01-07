/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function(){
	//底部-友情链接
	var strH = '16px';
	var $more = $(".footer-friendship-more");
	var $ul = $more.parent().find('ul');
	$more.click(function(){
		var flag = $more.hasClass('active');
		if(flag){
			$more.removeClass('active');
			$ul.css({'height':strH});
		}else{
			$more.addClass('active');
			$ul.css({'height':'auto'});
			var h = $ul.height();
			$ul.css({'height':strH});
			var setTime = setTimeout(function(){
				$ul.css({'height':h+'px'});
				clearTimeout(setTime);
			},1);
		}
	});
});