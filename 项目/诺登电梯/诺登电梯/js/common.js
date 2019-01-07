/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-16 10:17:10
 * @version $Id$
 */

$(function() {
	//查看大图
	$(".part-one-info .wrap-img .img-box ,.CA-upload .list-img-box").click(function(){
		var imgUrl = $(this).css('background-image');//console.log(imgUrl.split('"')[1]);
		//imgUrl = imgUrl.split('"')[1];console.log(imgUrl)
		$(".wrap-look-picture").addClass('active');
		$(".wrap-look-picture .img-box").css('background-image',imgUrl);
	});
	$(".CA-upload .list-img-box .icon").click(function(){
		event.stopPropagation();
	});
	$(".wrap-look-picture").click(function(){
		$(this).removeClass('active');
	})
});

