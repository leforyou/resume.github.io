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


$(function(){
	//xml数据处理
	$.ajax({  
	    url: 'xml/data.xml',
	    type: 'GET',
	    dataType: 'xml',
	    success: function(xml) {
	    	//关于我们
	        var desc = $(xml).find('enterprise desc').text();
	        $(".enterprise-intro .ep-content").html(desc);
	        
	        //产品的应用领域
	        var list = $(xml).find('productArr list');
	        var str = '';
	        var strHTML = $(".product-app-swiper .swiper-wrapper").html();
	        for (var i = 0 ; i < list.length ; i ++) {
	        	str += strHTML;
	        }
	        $(".product-app-swiper .swiper-wrapper").html(str);
	        $(xml).find('productArr list').each(function(index){
	        	var subTitle = $(this).find('subTitle').text();
	        	var img = $(this).find('img').text();
	        	img = 'url(' + img + ')';
	        	var desc = $(this).find('desc').text();
	        	$(".product-app-swiper .swiper-slide").eq(index).find('.info').html(subTitle);
	        	$(".product-app-swiper .swiper-slide").eq(index).find('.swiper-img-bg').css('background-image',img);
	        	$(".product-app-swiper .swiper-slide").eq(index).find('.content').html(desc);
	        });
	        
	        //联系我们
	        $(".contact-us .address").html( $(xml).find('contactUs address').text() );
	        $(".contact-us .postcode").html( $(xml).find('contactUs postcode').text() );
	        $(".contact-us #phone1").html( $(xml).find('contactUs phone1').text() );
	        $(".contact-us #phone2").html( $(xml).find('contactUs phone2').text() );
	        $(".contact-us .email").html( $(xml).find('contactUs email').text() );
	        $(".contact-us .website").html( $(xml).find('contactUs website').text() );
	        
	        //版权所有
	        $(".foot .desc").html( $(xml).find('copyright desc').text() );
	        
	        
	        productApp();
	        instaLayer();
	    }
	});
});

function productApp(){
	//响应式设置
	var swiper = new Swiper('#productAppSwiper', {
		slidesPerView: 3,
		spaceBetween: 48,
		  // init: false,
		pagination: {
		    el: '#productAppSwiper .swiper-pagination',
		    clickable: true,
		},
		breakpoints: {
		    1024: {
		      slidesPerView: 3,
		      spaceBetween: 48,
		    },
		    768: {
		      slidesPerView: 3,
		      spaceBetween: 20,
		    },
		    640: {
		      slidesPerView: 2,
		      spaceBetween: 15,
		    },
		    320: {
		      slidesPerView: 1,
		      spaceBetween: 10,
		    }
		}
	});
}

function instaLayer(){
	//遮罩层显示与隐藏 content 
	$(".product-app-swiper .swiper-slide").click(function(){
		//产品列表的遮罩显示
		var content = $(this).find('.content').html();
		var imgURL = $(this).find('.swiper-img-bg').css("background-image");
		$(".insta-layer .inslay-right").html(content);
		$(".insta-layer .img-box .img").css('background-image',imgURL);
		
		$(".insta-layer").addClass('active');
	});
	$(".enterprise-intro .ep-content").click(function(){
		//关于我们的遮罩显示
		var content = $(this).html();
		var imgURL = $('.enterprise-intro .ep-img').attr('src');
		imgURL = 'url(' + imgURL + ')';
		$(".insta-layer .inslay-right").html(content);
		$(".insta-layer .img-box .img").css('background-image',imgURL);
		
		$(".insta-layer").addClass('active');
	});
	$(".insta-layer,.inslay-close").click(function(){
		$(".insta-layer").removeClass('active');
	});
	$(".insta-layer .inslay-main").click(function(){
		event.stopPropagation();
	});
}
